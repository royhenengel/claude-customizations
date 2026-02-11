# Repo Documentation Specification

## Goal

Create a documentation system for repos that use my-workflow. The system defines document types with templates, placement rules for where each type belongs, and an enforcement agent that validates and organizes documentation across the repo.

The claude-customizations repository has 502 markdown files across 7 zones with no governing structure. Content is duplicated, stale, and misplaced. The workflow already defines 4 templates (spec, plan, workflow, command) but 13+ document types have no template. This feature fills those gaps, codifies the rules, and creates an agent to enforce them.

## User Stories

- As a repo maintainer, I want every document type defined with a template so that new docs are consistent and complete
- As a repo maintainer, I want placement rules so that I never wonder where a doc should go
- As a Claude session, I want an enforcement agent I can invoke to validate and fix documentation drift in any repo with my-workflow
- As a repo maintainer, I want the agent to capture displaced data rather than discard it, because information is valuable

## Requirements

### Functional

#### Documentation Type System

- [ ] Define all document types used in repos with my-workflow
- [ ] Create templates for types that don't have them (CLAUDE.md, RESEARCH.md, SUMMARY.md, INCIDENT.md, README.md, STATE.md, BACKLOG.md, OVERVIEW.md, DESIGN.md)
- [ ] Streamline existing templates (spec, plan, workflow, command) if needed
- [ ] Define placement rules: which types go in which directories

#### Enforcement Agent

- [ ] Create a subagent that works in any repo with my-workflow
- [ ] Agent scans all markdown files in the repo
- [ ] Agent validates file placement against rules (is this file where it should be?)
- [ ] Agent validates file content against templates (does this file contain what it should?)
- [ ] Agent identifies content that belongs elsewhere and moves it to the right location
- [ ] Agent prioritizes data capture: never discard information, always relocate it
- [ ] Agent generates a report of findings and actions taken

#### Cleanup (First Run)

- [ ] Fix stale counts in CLAUDE.md and README.md
- [ ] Archive docs/ reference files that duplicate discoverable content
- [ ] Fix or remove skills/README.md (wrong content)
- [ ] Populate empty CLAUDE.md files with useful context
- [ ] Consolidate duplicated content across CLAUDE.md, README.md, OVERVIEW.md
- [ ] Move misplaced files in planning/specs/
- [ ] Fix broken @references in completed feature specs
- [ ] Archive completed feature specs to minimal form

### Non-Functional

- [ ] Templates are concise (no template exceeds 100 lines)
- [ ] Agent runs without requiring user input for standard validation
- [ ] Agent asks for confirmation before moving or restructuring content
- [ ] Documentation type system is portable across repos

## Constraints

- Templates and rules live in the my-workflow skill (portable, auto-available)
- Agent is a new subagent in agents/ (dedicated enforcement role)
- Preserve all information during cleanup. Archive, don't delete. Move content to the right place.
- Don't modify the planning/ workflow stages (SPEC/RESEARCH/PLAN/SUMMARY pattern stays)
- Don't modify individual agent .md files or SKILL.md files (those are definitions, not general docs)
- The reference/ directory is external methodology. Leave it as-is.

## Success Criteria

- [ ] Every document type has a template in the workflow
- [ ] Placement rules cover all directories in a my-workflow repo
- [ ] Enforcement agent exists and can be invoked on any repo
- [ ] Agent's first run on this repo produces clean results (no misplaced content, no stale data, no empty CLAUDE.md files)
- [ ] All file counts accurate across root documentation
- [ ] Zero duplicated content across root files

## Open Questions

None.
