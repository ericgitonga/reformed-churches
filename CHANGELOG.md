# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org) (pre-1.0: MINOR = new features/user-facing
behaviour, PATCH = fixes/docs/housekeeping — see `SKILL.md`).

## [0.4.2] - 2026-08-10

### Added

- Vitest unit test suite alongside the existing Playwright e2e suite, per `ONBOARDING.md`'s
  "Unit tests alongside E2E" convention: `src/lib/churches.test.ts` covers `getChurches`
  (returns every church, sorted alphabetically, doesn't mutate the source data module) and
  `mapsUrl` (builds a correct Google Maps search URL). Wired as a required `Unit` status check
  in `.github/workflows/unit.yml` (closes #17)

tag: `v0.4.2`

## [0.4.1] - 2026-08-07

### Changed

- Standardised American spelling to British spelling in the 0.3.1 changelog entry ("color" →
  "colour" throughout), per the project-wide British-English convention. Left the literal CSS
  media feature name `prefers-color-scheme` untouched, and skipped `e2e/test_smoke.py` and
  `e2e/test_church_modal.py` where comment prose is tightly interleaved with literal
  Playwright/CSS API names (closes #15)

tag: `v0.4.1`

## [0.4.0] - 2026-08-03

### Added

- Vercel Web Analytics + Speed Insights instrumentation: installed `@vercel/analytics` and
  `@vercel/speed-insights`, mounted `<Analytics />` and `<SpeedInsights />` in the root layout
  (closes #10). Feeds pageview/visitor and Core Web Vitals data into the cross-project
  `vercel-metrics` pipeline. Enabling the toggle in the Vercel project dashboard is a separate
  manual follow-up

tag: `v0.4.0`

## [0.3.1] - 2026-08-03

### Fixed

- Colour contrast in the modal: title/address/pastor text was inheriting a CSS variable-based
  colour that goes near-white under `prefers-color-scheme: dark`, washing out against the
  modal's hardcoded-light card. Labels and links were already fine (explicit colours); gave the
  remaining text a fixed dark colour too, since the card itself is always light regardless of
  system theme (closes #8)
- Colour contrast on the homepage: an initial attempt hardcoded the title/church-name text to
  the same fixed dark colour as the modal — wrong fix, since the homepage's background (unlike
  the modal's) correctly tracks system theme via that same CSS variable, so hardcoding dark text
  broke dark mode (dark-on-dark). Corrected with theme-aware `dark:` variants instead, so text
  and background track the same theme signal together

tag: `v0.3.1`

## [0.3.0] - 2026-08-03

### Added

- Enriched 16 of 17 churches with pastor, website, phone, and/or email via web research
  (closes #4). Added an `email` field to the church data schema — several churches only had a
  public email, not a phone number
- `ChurchModal` now shows both phone and email under "Contact" when available

### Changed

- "Christ Supremacy Church" has no findable web presence — all fields remain `null`
- "Bethsaida Baptist Church"'s populated data is an educated-guess identity match (the same
  Embakasi-area Reformed Baptist church is more commonly found online as "Bethzatha"/"Bethesda
  Baptist Church") — not confirmed, see SKILL.md
- `placeId` remains `null` for every church — still blocked on a Google Places API key (#5)

tag: `v0.3.0`

## [0.2.0] - 2026-08-03

### Added

- Church list is now interactive: clicking a church opens a detail modal (location, senior
  pastor, contact info, website link — each conditionally rendered only when present in the
  data). Closes via the X button or clicking outside the modal. Mobile-friendly (closes #3)

tag: `v0.2.0`

## [0.1.0] - 2026-08-03

### Added

- Initial project scaffold: repo, branch protection, CI (e2e gate on every PR), versioning and
  issue-first workflow (closes #1)
- Seeded the initial 17-church dataset (`src/data/churches.json`) sourced from the Google Maps
  saved list, and a minimal homepage listing them by name

tag: `v0.1.0`
