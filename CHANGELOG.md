# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org) (pre-1.0: MINOR = new features/user-facing
behaviour, PATCH = fixes/docs/housekeeping — see `SKILL.md`).

## [0.3.1] - 2026-08-03

### Fixed

- Color contrast: modal title/address/pastor text and the homepage title/church names were
  inheriting a CSS variable-based color that goes near-white under `prefers-color-scheme: dark`,
  washing out against their hardcoded light backgrounds. Labels and links were already fine
  (explicit colors); gave the remaining text explicit fixed colors too (closes #8)

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
