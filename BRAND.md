# Ask Arthur — AI Cigar Sommelier

## What lives here
| File | What it controls |
|---|---|
| `index.html` | Navy/gold palette, Ask Arthur topbar, layout |
| `app.js` | Copy, hint chips, Arthur AI copy |

## What is synced from demo (do not edit here — edit in demo, then sync)
| File | What it controls |
|---|---|
| `netlify/functions/recommend.js` | Scoring engine, AI selection, GPT prompt, rate limiting |
| `data/cigars.json` | Full cigar database |
| `netlify.toml` | Build config |

## Workflow
Engine changes always come FROM demo via `bash sync-to-famous.sh`.
Brand/copy changes are made directly in this repo.

## Live URLs
- Demo: https://matchsticks-demo.netlify.app
- AskArthur: https://askarthur.netlify.app
