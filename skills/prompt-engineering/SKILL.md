---
name: prompt-engineering
description: Use this skill when writing commands, hooks, skills for Claude Code, or prompts for subagents or any other LLM interaction, including optimizing prompts, improving LLM outputs, or designing production prompt templates.
---

# Prompt Engineering

## Table of Contents

1. [Overview](#overview)
2. [Core Techniques](#core-techniques)
3. [Meta-Prompt Workflows](#meta-prompt-workflows)
4. [Persuasion Principles](#persuasion-principles)
5. [Quick Reference](#quick-reference)

---

## Overview

Prompt engineering is the discipline of designing effective instructions for LLMs. This skill covers both single-prompt techniques and multi-stage Claude-to-Claude pipelines.

**Core principle:** Be specific, show don't tell, test extensively.

**When to use:**
- Writing Claude Code commands, hooks, skills
- Creating prompts for subagents
- Designing production prompt templates
- Building multi-stage research → plan → implement workflows

---

## Core Techniques

### 1. Few-Shot Learning

Teach by showing examples instead of explaining rules. Include 2-5 input-output pairs demonstrating desired behavior.

```markdown
Extract key information from support tickets:

Input: "My login doesn't work and I keep getting error 403"
Output: {"issue": "authentication", "error_code": "403", "priority": "high"}

Input: "Feature request: add dark mode to settings"
Output: {"issue": "feature_request", "error_code": null, "priority": "low"}

Now process: "Can't upload files larger than 10MB, getting timeout"
```

**When to use:** Consistent formatting, specific reasoning patterns, edge case handling.

### 2. Chain-of-Thought Prompting

Request step-by-step reasoning before the final answer. Improves accuracy on analytical tasks by 30-50%.

```markdown
Analyze this bug report and determine root cause.

Think step by step:
1. What is the expected behavior?
2. What is the actual behavior?
3. What changed recently that could cause this?
4. What components are involved?
5. What is the most likely root cause?

Bug: "Users can't save drafts after the cache update deployed yesterday"
```

**When to use:** Complex problems, multi-step logic, mathematical reasoning.

### 3. Progressive Disclosure

Start simple, add complexity only when needed:

| Level | Example |
|-------|---------|
| 1. Direct | "Summarize this article" |
| 2. Constrained | "Summarize in 3 bullet points, focusing on key findings" |
| 3. Reasoned | "Identify the main findings, then summarize in 3 bullet points" |
| 4. Examples | Include 2-3 example summaries with input-output pairs |

### 4. System Prompt Design

Set global behavior that persists across the conversation:

```markdown
System: You are a senior backend engineer specializing in API design.

Rules:
- Always consider scalability and performance
- Suggest RESTful patterns by default
- Flag security concerns immediately
- Provide code examples in Python
- Use early return pattern

Format responses as:
1. Analysis
2. Recommendation
3. Code example
4. Trade-offs
```

### 5. Template Systems

Build reusable prompt structures with variables:

```python
template = """
Review this {language} code for {focus_area}.

Code:
{code_block}

Provide feedback on:
{checklist}
"""

prompt = template.format(
    language="Python",
    focus_area="security vulnerabilities",
    code_block=user_code,
    checklist="1. SQL injection\n2. XSS risks\n3. Authentication"
)
```

---

## Meta-Prompt Workflows

For Claude-to-Claude pipelines where one prompt's output feeds another.

### Folder Structure

```
.prompts/
├── 001-auth-research/
│   ├── completed/
│   │   └── 001-auth-research.md    # Prompt (archived after run)
│   ├── auth-research.md            # Full output (XML for Claude)
│   └── SUMMARY.md                  # Executive summary (for human)
├── 002-auth-plan/
│   └── ...
├── 003-auth-implement/
│   └── ...
```

### Four Prompt Purposes

| Purpose | Use Case | Output |
|---------|----------|--------|
| **Research** | Gather information, understand something | Findings with confidence scores |
| **Plan** | Create approach, roadmap, strategy | Structured plan with phases |
| **Do** | Execute a task, produce artifact | Code, files, implementations |
| **Refine** | Improve existing research/plan | Updated version with changes |

### Prompt Structure

All prompts include:
1. **Objective** - What to accomplish, why it matters
2. **Context** - Referenced files (@), dynamic context (!)
3. **Requirements** - Specific instructions
4. **Output specification** - Where to save, structure
5. **Success criteria** - How to know it worked

### Required Metadata (Research/Plan)

```xml
<confidence>How confident in findings</confidence>
<dependencies>What's needed to proceed</dependencies>
<open_questions>What remains uncertain</open_questions>
<assumptions>What was assumed</assumptions>
```

### SUMMARY.md Format

Every prompt creates a SUMMARY.md for human scanning:

```markdown
# {Topic} Summary

**{One-liner substantive description}**

## Key Findings
- Actionable takeaway 1
- Actionable takeaway 2

## Decisions Needed
- What requires user input

## Blockers
- External impediments

## Next Step
- Concrete forward action
```

### Execution Modes

**Sequential:** Chained prompts where each depends on previous
```
001-research → 002-plan → 003-implement
```

**Parallel:** Independent prompts that can run concurrently
```
001-api-research  ┐
002-db-research   ├→ 003-architecture-plan
003-ui-research   ┘
```

---

## Persuasion Principles

LLMs respond to persuasion principles. Understanding this helps design effective skills.

### Effective Principles

| Principle | How It Works | When to Use |
|-----------|--------------|-------------|
| **Authority** | Imperative language: "YOU MUST", "Never", "No exceptions" | Discipline-enforcing skills (TDD, verification) |
| **Commitment** | Require announcements, force explicit choices | Multi-step processes, accountability |
| **Scarcity** | Time-bound: "Before proceeding", "Immediately after" | Preventing "I'll do it later" |
| **Social Proof** | Universal patterns: "Every time", "X without Y = failure" | Documenting standards, warning about failures |
| **Unity** | Collaborative: "our codebase", "we're colleagues" | Collaborative workflows |

### Examples

```markdown
# Authority (discipline enforcement)
✅ Write code before test? Delete it. Start over. No exceptions.
❌ Consider writing tests first when feasible.

# Commitment (accountability)
✅ When you find a skill, you MUST announce: "I'm using [Skill Name]"
❌ Consider letting your partner know which skill you're using.

# Scarcity (immediate action)
✅ After completing a task, IMMEDIATELY request code review before proceeding.
❌ You can review code when convenient.
```

### Principle Combinations

| Prompt Type | Use | Avoid |
|-------------|-----|-------|
| Discipline-enforcing | Authority + Commitment + Social Proof | Liking, Reciprocity |
| Guidance/technique | Moderate Authority + Unity | Heavy authority |
| Collaborative | Unity + Commitment | Authority, Liking |
| Reference | Clarity only | All persuasion |

### Why This Works

**Bright-line rules reduce rationalization:**
- "YOU MUST" removes decision fatigue
- Absolute language eliminates "is this an exception?" questions

**Implementation intentions create automatic behavior:**
- Clear triggers + required actions = automatic execution
- "When X, do Y" more effective than "generally do Y"

---

## Quick Reference

### Conciseness Rules

The context window is shared. Only add context Claude doesn't already have.

**Good** (~50 tokens):
```markdown
## Extract PDF text
Use pdfplumber:
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

**Bad** (~150 tokens):
```markdown
## Extract PDF text
PDF (Portable Document Format) files are a common file format...
[unnecessary explanation of what PDFs are]
```

### Degrees of Freedom

| Freedom Level | When to Use | Example |
|---------------|-------------|---------|
| High (text) | Multiple valid approaches | Code review guidelines |
| Medium (pseudocode) | Preferred pattern exists | Report generation template |
| Low (specific script) | Operations are fragile | Database migration commands |

### Instruction Hierarchy

```
[System Context] → [Task Instruction] → [Examples] → [Input Data] → [Output Format]
```

### Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Over-engineering | Start simple, add complexity only when needed |
| Example pollution | Use examples that match the target task |
| Context overflow | Balance examples against token limits |
| Ambiguous instructions | Be specific, leave no room for interpretation |
| Ignoring edge cases | Test on unusual or boundary inputs |

### Optimization Tips

**Token Efficiency:**
- Remove redundant words
- Use abbreviations after first definition
- Move stable content to system prompts

**Latency Reduction:**
- Minimize prompt length without sacrificing quality
- Use streaming for long-form outputs
- Cache common prompt prefixes
