# Repo Documentation Specification

## Goal

Create a documentation system for repos that use my-workflow. The system defines document types with templates, placement rules for where each type belongs, and an enforcement agent that validates and organizes documentation across the repo.

The claude-customizations repository has 502 markdown files across 7 zones with no governing structure. Content is duplicated, stale, and misplaced. The workflow already defines 4 templates (spec, plan, workflow, command) but 13+ document types have no template. This feature fills those gaps, codifies the rules, and creates an agent to enforce them.

## User Stories

- As a repo maintainer, I want every document type defined with a template so that new docs are consistent and complete
- As a repo maintainer, I want placement rules so that I never wonder where a doc should go
- As a Claude session, I want an enforcement agent I can invoke to validate and fix documentation drift in any repo with my-workflow
- As a repo maintainer, I want the agent to capture displaced data rather than discard it, because information is valuable

See archive for full requirements (file archived upon completion).
