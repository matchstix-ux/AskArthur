// app.js — MatchSticks

const API_PATH = '/.netlify/functions/recommend';
const STATUS_AUTO_CLEAR_MS = 4000;

// ---------------------------------------------------------------------------
// Vague query detection
// ---------------------------------------------------------------------------

const STOP_WORDS = new Set([
  'a','an','the','i','me','my','want','need','like','get','some','one',
  'good','nice','great','best','any','please','just','maybe','kind','of',
  'something','anything','stuff','thing','things','give','show','find','make',
]);

function isVagueQuery(q) {
  if (!q || q.trim().length < 3) return true;
  const words = q.trim().toLowerCase().split(/\s+/);
  // Only 1 meaningful word total (excluding stop words)
  const meaningful = words.filter(w => !STOP_WORDS.has(w) && w.length > 1);
  return meaningful.length < 1;
}

const form        = document.getElementById('searchForm');
const queryInput  = document.getElementById('query');
const statusEl    = document.getElementById('status');
const resultsEl   = document.getElementById('results');
const clearBtn    = document.getElementById('clearBtn');

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const STORAGE_KEY          = 'matchsticks-liked';
const DISLIKED_STORAGE_KEY  = 'matchsticks-disliked-persistent';
const LIKED_DATA_KEY        = 'matchsticks-liked-data';

function loadLikedFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveLikedToStorage(likedSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...likedSet]));
  } catch {}
}

function loadDislikedFromStorage() {
  try {
    const raw = localStorage.getItem(DISLIKED_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveDislikedToStorage(dislikedSet) {
  try {
    localStorage.setItem(DISLIKED_STORAGE_KEY, JSON.stringify([...dislikedSet]));
  } catch {}
}

function loadLikedData() {
  try { return JSON.parse(localStorage.getItem(LIKED_DATA_KEY) || '[]'); } catch { return []; }
}
function saveLikedDataEntry(cigar) {
  try {
    const list = loadLikedData();
    const key  = getCigarKey(cigar);
    if (!list.find(c => c.key === key)) {
      list.push({ key, name: cigar.name, brand: cigar.brand,
                  strength: cigar.strength, flavorNotes: cigar.flavorNotes || [],
                  priceRange: cigar.priceRange || '' });
      localStorage.setItem(LIKED_DATA_KEY, JSON.stringify(list));
    }
  } catch {}
}
function removeLikedDataEntry(key) {
  try {
    const list = loadLikedData().filter(c => c.key !== key);
    localStorage.setItem(LIKED_DATA_KEY, JSON.stringify(list));
  } catch {}
}

const state = {
  currentQuery: '',
  currentResults: [],
  buffer: [],
  liked: loadLikedFromStorage(),
  dislikedPersistent: loadDislikedFromStorage(),
  disliked: new Set(),
  seen: new Set(),
  loading: false,
  abortController: null,
  statusTimer: null,
  recapOpen: false,
  driftNudgeDismissed: false,
  sessionLikedKeys: new Set(),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCigarKey(cigar) {
  const brand = String(cigar?.brand ?? '').trim().toLowerCase();
  const name  = String(cigar?.name  ?? '').trim().toLowerCase();
  return `${brand}::${name}`;
}

function isValidCigar(c) {
  return !!(c && typeof c === 'object' && c.name && c.brand);
}

// Strength 4–10 → 0–100% for the bar, plus a colour class
function strengthPercent(s) {
  const n = Number(s) || 4;
  return Math.round(((n - 4) / 6) * 100);
}

function strengthColor(s) {
  const n = Number(s) || 4;
  if (n <= 5) return 'var(--strength-low)';
  if (n <= 7) return 'var(--strength-med)';
  return 'var(--strength-high)';
}

function strengthLabel(s) {
  const n = Number(s) || 4;
  if (n <= 5) return 'Mild';
  if (n <= 7) return 'Medium';
  if (n <= 8) return 'Full';
  return 'Extra Full';
}

// ---------------------------------------------------------------------------
// Liked data helpers — query enrichment, drift, recap
// ---------------------------------------------------------------------------

function buildEnrichedQuery(rawQuery) {
  const data = loadLikedData();
  if (!data.length) return rawQuery;
  const freq = {};
  data.forEach(c => (c.flavorNotes || []).forEach(f => {
    const k = f.toLowerCase().trim();
    freq[k] = (freq[k] || 0) + 1;
  }));
  const topFlavors = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,3).map(([f]) => f);
  const avg = data.reduce((s,c) => s + (Number(c.strength)||6), 0) / data.length;
  const hint = avg >= 8 ? 'full body' : avg >= 6 ? 'medium body' : 'mild';
  return `${rawQuery} (I tend to enjoy: ${[...topFlavors, hint].join(', ')})`;
}

function checkDriftNudge() {
  if (state.driftNudgeDismissed) return;
  const recent = [...state.sessionLikedKeys].slice(-3);
  if (recent.length < 3) return;
  const data = loadLikedData();
  const cigars = recent.map(k => data.find(c => c.key === k)).filter(Boolean);
  if (cigars.length < 3) return;
  const strengths = cigars.map(c => Number(c.strength) || 6);
  const delta = strengths[2] - strengths[0];
  if (Math.abs(delta) >= 2) showDriftNudge(delta > 0 ? 'fuller' : 'lighter');
}

function showDriftNudge(direction) {
  if (document.getElementById('drift-nudge')) return;
  const nudge = document.createElement('div');
  nudge.id = 'drift-nudge';
  nudge.className = 'drift-nudge';
  nudge.innerHTML = `
    <span>Looks like you're going ${direction} — want Arthur to lean that way?</span>
    <button type="button" class="drift-yes">Yes, lean ${direction}</button>
    <button type="button" class="drift-dismiss" aria-label="Dismiss">&times;</button>`;
  nudge.querySelector('.drift-yes').addEventListener('click', () => {
    nudge.remove(); state.driftNudgeDismissed = true;
    queryInput.value = direction === 'fuller'
      ? 'full body rich bold strong cigars' : 'mild light smooth easy smoking cigars';
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  });
  nudge.querySelector('.drift-dismiss').addEventListener('click', () => {
    nudge.remove(); state.driftNudgeDismissed = true;
  });
  document.getElementById('results').insertAdjacentElement('beforebegin', nudge);
}

function buildRecapDrawer() {
  const data = loadLikedData();
  document.getElementById('recap-drawer')?.remove();
  if (!data.length) return;
  const drawer = document.createElement('div');
  drawer.id = 'recap-drawer';
  drawer.className = 'recap-drawer' + (state.recapOpen ? ' open' : '');
  drawer.innerHTML = `
    <button type="button" class="recap-toggle">
      ❤️ My Liked Cigars <span class="recap-count">${data.length}</span>
      <span class="recap-chevron">${state.recapOpen ? '▼' : '▲'}</span>
    </button>
    <div class="recap-body">${data.map(c => `
      <div class="recap-item">
        <div>
          <div class="recap-name">${escapeHtml(c.name)}</div>
          <div class="recap-brand">${escapeHtml(c.brand)}${c.priceRange ? ' &middot; ' + escapeHtml(c.priceRange) : ''}</div>
        </div>
        <a class="recap-buy btn-buy"
           href="https://www.famous-smoke.com/catalogsearch/result/?q=${encodeURIComponent(c.name)}"
           target="_blank" rel="noopener noreferrer">🛒 Buy</a>
      </div>`).join('')}
    </div>`;
  drawer.querySelector('.recap-toggle').addEventListener('click', () => {
    state.recapOpen = !state.recapOpen;
    drawer.classList.toggle('open', state.recapOpen);
    drawer.querySelector('.recap-chevron').textContent = state.recapOpen ? '▼' : '▲';
  });
  document.body.appendChild(drawer);
}

function syncRecapDrawer() { buildRecapDrawer(); }

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

function setStatus(msg, { persistent = false } = {}) {
  if (state.statusTimer) { clearTimeout(state.statusTimer); state.statusTimer = null; }
  statusEl.textContent = msg;
  if (msg && !persistent) {
    state.statusTimer = setTimeout(() => {
      if (statusEl.textContent === msg) statusEl.textContent = '';
      state.statusTimer = null;
    }, STATUS_AUTO_CLEAR_MS);
  }
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

const EMPTY_STATE_HTML = `
  <div class="empty-state">
    <div class="ember">🔥</div>
    <p>Our Exclusive AI Finds You the Right Cigar from our Humidor</p>
    <div class="hint-chips">
      <button type="button" class="hint-chip" data-query="spicy and full body">Spicy &amp; Full-Bodied</button>
      <button type="button" class="hint-chip" data-query="creamy and smooth mild">Creamy &amp; Smooth</button>
      <button type="button" class="hint-chip" data-query="like a Padron but more affordable">Like Padron, more affordable</button>
      <button type="button" class="hint-chip" data-query="new to cigars something approachable">New to cigars</button>
      <button type="button" class="hint-chip" data-query="morning smoke lighter mild easy draw breakfast">Morning Smoke</button>
      <button type="button" class="hint-chip" data-query="outdoor casual relaxed backyard everyday smoke">Outdoor &amp; Casual</button>
      <button type="button" class="hint-chip" data-query="celebratory special occasion premium achievement">Celebratory</button>
      <button type="button" class="hint-chip" data-query="bourbon">Pairs with Bourbon</button>
      <button type="button" class="hint-chip" data-query="espresso coffee">Pairs with Espresso</button>
      <button type="button" class="hint-chip" data-query="ribeye steak dinner">Pairs with Steak</button>
      <button type="button" class="hint-chip" data-query="gift for cigar lover who smokes premium">Premium Gift</button>
      <button type="button" class="hint-chip" data-query="budget under 10 dollars cheap affordable">Under $10</button>
      <button type="button" class="hint-chip surprise-chip" data-query="__surprise__">🔥 Surprise Me</button>
    </div>
  </div>`;

function showEmptyState() {
  const likedCount = state.liked.size;
  const memoryNote = likedCount > 0
    ? `<p style="color:var(--accent-2);margin-top:8px;font-size:0.85rem">♥ ${likedCount} liked cigar${likedCount > 1 ? 's' : ''} remembered from your last session</p>`
    : '';

  resultsEl.innerHTML = EMPTY_STATE_HTML.replace('</div>\n  </div>', `${memoryNote}</div>\n  </div>`);

  resultsEl.querySelectorAll('.hint-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.dataset.query === '__surprise__') { handleSurpriseMe(); return; }
      queryInput.value = chip.dataset.query;
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
  });
}

function renderCigar(cigar, index) {
  const key       = getCigarKey(cigar);
  const liked     = state.liked.has(key);
  const notForMe  = state.dislikedPersistent.has(key);
  const pct       = strengthPercent(cigar.strength);
  const label     = strengthLabel(cigar.strength);
  const notes     = Array.isArray(cigar.flavorNotes)
    ? cigar.flavorNotes.map(escapeHtml).join(', ')
    : '';
  const price     = cigar.priceRange ? escapeHtml(cigar.priceRange) : '';

  return `
    <article class="card" data-index="${index}" data-key="${escapeHtml(key)}">
      ${cigar.image ? `<div class="card-img"><img src="${escapeHtml(cigar.image)}" alt="${escapeHtml(cigar.name)}" loading="lazy" onerror="this.closest('.card-img').style.display='none'" /></div>` : ""}
      <div class="card-name">${escapeHtml(cigar.name)}</div>
      <div class="card-brand">${escapeHtml(cigar.brand)}</div>

      <div class="card-meta">
        ${price ? `<span class="price-badge">${price}</span>` : ''}
        <span>${escapeHtml(label)}</span>
      </div>

      <div class="strength-wrap">
        <span class="strength-label">Mild</span>
        <div class="strength-track">
          <div class="strength-fill"
               style="width:${pct}%; background: linear-gradient(to right, var(--strength-low), var(--strength-med), var(--strength-high))"></div>
        </div>
        <span class="strength-label">Strong</span>
      </div>

      <div class="card-notes">
        ${notes ? `${notes}` : '<em>No flavor notes available</em>'}
      </div>
      ${cigar.why ? `<div class="card-why">${escapeHtml(cigar.why)}</div>` : ''}

      <div class="actions">
        <button type="button" class="like ${liked ? 'liked' : ''}"
                aria-pressed="${liked}"
                title="${liked ? 'Remove like' : 'Like this cigar'}">
          ${liked ? '❤️ Liked' : '👍 Like'}
        </button>
        <button type="button" class="not-for-me${notForMe ? ' active' : ''}"
                aria-pressed="${notForMe}"
                title="Not for me — Arthur won’t recommend this again">
          ${notForMe ? '✕ Not for me' : '🚫 Not for me'}
        </button>
        <button type="button" class="dislike" title="Swap for a different recommendation">
          🔄 Replace
        </button>
        <a class="btn-buy"
           href="https://www.famous-smoke.com/catalogsearch/result/?q=${encodeURIComponent(cigar.name)}"
           target="_blank"
           rel="noopener noreferrer"
           title="Find at Famous Smoke Shop">
          🛒 Buy
        </a>
      </div>
    </article>`;
}



function renderResults() {
  if (!state.currentResults.length) { showEmptyState(); return; }
  resultsEl.innerHTML = `<div class="grid">${state.currentResults.map((c, i) => renderCigar(c, i)).join('')}</div>`;
  syncButtons();
}

function updateCardAt(index) {
  const card = resultsEl.querySelector(`.card[data-index="${index}"]`);
  if (!card) { renderResults(); return; }
  const tmp = document.createElement('div');
  tmp.innerHTML = renderCigar(state.currentResults[index], index);
  card.replaceWith(tmp.firstElementChild);
  syncButtons();
}

function syncButtons() {
  resultsEl.querySelectorAll('.actions button').forEach(btn => {
    btn.disabled = state.loading;
  });
}

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

function showLoadingState() {
  resultsEl.innerHTML = `
    <div class="arthur-loading" aria-live="polite" aria-label="Arthur is finding your cigars">
      <div class="smoke-wrap" aria-hidden="true">
        <span class="puff puff-1"></span>
        <span class="puff puff-2"></span>
        <span class="puff puff-3"></span>
      </div>
    </div>`;
}

function setLoading(v) {
  state.loading = v;
  const submit = form.querySelector('button[type="submit"]');
  if (submit) {
    submit.disabled = v;
    submit.textContent = v ? 'Arthur is selecting your cigars…' : 'Find My Cigar';
  }
  queryInput.disabled = v;
  if (v) showLoadingState();
  syncButtons();
}

// ---------------------------------------------------------------------------
// Error display
// ---------------------------------------------------------------------------

function showErrorState(message, { showRetry = false } = {}) {
  const retryBtn = showRetry
    ? `<button type="button" class="btn btn-primary error-retry" style="margin-top:16px">Try Again</button>`
    : '';
  resultsEl.innerHTML = `
    <div class="arthur-error">
      <div class="error-icon" aria-hidden="true">🌫️</div>
      <p class="error-title">Arthur is having a moment</p>
      <p class="error-msg">${message}</p>
      ${retryBtn}
    </div>`;
  if (showRetry) {
    resultsEl.querySelector('.error-retry').addEventListener('click', () => {
      if (state.currentQuery) {
        queryInput.value = state.currentQuery;
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      } else {
        showEmptyState();
      }
    });
  }
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

function abortInflight() {
  if (state.abortController) {
    state.abortController.abort();
    state.abortController = null;
  }
}

async function fetchRecommendations(statusMsg) {
  const query = state.currentQuery.trim();
  if (!query) {
    setStatus('Please enter a cigar name, brand, or flavor.', { persistent: true });
    return null;
  }

  abortInflight();
  state.abortController = new AbortController();
  setLoading(true);
  setStatus('', { persistent: false });

  try {
    const payload = {
      query,
      liked:    [...state.liked],
      disliked: [...state.disliked, ...state.dislikedPersistent],
      seen:     [...state.seen],
    };

    const res = await fetch(API_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: state.abortController.signal,
    });

    if (res.status === 429) {
      showErrorState('Arthur is fielding a lot of requests right now. Give him a moment and try again.', { showRetry: true });
      return null;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Bad response format');

    return data.filter(isValidCigar);

  } catch (err) {
    if (err.name === 'AbortError') return null;
    // Distinguish network failure from other errors
    const isNetwork = err instanceof TypeError && err.message.toLowerCase().includes('fetch');
    const msg = isNetwork
      ? 'Looks like a network hiccup. Check your connection and give it another shot.'
      : 'Arthur ran into an unexpected snag. Try rephrasing your request — he\'ll get it next time.';
    console.error('Fetch error:', err);
    showErrorState(msg, { showRetry: true });
    return null;
  } finally {
    state.abortController = null;
    setLoading(false);
  }
}

// ---------------------------------------------------------------------------
// State helpers
// ---------------------------------------------------------------------------

function rememberSeen(items) {
  items.forEach(c => state.seen.add(getCigarKey(c)));
}

function resetForQuery(query) {
  abortInflight();
  state.currentQuery   = query;
  state.currentResults = [];
  state.buffer         = [];
  state.disliked.clear();
  state.seen.clear();
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

async function handleSearch(e) {
  e.preventDefault();
  if (state.loading) return;

  const query = queryInput.value.trim();
  if (!query) {
    setStatus('Please enter a cigar name, brand, or flavor.', { persistent: true });
    return;
  }

  // Vague query nudge — prompt before hitting the API
  if (isVagueQuery(query)) {
    setStatus('Can you give Arthur a bit more to work with? Try a flavor, brand, pairing, or occasion.', { persistent: true });
    queryInput.focus();
    return;
  }

  resetForQuery(query);
  clearBtn.style.display = 'inline-flex';

  const all = await fetchRecommendations();
  if (!all || !all.length) {
    showErrorState('Arthur couldn\'t find a match for that one. Try a different flavor, brand, or occasion.', { showRetry: false });
    return;
  }

  // First 3 go on screen, rest go into the replace buffer
  // Strip any persistent dislikes from both (API should already exclude them,
  // but guard client-side too so stale buffer entries never surface)
  const clean = all.filter(c => !state.dislikedPersistent.has(getCigarKey(c)));
  state.currentResults = clean.slice(0, 3);
  state.buffer         = clean.slice(3);
  rememberSeen(all);
  renderResults();
  setStatus('');
}

async function handleReplace(index) {
  if (state.loading) return;
  if (index < 0 || index >= state.currentResults.length) return;

  const outgoing = state.currentResults[index];
  if (!outgoing) return;

  state.disliked.add(getCigarKey(outgoing));

  // Try the local buffer first — instant, no network call
  const bufferMatch = state.buffer.findIndex(c => {
    const k = getCigarKey(c);
    return !state.disliked.has(k) &&
           !state.dislikedPersistent.has(k) &&
           !state.currentResults.some(cur => getCigarKey(cur) === k);
  });

  if (bufferMatch !== -1) {
    const [replacement] = state.buffer.splice(bufferMatch, 1);
    state.currentResults[index] = replacement;
    state.seen.add(getCigarKey(replacement));
    updateCardAt(index);
    setStatus('Swapped in a fresh pick.');
    return;
  }

  // Buffer exhausted — hit the API
  const all = await fetchRecommendations('Finding you a better match…');
  if (!all || !all.length) {
    setStatus('No more replacements found right now.', { persistent: true });
    return;
  }

  const existingKeys = new Set(state.currentResults.map(getCigarKey));
  existingKeys.add(getCigarKey(outgoing));

  const replacement = all.find(c => !existingKeys.has(getCigarKey(c)));
  if (!replacement) {
    setStatus('No new replacement available yet.', { persistent: true });
    return;
  }

  // Refill buffer — exclude persistent dislikes and liked cigars
  state.buffer = all.filter(c => {
    const k = getCigarKey(c);
    return k !== getCigarKey(replacement) && !existingKeys.has(k) &&
           !state.dislikedPersistent.has(k) && !state.liked.has(k);
  });
  state.currentResults[index] = replacement;
  rememberSeen([replacement, ...state.buffer]);
  updateCardAt(index);
  setStatus('Swapped in a fresh pick.');
}

function handleLike(index) {
  if (state.loading) return;
  const cigar = state.currentResults[index];
  if (!cigar) return;
  const key = getCigarKey(cigar);
  if (state.liked.has(key)) {
    state.liked.delete(key);
    removeLikedDataEntry(key);
    state.sessionLikedKeys.delete(key);
    setStatus('Removed from liked.');
  } else {
    state.liked.add(key);
    state.disliked.delete(key);
    state.dislikedPersistent.delete(key);
    saveDislikedToStorage(state.dislikedPersistent);
    saveLikedDataEntry(cigar);
    state.sessionLikedKeys.add(key);
    setStatus('Saved to your preferences.');
    checkDriftNudge();
  }
  saveLikedToStorage(state.liked);
  updateCardAt(index);
  syncRecapDrawer();
  checkAllLiked();
}

function checkAllLiked() {
  if (state.currentResults.length !== 3) return;
  const allLiked = state.currentResults.every(c => state.liked.has(getCigarKey(c)));
  if (!allLiked) return;

  // Build a tighter profile query from the 3 liked cigars specifically
  const freq = {};
  state.currentResults.forEach(c => {
    (c.flavorNotes || []).forEach(f => {
      const k = f.toLowerCase().trim();
      freq[k] = (freq[k] || 0) + 1;
    });
  });
  const topNotes = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([f]) => f);

  const avgStrength = state.currentResults
    .reduce((s, c) => s + (Number(c.strength) || 6), 0) / 3;
  const strengthHint = avgStrength >= 8 ? 'full body bold'
    : avgStrength >= 6 ? 'medium body' : 'mild smooth';

  const brands = state.currentResults.map(c => c.brand).join(', ');
  const query = `Dig deeper: more cigars in the style of ${brands} — ${strengthHint}` +
    `${topNotes.length ? ', ' + topNotes.join(', ') : ''}. Show me options I haven't seen yet.`;

  setStatus('Arthur noticed you loved all 3 — going deeper…', { persistent: false });

  setTimeout(() => {
    queryInput.value = query;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  }, 900);
}

async function handleNotForMe(index) {
  if (state.loading) return;
  const cigar = state.currentResults[index];
  if (!cigar) return;
  const key = getCigarKey(cigar);

  if (state.dislikedPersistent.has(key)) {
    // Toggle off
    state.dislikedPersistent.delete(key);
    saveDislikedToStorage(state.dislikedPersistent);
    updateCardAt(index);
    setStatus('Removed from dislikes.');
    return;
  }

  // Mark as not-for-me persistently
  state.dislikedPersistent.add(key);
  saveDislikedToStorage(state.dislikedPersistent);
  // Also remove from liked if it was liked
  if (state.liked.has(key)) {
    state.liked.delete(key);
    saveLikedToStorage(state.liked);
  }
  // Add to session disliked so Replace won't bring it back
  state.disliked.add(key);
  setStatus('Got it — Arthur won\'t recommend this again.');
  // Auto-replace the card
  await handleReplace(index);
}

function handleClear() {
  abortInflight();
  state.currentQuery   = '';
  state.currentResults = [];
  state.buffer         = [];
  state.disliked.clear();
  state.seen.clear();
  saveLikedToStorage(state.liked);
  queryInput.value = '';
  clearBtn.style.display = 'none';
  setStatus('');
  showEmptyState();
}


// ---------------------------------------------------------------------------
// Event binding
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Surprise Me
// ---------------------------------------------------------------------------

async function handleSurpriseMe() {
  const data = loadLikedData();
  let query;
  if (data.length >= 2) {
    const freq = {};
    data.forEach(c => (c.flavorNotes||[]).forEach(f => {
      const k = f.toLowerCase().trim(); freq[k]=(freq[k]||0)+1;
    }));
    const top = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([f])=>f);
    const avg = data.reduce((s,c)=>s+(Number(c.strength)||6),0)/data.length;
    const hint = avg>=8?'full body bold':avg>=6?'medium body':'mild smooth';
    query = `Surprise me with something ${hint}${top.length?', '+top.join(', '):''}. Something I haven't tried.`;
  } else {
    const moods = [
      'something bold and adventurous',
      'a smooth and relaxed smoke',
      'a hidden gem under $12',
      'a special occasion cigar',
      'something spicy and full bodied',
    ];
    query = `Surprise me with ${moods[Math.floor(Math.random()*moods.length)]}`;
  }
  queryInput.value = query;
  form.dispatchEvent(new Event('submit', { cancelable: true }));
}

form.addEventListener('submit', handleSearch);
clearBtn.addEventListener('click', handleClear);
resultsEl.addEventListener('click', async e => {
  const likeBtn     = e.target.closest('.like');
  const notForMeBtn = e.target.closest('.not-for-me');
  const dislikeBtn  = e.target.closest('.dislike');
  const moreLikeBtn = e.target.closest('.more-like-this');
  if (!likeBtn && !notForMeBtn && !dislikeBtn && !moreLikeBtn) return;

  const card = e.target.closest('.card');
  if (!card) return;
  const index = parseInt(card.dataset.index, 10);
  if (!Number.isInteger(index)) return;

  if (likeBtn)     handleLike(index);
  if (notForMeBtn) { notForMeBtn.disabled = true; notForMeBtn.blur(); await handleNotForMe(index); }
  if (dislikeBtn)  await handleReplace(index);
  if (moreLikeBtn) {
    const cigar = state.currentResults[index];
    if (!cigar) return;
    const notes = (cigar.flavorNotes||[]).slice(0,2).join(', ');
    const strength = strengthLabel(cigar.strength).toLowerCase();
    queryInput.value = `More cigars like ${cigar.name}: ${strength}${notes?', '+notes:''}`;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  }
});

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

showEmptyState();
syncRecapDrawer();
