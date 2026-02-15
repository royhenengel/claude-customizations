# Documentation Types Reference

Governing reference for document types in repos using my-workflow. Defines every document type, where it belongs, and how types relate to each other. The enforcement agent and documentation tooling read this file as the source of truth.

This reference covers the **portable my-workflow structure** (planning, docs, project management). For repo-specific structure (skills/, agents/, hooks/, etc.), see that repo's CLAUDE.md and README.md.

## Canonical Directory Structure

```
repo-root/
├── CLAUDE.md                          # Project Context (auto-loaded, operational)
├── README.md                          # Project Intro (human-facing)
│
├── docs/                              # Standalone guides and references
│   └── {guide-name}.md                # Guide (no better home)
│
├── planning/                          # Project management
│   ├── CLAUDE.md                      # Planning Context (auto-loaded, navigation)
│   ├── OVERVIEW.md                    # Project Vision (authoritative governance)
│   ├── STATE.md                       # Project State (living tracker)
│   ├── BACKLOG.md                     # Project Backlog (persistent)
│   ├── solutions/                     # Solved problems (/compound)
│   │   ├── INDEX.md                   # Solutions index
│   │   └── {category}/               # Problem categories
│   │       └── {solution}.md          # Individual solution
│   └── specs/                         # Feature specifications
│       └── {feature}/                 # One directory per feature
│           ├── CLAUDE.md              # Feature Context (auto-loaded)
│           ├── SPEC.md                # Feature Spec (requirements)
│           ├── RESEARCH.md            # Feature Research (analysis, decisions)
│           ├── PLAN.md                # Feature Plan (executable tasks)
│           ├── PROGRESS.md            # Feature Progress (live tracking during work)
│           ├── SUMMARY.md             # Feature Summary (outcomes, post-completion)
│           ├── DISCOVERY.md           # Discovery Document (optional, deep analysis)
│           ├── INCIDENT-{date}.md     # Incident Report (optional, post-incident)
│           └── archive/               # Archived artifacts (post-completion)
│
└── archive/                           # Archived content
```

## Document Type Registry

| Type | Filename | Location | Purpose | Template? |
|------|----------|----------|---------|-----------|
| Project Context | CLAUDE.md | repo root | Operational instructions for Claude (auto-loaded) | Yes |
| Directory Context | CLAUDE.md | any directory | Cascading context for that directory (auto-loaded) | Yes |
| Project Intro | README.md | repo root | Human-facing project overview | Yes |
| Project Vision | OVERVIEW.md | planning/ | Vision, scope, principles, governance | Yes |
| Project State | STATE.md | planning/ | Current stage, active features, decisions | Yes |
| Project Backlog | BACKLOG.md | planning/ | Improvements, ideas, technical debt | Yes |
| Feature Spec | SPEC.md | planning/specs/{feature}/ | Requirements for a feature | Yes |
| Feature Research | RESEARCH.md | planning/specs/{feature}/ | Analysis, tradeoffs, decisions | Yes |
| Feature Plan | PLAN.md | planning/specs/{feature}/ | Executable implementation tasks | Yes |
| Feature Progress | PROGRESS.md | planning/specs/{feature}/ | Live tracking of progress, current state, gap stack | Yes |
| Feature Summary | SUMMARY.md | planning/specs/{feature}/ | Outcomes after feature completion | Yes |
| Feature Context | CLAUDE.md | planning/specs/{feature}/ | Cascading context for feature (auto-loaded) | Yes |
| Discovery Document | DISCOVERY.md | planning/specs/{feature}/ | Deep analysis when scope expands beyond RESEARCH.md | Yes |
| Incident Report | INCIDENT-{date}.md | planning/specs/{feature}/ | Post-incident documentation | Yes |
| Guide | {name}.md | docs/ | Standalone guides with no better home | No |
| Solution | {category}/{name}.md | planning/solutions/ | Solved problem documentation | Yes |

## Placement Rules

Decision tree for where a new document goes:

1. Is it auto-loaded context for a directory? -> **CLAUDE.md** in that directory
2. Is it a feature artifact (spec, plan, research, progress, summary, discovery)? -> **planning/specs/{feature}/**
3. Is it project management (state, backlog, governance)? -> **planning/**
4. Is it a solved problem to reference later? -> **planning/solutions/**
5. Is it a standalone guide that doesn't fit elsewhere? -> **docs/**
6. Is it human-facing documentation for a directory? -> **README.md** in that directory

## Role Separation for Root Files

- **CLAUDE.md**: Operational instructions (structure, behavioral rules, doc architecture summary). Auto-loaded, token-sensitive. Keep concise.
- **README.md**: Human introduction (what this repo is, how to use it, getting started). Not auto-loaded. Can be longer.
- **OVERVIEW.md**: Authoritative governance (vision, principles, scope, versioning). Referenced, not duplicated.

## Content Rules

- No content should exist in two places. Link, don't duplicate.
- CLAUDE.md files must contain useful context (not just placeholder or auto-generated content).
- Completed feature specs archive to CLAUDE.md + SUMMARY.md (PLAN/RESEARCH/SPEC go to archive/).
- Stale content (counts, dates, references) must be verifiable against the source of truth.
- Every directory with a CLAUDE.md should have content describing that directory's purpose and key files.

## When to Use DISCOVERY.md vs RESEARCH.md

- **RESEARCH.md**: Standard feature research during /plan. Focused analysis of a defined problem.
- **DISCOVERY.md**: Created when scope expands significantly during execution. Captures architectural questions, organizational analysis, or cross-cutting concerns that exceed RESEARCH.md's scope. A feature may have both.
