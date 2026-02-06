# Brainstorming

Turn rough ideas into fully formed designs through collaborative dialogue.

## Overview

Help turn ideas into designs through natural conversation. Understand project context, ask questions one at a time, then present design in small validated sections.

## Usage

`/brainstorm [initial feature concept or topic]`

## Process

### Understanding the Idea

1. Check current project state (files, docs, recent commits)
2. Ask questions one at a time to refine the idea
3. Prefer multiple choice when possible, open-ended is fine too
4. Only one question per message
5. Focus on: purpose, constraints, success criteria

### Exploring Approaches

1. Generate 5 possible approaches with trade-offs
2. Each approach includes text and numeric probability
3. Sample from full distribution (probability < 0.10 each)
4. Present options with recommendation and reasoning
5. Lead with recommended option and explain why

### Presenting the Design

1. Once you understand what to build, present the design
2. Break into sections of 200-300 words
3. Ask after each section if it looks right
4. Cover: architecture, components, data flow, error handling, testing
5. Go back and clarify if something doesn't make sense

## After the Design

### Documentation

- Write validated design to `docs/plans/YYYY-MM-DD-<topic>-design.md`
- Use writing-clearly-and-concisely skill if available
- Commit design document to git

### Implementation (if continuing)

- Ask: "Ready to set up for implementation?"
- Use git-worktrees skill to create isolated workspace
- Use writing-plans skill for detailed implementation plan

## Key Principles

- **One question at a time** - Don't overwhelm
- **Multiple choice preferred** - Easier than open-ended
- **YAGNI ruthlessly** - Remove unnecessary features
- **Explore alternatives** - Always propose 2-3 approaches
- **Incremental validation** - Present in sections, validate each
- **Be flexible** - Go back when something doesn't make sense
