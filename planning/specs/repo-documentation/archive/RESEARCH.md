# Repo Documentation Research

## Problem Analysis

### Problem Domain

Repos using my-workflow generate many document types (specs, plans, summaries, context files, state tracking) but have no governing type system. The workflow defines templates for 4 types (spec, plan, workflow, command) while 13+ types exist without templates. No rules define where docs should live. No mechanism detects drift.

### Current State

**Document types in use today:**

| Type | Template? | Instances | Where Found |
|------|-----------|-----------|-------------|
| SPEC.md | Yes | 12 | planning/specs/{feature}/ |
| PLAN.md | Yes | 12 | planning/specs/{feature}/ |
| RESEARCH.md | Inline only | 10 | planning/specs/{feature}/ |
| SUMMARY.md | No | 9 | planning/specs/{feature}/ |
| CLAUDE.md | No | 22 | Root, .claude/, directories |
| README.md | No | 4 | Root, skills/, mcp/ |
| STATE.md | No | 1 | planning/ |
| BACKLOG.md | No | 1 | planning/ |
| OVERVIEW.md | No | 1 | planning/ |
| INCIDENT-*.md | No | 3 | planning/specs/{feature}/ |
| DESIGN.md | No | 1 | planning/specs/{feature}/ |
| SKILL.md | Convention | 110 | skills/{group}/{name}/ |
| Agent .md | Convention | 135 | agents/ |
| Workflow .md | Yes | 5 | skills/Planning/my-workflow/workflows/ |
| Command .md | Yes (deprecated) | 0 active | Migrated to skills |

See archive for full research details (file archived upon completion).
