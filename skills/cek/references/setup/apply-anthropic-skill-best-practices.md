# Apply Anthropic Skill Best Practices

Comprehensive guide for skill development based on Anthropic's official best practices.

## Overview

Good skills are concise, well-structured, and tested with real usage. This guide provides authoring decisions to help write skills Claude can discover and use effectively.

## Core Principles

### Skill Metadata

At startup, only metadata (name and description) is pre-loaded. Claude reads SKILL.md when triggered, and additional files as needed. Being concise in SKILL.md still matters.

### Test with All Models

Skills effectiveness depends on underlying model:
- **Haiku** (fast): Does skill provide enough guidance?
- **Sonnet** (balanced): Is skill clear and efficient?
- **Opus** (powerful): Does skill avoid over-explaining?

## Structure

### Naming Conventions

Use **gerund form** (verb + -ing):
- "Processing PDFs"
- "Analyzing spreadsheets"
- "Testing code"

Avoid: "Helper", "Utils", "Tools"

### Writing Descriptions

**Always write in third person** (injected into system prompt):
- Good: "Processes Excel files and generates reports"
- Avoid: "I can help you process Excel files"

**Be specific, include key terms** - both what skill does and when to use:

```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

### Progressive Disclosure

Keep SKILL.md body under 500 lines. Split content when approaching limit.

**Pattern 1: High-level guide with references**
```markdown
## Quick start
[Essential content]

## Advanced features
**Feature A**: See [FEATURE_A.md](FEATURE_A.md)
```

**Pattern 2: Domain-specific organization**
```
skill/
├── SKILL.md (overview)
└── reference/
    ├── finance.md
    ├── sales.md
    └── product.md
```

**Pattern 3: Conditional details**
```markdown
## Basic usage
[Simple content]

**Advanced feature**: See [ADVANCED.md](ADVANCED.md)
```

### Avoid Nested References

Keep references one level deep from SKILL.md. Claude may partially read nested files.

### Table of Contents

For files >100 lines, include TOC at top so Claude sees scope even with partial reads.

## Workflows and Feedback Loops

### Complex Tasks

Break into clear, sequential steps. Provide checklist for complex workflows:

```markdown
Copy this checklist:
- [ ] Step 1: Read source documents
- [ ] Step 2: Identify key themes
- [ ] Step 3: Cross-reference claims
```

### Feedback Loops

Common pattern: Run validator → fix errors → repeat

```markdown
1. Make edits
2. Validate immediately: `python validate.py`
3. If validation fails: Fix and validate again
4. Only proceed when validation passes
```

## Content Guidelines

### Avoid Time-Sensitive Information

Bad: "If before August 2025, use old API"

Good: Use "old patterns" section with `<details>` tag.

### Consistent Terminology

Choose one term, use throughout:
- Always "API endpoint" (not mix with "URL", "route")
- Always "field" (not mix with "box", "element")

## Common Patterns

### Template Pattern

Provide templates for output format. Match strictness to needs:
- Strict: "ALWAYS use this exact structure"
- Flexible: "Sensible default, adjust as needed"

### Examples Pattern

Provide input/output pairs for quality-dependent outputs:

```markdown
## Commit message format

**Example 1:**
Input: Added user authentication
Output: `feat(auth): implement JWT-based authentication`
```

### Conditional Workflow

Guide through decision points:

```markdown
## Workflow

1. Determine type:
   **Creating?** → Follow "Creation workflow"
   **Editing?** → Follow "Editing workflow"
```

## Evaluation and Iteration

### Build Evaluations First

Create evaluations BEFORE extensive documentation:

1. Identify gaps: Run Claude without skill, document failures
2. Create evaluations: Three scenarios testing gaps
3. Establish baseline: Measure without skill
4. Write minimal instructions: Just enough to pass
5. Iterate: Execute, compare, refine

### Iterate with Claude

Work with one Claude instance ("A") to create skill used by others ("B"):

1. Complete task without skill, note what context you provide
2. Identify reusable pattern
3. Ask Claude A to create skill
4. Review for conciseness
5. Test with Claude B on related tasks
6. Iterate based on observation

### Observe Navigation

Watch how Claude uses skills:
- Unexpected exploration paths?
- Missed connections?
- Overreliance on certain sections?
- Ignored content?

## Anti-Patterns

- **Windows paths**: Use forward slashes always
- **Too many options**: Provide default with escape hatch
- **Assuming tools installed**: Be explicit about dependencies

## Advanced: Executable Code

### Solve, Don't Punt

Handle errors explicitly rather than failing:

```python
try:
    return open(path).read()
except FileNotFoundError:
    print(f"Creating default for {path}")
    return ''
```

### Utility Scripts

Benefits: More reliable, save tokens, ensure consistency.

Make clear whether to execute or read as reference:
- "Run `analyze.py` to extract fields" (execute)
- "See `analyze.py` for the algorithm" (read)

### Verifiable Intermediate Outputs

Plan-validate-execute pattern:
1. Create plan file
2. Validate plan
3. Execute
4. Verify

## Checklist

### Core Quality
- [ ] Description specific with key terms
- [ ] Includes what skill does AND when to use
- [ ] SKILL.md body under 500 lines
- [ ] Details in separate files (if needed)
- [ ] No time-sensitive information
- [ ] Consistent terminology
- [ ] Concrete examples
- [ ] References one level deep
- [ ] Clear workflow steps

### Code and Scripts
- [ ] Scripts solve problems, don't punt
- [ ] Explicit error handling
- [ ] No voodoo constants
- [ ] Required packages listed
- [ ] Clear documentation
- [ ] Forward slashes only

### Testing
- [ ] At least three evaluations
- [ ] Tested with Haiku, Sonnet, Opus
- [ ] Tested with real scenarios
