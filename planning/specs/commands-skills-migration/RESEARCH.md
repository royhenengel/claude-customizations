# Commands & Skills Migration Research

## Problem Analysis

### Problem Domain

Anthropic merged slash commands into skills in v2.1.3 (January 2026), but this repository still maintains two separate directories with different structures. This creates:
- Cognitive overhead: Where do I look for `/foo`?
- Naming conflicts: 4 items exist in both locations
- Inconsistent frontmatter: Non-standard fields across files
- Maintenance burden: Two patterns to remember

### Current State

**Repository Structure:**
- `commands/` - 76 single-file .md commands
- `skills/` - 62 SKILL.md files in subdirectories

**Naming Conflicts (4):**
- notion-knowledge-capture
- notion-meeting-intelligence
- notion-research-docs
- notion-spec-to-implementation

**Frontmatter Usage:**

| Field | Commands | Skills | Official Spec |
|-------|----------|--------|---------------|
| name | 10 | 50 | Required |
| description | 99 | 67 | Required |
| allowed-tools | 19 | 27 | Supported (changelog) |
| argument-hint | 57 | 12 | Custom? |
| model | 0 | 12 | Custom? |
| triggers | 0 | 2 | Custom |
| version | 0 | 1 | Custom |
| license | 0 | 11 | Custom (Anthropic uses) |

**CEK Commands (40+):**
Commands prefixed with `cek-` from Context Engineering Kit. These form a cohesive workflow system that could be consolidated.

## Information Gathered

### Codebase Analysis

- Commands are single .md files with YAML frontmatter
- Skills are directories with SKILL.md plus optional references/, scripts/, assets/
- Both create `/name` invocation after the merge
- No technical difference in behavior post-merge

### External Research

#### Anthropic's Position

From changelog v2.1.3:
> "Merged slash commands and skills, simplifying the mental model with no change in behavior"

From official skill-creator SKILL.md, only two frontmatter fields are documented as required:
- `name` - becomes the /slash-command
- `description` - primary trigger mechanism

However, changelog entries confirm these fields are actively supported:
- `allowed-tools` - Fixed bugs related to tool restrictions
- `context: fork` - Run skill in isolated subagent
- `agent:` - Specify agent type for execution
- `disable-model-invocation` - Restrict to user-only invocation
- `user-invocable` - Control visibility in command menu

#### Community Findings

From GitHub issues:
- Issue #16900: Confusion about relationship post-merge (still open)
- Issue #17578: Documentation inconsistency (now fixed)

## Tradeoff Analysis

| Factor | Skills-Only | Hybrid | Status Quo |
|--------|-------------|--------|------------|
| Simplicity | One location | Two locations | Two locations |
| Consistency | High | Medium | Low |
| Migration effort | High | Medium | None |
| Future-proof | Yes | Partial | No |

### Risks

- **Migration risk**: Moving files could break invocations if done incorrectly
  - Mitigation: Test each migration before committing
- **CEK consolidation risk**: May lose granular invocation
  - Mitigation: Keep individual `/cek-*` aliases or use skill references

## Architectural Implications

### System Boundaries

Post-migration structure:
```
skills/
├── my-workflow/       (existing)
├── cek/               (consolidated from 40+ commands)
│   ├── SKILL.md
│   └── references/
├── notion-*/          (migrated, conflicts resolved)
├── commit/            (migrated from commands/)
├── ...
└── (all other migrated commands)

archive/
└── commands/          (original commands/ for reference)
```

### Dependencies

- All `/command-name` invocations must continue working
- Skills that reference commands by path need updating
- CLAUDE.md references may need updating

## Approach

**Chosen: Skills-only migration with CEK consolidation**

1. Resolve naming conflicts first (4 items)
2. Consolidate CEK commands into single skill
3. Migrate remaining commands to skills/
4. Archive original commands/ directory
5. Update documentation

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Skills-only | Single location, consistent | High migration effort | SELECTED |
| Hybrid | Lower effort | Still two locations | Rejected |
| Status quo | No effort | Growing tech debt | Rejected |

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target structure | Skills-only | Aligns with Anthropic's merge, single source of truth |
| CEK approach | Consolidate to one skill | Reduces 40+ directories to 1, uses references/ pattern |
| Archive strategy | Keep commands/ in archive/ | Preserves history, enables rollback if needed |
| Frontmatter policy | Standardize on name + description | Official spec fields, add others only when needed |

## Open Questions

(None - decisions made)

## Sources

- [Claude Code CHANGELOG.md](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [Anthropic skill-creator SKILL.md](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md)
- [GitHub Issue #16900](https://github.com/anthropics/claude-code/issues/16900)
- [GitHub Issue #17578](https://github.com/anthropics/claude-code/issues/17578)
