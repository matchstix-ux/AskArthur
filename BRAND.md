# Famous Smoke Shop — White Label

## What lives here (Famous-specific, do not overwrite)
| File | What it controls |
|---|---|
| `index.html` | Navy/gold palette, Famous Cigars topbar, "Since 1939", layout |
| `app.js` | Copy ("Find My Cigar", "Searching the Famous humidor...", "Our exclusive AI..."), hint chips |

## What is synced from demo (do not edit here — edit in demo, then sync)
| File | What it controls |
|---|---|
| `netlify/functions/recommend.js` | Scoring engine, AI selection, GPT prompt, rate limiting |
| `data/cigars.json` | Full 250-cigar database |
| `netlify.toml` | Build config |

## Workflow
Engine changes always come FROM demo via `bash sync-to-famous.sh`.
Brand/copy changes are made directly in this repo.

## Live URLs
- Demo: https://matchsticks-demo.netlify.app
- Famous: https://famousdemo.netlify.app
