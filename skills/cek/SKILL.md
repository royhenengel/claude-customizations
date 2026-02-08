---
name: context-engineering-kit
description: Use when developing features using Specification Driven Development (SDD) methodology - provides complete workflow from setup through documentation, including analysis methods (Kaizen, Five Whys, A3), code review, testing, and utilities for commits, PRs, hooks, skills, and commands.
---

# Context Engineering Kit (CEK)

## Overview

Complete methodology for Specification Driven Development (SDD) - a systematic approach to feature development that emphasizes understanding before building, testing before implementing, and documentation throughout.

## Core Workflow

The CEK workflow follows six numbered stages:

| Stage | Purpose | Reference |
|-------|---------|-----------|
| **00-Setup** | Create project constitution and templates | [setup.md](references/setup.md) |
| **01-Specify** | Define feature specification from description | [specify.md](references/specify.md) |
| **02-Plan** | Research codebase and design architecture | [plan.md](references/plan.md) |
| **03-Tasks** | Generate actionable task list | [tasks.md](references/tasks.md) |
| **04-Implement** | Execute tasks with quality review | [implement.md](references/implement.md) |
| **05-Document** | Create documentation and lessons learned | [document.md](references/document.md) |

## Supporting Methods

### Analysis (Kaizen Methods)

For problem analysis and continuous improvement:

| Method | When to Use | Reference |
|--------|-------------|-----------|
| **Analyse** | Auto-select best Kaizen method for target | [analysis/analyse.md](references/analysis/analyse.md) |
| **Analyse Problem (A3)** | Comprehensive one-page problem documentation | [analysis/analyse-problem.md](references/analysis/analyse-problem.md) |
| **Cause and Effect** | Fishbone analysis across six categories | [analysis/cause-and-effect.md](references/analysis/cause-and-effect.md) |
| **Five Whys** | Drill from symptoms to root causes | [analysis/why.md](references/analysis/why.md) |
| **Root Cause Tracing** | Trace bugs backward through call stack | [analysis/root-cause-tracing.md](references/analysis/root-cause-tracing.md) |
| **PDCA** | Plan-Do-Check-Act improvement cycle | [analysis/plan-do-check-act.md](references/analysis/plan-do-check-act.md) |

### Code Review

| Method | When to Use | Reference |
|--------|-------------|-----------|
| **Critique** | Multi-perspective review with specialized judges | [review/critique.md](references/review/critique.md) |
| **Review PR** | Comprehensive PR review with agents | [review/review-pr.md](references/review/review-pr.md) |
| **Review Local** | Review uncommitted changes | [review/review-local-changes.md](references/review/review-local-changes.md) |
| **Attach to PR** | Add line-specific review comments | [review/attach-review-to-pr.md](references/review/attach-review-to-pr.md) |

### Testing

| Method | When to Use | Reference |
|--------|-------------|-----------|
| **Test Skill** | TDD for skills - verify under pressure | [testing/test-skill.md](references/testing/test-skill.md) |
| **Test Prompt** | TDD for prompts using subagents | [testing/test-prompt.md](references/testing/test-prompt.md) |
| **Fix Tests** | Systematically fix failing tests | [testing/fix-tests.md](references/testing/fix-tests.md) |
| **Write Tests** | Add test coverage for local changes | [testing/write-tests.md](references/testing/write-tests.md) |

### Utilities

| Utility | Purpose | Reference |
|---------|---------|-----------|
| **Brainstorm** | Turn ideas into designs through dialogue | [utilities/brainstorm.md](references/utilities/brainstorm.md) |
| **Create Ideas** | Generate ideas using creative sampling | [utilities/create-ideas.md](references/utilities/create-ideas.md) |
| **Commit** | Well-formatted commits with conventional messages | [utilities/commit.md](references/utilities/commit.md) |
| **Create PR** | Create PRs using GitHub CLI | [utilities/create-pr.md](references/utilities/create-pr.md) |
| **Create Hook** | Configure git hooks with testing | [utilities/create-hook.md](references/utilities/create-hook.md) |
| **Create Skill** | Guide for creating effective skills | [utilities/create-skill.md](references/utilities/create-skill.md) |
| **Create Command** | Interactive command creation assistant | [utilities/create-command.md](references/utilities/create-command.md) |
| **Analyze Issue** | Analyze GitHub issue and create spec | [utilities/analyze-issue.md](references/utilities/analyze-issue.md) |
| **Memorize** | Curate insights into CLAUDE.md | [utilities/memorize.md](references/utilities/memorize.md) |
| **Reflect** | Self-refinement framework | [utilities/reflect.md](references/utilities/reflect.md) |

### Project Setup

| Setup | Purpose | Reference |
|-------|---------|-----------|
| **TypeScript Best Practices** | Add TypeScript rules to CLAUDE.md | [setup/add-typescript-best-practices.md](references/setup/add-typescript-best-practices.md) |
| **Anthropic Skill Best Practices** | Official skill authoring guidelines | [setup/apply-anthropic-skill-best-practices.md](references/setup/apply-anthropic-skill-best-practices.md) |
| **Code Formatting** | Setup code formatting rules | [setup/setup-code-formatting.md](references/setup/setup-code-formatting.md) |
| **Codemap CLI** | Setup codebase visualization | [setup/setup-codemap-cli.md](references/setup/setup-codemap-cli.md) |

## Quick Start

1. **New Feature**: Start with setup (00) if no constitution exists, then specify (01) the feature
2. **Bug Fix**: Use analysis methods to find root cause, then implement fix
3. **Code Review**: Use review methods before merging
4. **Quality Check**: Use testing methods to verify changes

## Key Principles

- **Specification First**: Understand before building
- **TDD Approach**: Tests guide implementation
- **Incremental Delivery**: Small, validated steps
- **Documentation Throughout**: Capture decisions and learnings
- **Quality Gates**: Review at each stage

## Aliases (Legacy Command Names)

For backward compatibility with previous command names:

| Old Command | New Location |
|-------------|--------------|
| `cek-00-setup` | [references/setup.md](references/setup.md) |
| `cek-01-specify` | [references/specify.md](references/specify.md) |
| `cek-02-plan` | [references/plan.md](references/plan.md) |
| `cek-03-tasks` | [references/tasks.md](references/tasks.md) |
| `cek-04-implement` | [references/implement.md](references/implement.md) |
| `cek-05-document` | [references/document.md](references/document.md) |
| `cek-analyse` | [references/analysis/analyse.md](references/analysis/analyse.md) |
| `cek-analyse-problem` | [references/analysis/analyse-problem.md](references/analysis/analyse-problem.md) |
| `cek-cause-and-effect` | [references/analysis/cause-and-effect.md](references/analysis/cause-and-effect.md) |
| `cek-why` | [references/analysis/why.md](references/analysis/why.md) |
| `cek-root-cause-tracing` | [references/analysis/root-cause-tracing.md](references/analysis/root-cause-tracing.md) |
| `cek-plan-do-check-act` | [references/analysis/plan-do-check-act.md](references/analysis/plan-do-check-act.md) |
| `cek-critique` | [references/review/critique.md](references/review/critique.md) |
| `cek-review-pr` | [references/review/review-pr.md](references/review/review-pr.md) |
| `cek-review-local-changes` | [references/review/review-local-changes.md](references/review/review-local-changes.md) |
| `cek-attach-review-to-pr` | [references/review/attach-review-to-pr.md](references/review/attach-review-to-pr.md) |
| `cek-test-skill` | [references/testing/test-skill.md](references/testing/test-skill.md) |
| `cek-test-prompt` | [references/testing/test-prompt.md](references/testing/test-prompt.md) |
| `cek-fix-tests` | [references/testing/fix-tests.md](references/testing/fix-tests.md) |
| `cek-write-tests` | [references/testing/write-tests.md](references/testing/write-tests.md) |
| `cek-brainstorm` | [references/utilities/brainstorm.md](references/utilities/brainstorm.md) |
| `cek-create-ideas` | [references/utilities/create-ideas.md](references/utilities/create-ideas.md) |
| `cek-commit` | [references/utilities/commit.md](references/utilities/commit.md) |
| `cek-create-pr` | [references/utilities/create-pr.md](references/utilities/create-pr.md) |
| `cek-create-hook` | [references/utilities/create-hook.md](references/utilities/create-hook.md) |
| `cek-create-skill` | [references/utilities/create-skill.md](references/utilities/create-skill.md) |
| `cek-create-command` | [references/utilities/create-command.md](references/utilities/create-command.md) |
| `cek-analyze-issue` | [references/utilities/analyze-issue.md](references/utilities/analyze-issue.md) |
| `cek-memorize` | [references/utilities/memorize.md](references/utilities/memorize.md) |
| `cek-reflect` | [references/utilities/reflect.md](references/utilities/reflect.md) |
