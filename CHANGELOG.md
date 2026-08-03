# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org) (pre-1.0: MINOR = new features/user-facing
behaviour, PATCH = fixes/docs/housekeeping — see `SKILL.md`).

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
