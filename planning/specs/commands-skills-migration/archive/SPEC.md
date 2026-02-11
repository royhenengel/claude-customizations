# Commands & Skills Migration Specification

## Goal

Streamline the repository after Anthropic merged slash commands into skills (v2.1.3, January 2026). Reduce cognitive overhead by consolidating to a unified structure while fixing non-standard frontmatter fields.

## Background

Anthropic merged commands and skills in v2.1.3:
- Files at `.claude/commands/foo.md` and `.claude/skills/foo/SKILL.md` both create `/foo`
- Both work identically - no migration required for functionality
- Mental model simplified: one concept instead of two

Current repository state:
- 76 commands in `commands/`
- 62 skills in `skills/` (SKILL.md files)
- 4 naming conflicts (notion-*)
- Non-standard frontmatter fields in use

## User Stories

- As a developer, I want one place to look for custom slash commands so that I don't have to check two directories
- As a maintainer, I want consistent frontmatter across all skills so that validation is straightforward
- As a user, I want `/skill-name` to work predictably regardless of where the file lives

## Requirements

### Functional

- [ ] Resolve 4 naming conflicts between commands and skills (notion-knowledge-capture, notion-meeting-intelligence, notion-research-docs, notion-spec-to-implementation)
- [ ] Migrate commands worth keeping to skills/ structure
- [ ] Archive commands that are redundant with skills
- [ ] Update frontmatter to use only officially supported fields
- [ ] Ensure all migrated skills have valid `name` and `description` fields

### Non-Functional

- [ ] Zero functionality loss during migration
- [ ] Commands remain invocable via `/command-name` after migration
- [ ] No breaking changes to existing workflows

## Constraints

- **Backward compatibility**: Existing command invocations must continue to work
- **Incremental migration**: Can be done in phases (conflicts first, then bulk migration)
- **Official frontmatter only**: Per Anthropic docs, only `name` and `description` are required. Extended fields (`allowed-tools`, `argument-hint`, `model`) are supported but not documented in the basic spec.

## Scope

### In Scope

1. Conflict resolution for 4 duplicate names
2. Frontmatter standardization
3. Decision: keep commands/ directory or fully migrate to skills/
4. Archive plan for deprecated commands

### Out of Scope

- Rewriting command/skill content
- Adding new functionality
- Changes to agents/ directory

## Success Criteria

- [ ] Zero naming conflicts between commands/ and skills/
- [ ] All skills have valid frontmatter (name + description at minimum)
- [ ] Clear documentation on chosen structure
- [ ] No broken `/command` invocations

## Open Questions

- [ ] Should we fully migrate to skills-only structure, or keep commands/ for simple single-file items?
- [ ] What to do with cek-* commands (40+ commands from Context Engineering Kit)?
