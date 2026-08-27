# Project 6: The Doorbell Loop

**Concepts used:** Concept 7 — event-driven heartbeat. Concept 10 — connectors
(the loop *acts* — posts a PR comment — not just talks).

**Goal:** make this repo review its own pull requests, with no prompt typed
and nobody watching, whether your laptop is open or shut.

## Why this project is different from 1-5

Every earlier project ran inside this Claude Code session, on your machine.
This one's heartbeat is a **GitHub event**. The catcher is
`anthropics/claude-code-action@v1`, running on a **GitHub-owned runner** —
a computer that is thrown away after each run. That's the whole lesson:
*"your laptop already knew who you were. A rented stranger does not."*
Which is why this is the first project that needs a **token as a secret**,
not just local trust.

## What's here

- `src/stats.js` — a small, currently-correct utility. The bug goes in later,
  as part of the actual pull request — that's what triggers the review.
- `.github/workflows/claude-review.yml` — the doorbell. On every `pull_request`
  event (`opened`, `synchronize`, `reopened`), it runs Claude Code as a
  GitHub Action and posts a review comment. No Routine needed, no daily cap,
  no research-preview access — this is the course's "cheapest door into
  unattended work."

## Setup (does the things a Routine's four blanks answer, here as Action config)

1. **Create the GitHub repo.** A public or private repo works. Push this
   folder's contents to it.
2. **Mint a Claude Code token**: run `claude setup-token` on your own
   machine (interactive — this logs in as *you*, since a rented GitHub
   runner has no identity of its own).
3. **Add it as a repo secret** named `CLAUDE_CODE_OAUTH_TOKEN`
   (Settings → Secrets and variables → Actions → New repository secret).
4. **Push this workflow to the default branch** — GitHub only picks up
   `.github/workflows/*.yml` files that exist on the branch a PR targets.

## How it's run

1. Create a feature branch, plant one real bug in `src/stats.js` (see the
   `plant-a-bug/` note below for what to introduce).
2. Open a pull request from that branch.
3. Wait. About a minute later, a review comment appears — you typed no
   prompt, and nobody was watching for it.
4. **Close your laptop before the review lands**, if you can — the run is
   already happening on GitHub's runner, not yours, so it doesn't care.

## Done when

- The PR gets a review nobody asked for.
- The review actually flags the planted bug, by name, with the input that
  triggers it.
- If it misses it: tighten the prompt in `claude-review.yml` and push again.
  That push re-fires the loop through the `synchronize` event — which is the
  event heartbeat working exactly as designed, not a retry hack.

## One thing to expect (per the course)

*"A green checkmark does not mean it worked."* If the Action run shows green
but no comment appears, the usual cause is a missing or misnamed secret —
check the Action's own log tab before assuming the review logic is broken.
