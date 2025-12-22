# Skill Template

Use this template when generating new skills.

---

## Template

```markdown
---
name: {{skill-name}}
description: {{Brief description of what this does. Include trigger phrases like "Use when..." to help Claude know when to activate.}}
allowed-tools: {{Optional: Read, Grep, Glob, Edit, Write, Bash - omit if all tools allowed}}
---

# {{Skill Title}}

## Purpose
{{One paragraph explaining what this skill does and why it's useful.}}

## When to Use
- {{Trigger condition 1}}
- {{Trigger condition 2}}
- {{Trigger condition 3}}

## Instructions

### Step 1: {{First Action}}
{{Detailed instructions for Claude to follow}}

### Step 2: {{Second Action}}
{{Detailed instructions for Claude to follow}}

### Step 3: {{Third Action}}
{{Detailed instructions for Claude to follow}}

## Examples

### Example 1: {{Scenario}}
**User says:** "{{example user input}}"

**Claude does:**
1. {{action 1}}
2. {{action 2}}
3. {{action 3}}

**Result:** {{expected outcome}}

### Example 2: {{Another Scenario}}
**User says:** "{{example user input}}"

**Claude does:**
1. {{action 1}}
2. {{action 2}}

**Result:** {{expected outcome}}

## Error Handling
- If {{condition}}: {{how to handle}}
- If {{condition}}: {{how to handle}}

## Dependencies
- {{Required tool, package, or service}}
- {{Required tool, package, or service}}

## Notes
- {{Important consideration}}
- {{Edge case to be aware of}}
```

---

## Guidelines for Filling Template

### name
- Lowercase letters, numbers, hyphens only
- Max 64 characters
- Examples: `stripe-invoicing`, `weekly-report-generator`, `code-reviewer`

### description
- Max 1024 characters
- MUST include trigger phrases
- Format: "{{What it does}}. Use when {{trigger conditions}}."
- Example: "Generate weekly sales reports with charts. Use when user mentions weekly reports, sales summaries, or recurring data exports."

### allowed-tools
- Only include if you want to RESTRICT tools
- Omit entirely for full tool access
- Common restrictions:
  - Read-only: `Read, Grep, Glob`
  - No file writes: `Read, Grep, Glob, Bash`
  - Full access: (omit the line)

### Instructions
- Write for Claude, not the end user
- Be specific and actionable
- Include decision points ("If X, then Y")
- Reference any supporting files

### Examples
- Use realistic scenarios
- Show the complete flow
- Include edge cases if relevant

---

## Directory Structure for Complex Skills

```
skill-name/
├── SKILL.md              # Required: Main skill file
├── REFERENCE.md          # Optional: Detailed documentation
├── templates/            # Optional: Output templates
│   └── report.md
└── scripts/              # Optional: Helper scripts
    └── helper.py
```

---

## Quick Validation Checklist

Before finalizing a generated skill:

- [ ] Name is lowercase-with-hyphens, max 64 chars
- [ ] Description includes clear trigger conditions
- [ ] Instructions are specific and actionable
- [ ] At least 2 examples provided
- [ ] Dependencies are documented
- [ ] No placeholder text remaining ({{...}})
