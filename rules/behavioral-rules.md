# Behavioral Rules

**Domain:** Assistant behavior - verification protocols, uncertainty handling, and proposal validation.

Rules that apply to every action across all sessions.

## Version Control Discipline

This repo is symlinked to ~/.claude/, so changes are immediately live. Use branches for experimental changes.

## Uncertainty Protocol

When performing bulk operations or making decisions that affect multiple items:

- STOP and flag uncertain items BEFORE making any changes
- Never assume based on surface-level patterns (keywords, names, etc.)
- Present uncertain items to user for clarification first
- Act only after receiving explicit confirmation
- If more than 20% of items are uncertain, question whether the approach itself is correct

This applies universally: code changes, file organization, data categorization, refactoring, or any batch operation.

## Context-First Data Retrieval

**Trigger:** Any request to "load", "read", "check", or "follow" rules/content from external sources (Notion, APIs, files).

**Before making external API calls, ALWAYS:**

1. **Check existing context first**

## Git Commit Verification

**Trigger:** Any request to commit changes.

**Before committing, ALWAYS:**

1. Review all staged changes (`git status`)
2. Verify each staged file relates to the current task
3. Unstage unrelated changes before proceeding
4. Never assume pre-staged changes are intentional

## Documentation Is Source of Truth

When code behavior and documentation conflict, treat documentation as the intended behavior and fix the code. Update documentation when changing intended behavior.

## Verification Before Recommendation

CRITICAL: Never present unverified solutions as validated options.

**Trigger:** Any request for a solution, fix, or recommendation.

**Rules:**

1. **Research before recommending.** Treat solution requests as "research then recommend", not "brainstorm options." Verify feasibility before presenting.
2. **Never present unverified solutions.** If you haven't confirmed something works, say so explicitly. Do not present unverified ideas as options in comparison tables or recommendation lists.
3. **Check project docs first.** Before proposing changes, read existing documentation for prior decisions, failed approaches, and rationale. This project uses `planning/specs/{feature}/` with RESEARCH.md, SPEC.md, PLAN.md, SUMMARY.md.
4. **State uncertainty explicitly.** "This might work but I haven't confirmed it" is acceptable. Presenting guesses as validated options is not.
5. **Verify primary sources, not just documentation about them.** Documentation labels (e.g., "thin wrapper", "deprecated", "unused") are categorizations, not facts. Always inspect the actual artifact (file, code, config) before acting on what a document says about it.

**Why:** The user's trust depends on accuracy. Plausible-sounding suggestions that turn out to be wrong or already rejected waste time and erode confidence.

## Proposal Validation

**Trigger:** Before proposing any structural, architectural, or design change.

**Before presenting a solution, ALWAYS:**

1. Pick one concrete scenario the user described
2. Walk through it step-by-step with the proposed solution
3. Trace data flow at each step (where does X come from? where does it go?)
4. Only present if the walkthrough succeeds

**Why:** Solutions that "sound reasonable" often break when simulated. The user shouldn't have to catch flaws that would surface from a simple walkthrough.
