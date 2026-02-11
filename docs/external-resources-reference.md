# External Resources Reference

External repositories, plugins, and tools that have been evaluated and integrated into this project.

---

## Workflow Systems

| Resource | License | Status | Integration |
|----------|---------|--------|-------------|
| [superpowers](https://github.com/obra/superpowers) | MIT | Cherry-picked | Git worktrees skill → [skills/git-worktrees/](../skills/git-worktrees/) |
| [GSD](https://github.com/glittercowboy/get-shit-done) | MIT | Cherry-picked | Subagent patterns → [skills/my-workflow/references/gsd/](../skills/my-workflow/references/gsd/) |
| [CEK](https://github.com/NeoLabHQ/context-engineering-kit) | MIT | Cherry-picked | TDD, Clean Architecture → [skills/software-development-practices/](../skills/software-development-practices/) |
| [Everything Claude](https://github.com/affaan-m/everything-claude-code) | MIT | Complete | Instinct system, rules (18/18 tasks) |

---

## Session Continuity & Memory

| Resource | License | Status | Integration |
|----------|---------|--------|-------------|
| [claude-mem](https://github.com/thedotmack/claude-mem) | MIT | Complete | Plugin v9.0.12, session capture + retrieval |
| Knowledge Graph MCP | - | Kept | Different purpose (curated facts vs automatic capture) |

---

## Utilities

| Resource | License | Status | Integration |
|----------|---------|--------|-------------|
| [plannotator](https://github.com/backnotprop/plannotator) | BSL 1.1 | Complete | Visual plan/diff annotation (v0.6.8) |
| [repomix](https://github.com/yamadashy/repomix) | MIT | Optional | Pack repo for external AI tools |
| [call-me](https://github.com/ZeframLou/call-me) | MIT | Optional | Phone notifications |

---

## Learning & Knowledge

| Resource | License | Status | Integration |
|----------|---------|--------|-------------|
| [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) | - | Complete | /compound command → planning/solutions/ |
| [living-requirements](https://github.com/peterbe/death-of-the-prd) | - | Complete | Skill → [skills/Planning/living-requirements/](../skills/Planning/living-requirements/) |

---

## Integration Patterns

### Cherry-Picked Skills

When cherry-picking from external sources:
1. Create skill in `skills/<skill-name>/SKILL.md`
2. Add attribution at bottom: `*Cherry-picked from [source](url) (License)*`
3. Optionally store original in `skills/<skill-name>/references/<source>/`
4. Update this reference document

### Full Plugin Installations

Plugins installed via Claude Code marketplace:
- claude-mem (v9.0.12)
- plannotator (v0.6.8)

### Reference Storage

Original source files stored in `references/` subdirectories:

- `skills/my-workflow/references/gsd/` - GSD README
- `skills/my-workflow/references/taches-create-plans/` - Taches planning (single source of truth)
- `skills/software-development-practices/references/` - CEK references

---

## Evaluation History

Detailed analysis of all evaluated repositories: [reddit-sources-evaluation.md](../planning/specs/reddit-sources-evaluation.md)

---

*Last updated: 2026-02-10*
