---
name: debugging-practices
description: Deep analysis debugging mode for complex issues. Activates methodical investigation protocol with evidence gathering, hypothesis testing, and rigorous verification. Use when standard troubleshooting fails or when issues require systematic root cause analysis.
---

# Debugging Practices

## Table of Contents

1. [Overview](#overview)
2. [Evidence Gathering](#evidence-gathering)
3. [Root Cause Analysis](#root-cause-analysis)
4. [Solution Development](#solution-development)
5. [Investigation Techniques](#investigation-techniques)
6. [Quick Reference](#quick-reference)

---

## Overview

Deep analysis debugging mode for complex issues. This skill activates when standard troubleshooting has failed and requires methodical investigation with evidence gathering, hypothesis testing, and rigorous verification.

**Core principle:** VERIFY, DON'T ASSUME. Every hypothesis must be tested. Every "fix" must be validated. No solutions without evidence.

**Critical insight:** Code you wrote is guilty until proven innocent. Your mental model of "how it should work" may be wrong. Treat code you wrote with MORE skepticism than unfamiliar code.

---

## Evidence Gathering

Before proposing any solution:

### A. Document Current State

- What is the EXACT error message or unexpected behavior?
- What are the EXACT steps to reproduce?
- What is the ACTUAL output vs EXPECTED output?
- When did this start working incorrectly (if known)?

### B. Map the System

- Trace the execution path from entry point to failure point
- Identify all components involved
- Read relevant source files completely, not just scanning
- Note dependencies, imports, configurations affecting this area

### C. Gather External Knowledge

When needed:
- Use MCP servers for API documentation, library details
- Use web search for error messages, framework-specific behaviors
- Check official docs for intended behavior vs what you observe
- Look for known issues, breaking changes, version-specific quirks

### Signals You Need Research

| Signal | Research Needed |
|--------|-----------------|
| Error message you've never seen | Search error message |
| Library behavior seems wrong | Check library docs/changelog |
| "This should work" | Verify your understanding is correct |
| Version-specific behavior | Check release notes |
| External API involved | Verify API contract |

---

## Root Cause Analysis

### A. Form Hypotheses

Based on evidence, list possible causes:

```markdown
1. [Hypothesis 1] - because [specific evidence]
2. [Hypothesis 2] - because [specific evidence]
3. [Hypothesis 3] - because [specific evidence]
```

### B. Test Each Hypothesis

For each hypothesis:
- What would prove this true?
- What would prove this false?
- Design a minimal test
- Execute and document results

### C. Eliminate or Confirm

Don't move forward until you can answer:
- Which hypothesis is supported by evidence?
- What evidence contradicts other hypotheses?
- What additional information is needed?

### Hypothesis Quality

**Good hypotheses are falsifiable:**
```markdown
✅ "The timeout is caused by N+1 queries"
   → Test: Add query logging, count queries
   → If >100 queries on page load, confirmed
   → If <10 queries, falsified

❌ "Something is wrong with the database"
   → Too vague to test
```

**Strong vs Weak Evidence:**

| Strong Evidence | Weak Evidence |
|-----------------|---------------|
| Reproducible behavior | "It happened once" |
| Logged/measurable data | "I think I saw..." |
| Matches known patterns | Speculation |
| Isolated test proves it | "It worked when I..." |

---

## Solution Development

**Only after confirming root cause:**

### A. Design Solution

- What is the MINIMAL change that addresses the root cause?
- What are potential side effects?
- What could this break?

### B. Implement with Verification

- Make the change
- Add logging/debugging output if needed to verify behavior
- Document why this change addresses the root cause

### C. Test Thoroughly

- Does the original issue still occur?
- Do the reproduction steps now work?
- Run relevant tests if they exist
- Check for regressions in related functionality

### Verification Checklist

Before marking complete:
- [ ] Root cause identified with evidence
- [ ] Solution addresses root cause (not symptoms)
- [ ] Original reproduction steps pass
- [ ] No new failures introduced
- [ ] Can explain solution to someone else

---

## Investigation Techniques

### Binary Search / Divide and Conquer

When you have a large codebase or long execution path:

1. Find the midpoint of suspected problem area
2. Add logging/breakpoint at midpoint
3. Determine which half contains the bug
4. Repeat until isolated

**Example:**
```
Request → Auth → Validation → Processing → Database → Response
                     ↑
              Add logging here first

If data correct here → problem is downstream
If data wrong here → problem is upstream
```

### Minimal Reproduction

Strip away everything not essential to reproduce the bug:

1. Create isolated test case
2. Remove dependencies one by one
3. Simplify until bug disappears
4. The last thing removed is likely the cause

### Working Backwards

Start from desired state, trace backwards:

1. What should the output be?
2. What produces that output?
3. What feeds into that producer?
4. Where does the chain break?

### Add Observability First

Before changing code, add ways to see what's happening:

```typescript
// Before changing anything, add logging
console.log('Input:', JSON.stringify(input));
console.log('Config:', JSON.stringify(config));
console.log('Result:', JSON.stringify(result));

// Now you can see what's actually happening
// Make changes based on evidence, not guesses
```

---

## Quick Reference

### Critical Rules

1. **NO DRIVE-BY FIXES**: If you can't explain WHY a change works, don't make it
2. **VERIFY EVERYTHING**: Test assumptions. Read actual code. Check actual behavior
3. **ONE VARIABLE**: Change one thing at a time, verify, then proceed
4. **COMPLETE READS**: Don't skim code. Read entire relevant files
5. **CHASE DEPENDENCIES**: If the issue involves libraries, configs, or external systems, investigate those too
6. **QUESTION PREVIOUS WORK**: Maybe the earlier "fix" was wrong. Re-examine with fresh eyes

### Red Flags - Stop and Reconsider

| Red Flag | What It Means |
|----------|---------------|
| "This should work" | Your mental model is wrong |
| "It works on my machine" | Environment difference is the bug |
| "I'll just try this" | You're guessing, not investigating |
| "It must be X" | You're assuming, not verifying |
| Random changes | You don't understand the problem |

### Output Format

```markdown
## Issue: [Problem Description]

### Evidence
[What you observed - exact errors, behaviors, outputs]

### Investigation
[What you checked, what you found, what you ruled out]

### Root Cause
[The actual underlying problem with evidence]

### Solution
[What you changed and WHY it addresses the root cause]

### Verification
[How you confirmed this works and doesn't break anything else]
```

### Success Criteria

Before marking debugging complete:

- [ ] Do you understand WHY the issue occurred?
- [ ] Have you verified the fix actually works?
- [ ] Have you tested the original reproduction steps?
- [ ] Have you checked for side effects?
- [ ] Can you explain the solution to someone else?
- [ ] Would this fix survive code review?

If you can't answer "yes" to all, keep investigating.

### When to Stop and Restart

Sometimes you need to abandon your current approach:

| Signal | Action |
|--------|--------|
| 30+ minutes without progress | Step back, re-examine assumptions |
| Multiple failed hypotheses | You're missing something fundamental |
| "This makes no sense" | Your mental model is wrong |
| Evidence contradicts itself | Re-gather evidence from scratch |

**Restart protocol:**
1. Document what you've tried
2. Clear your assumptions
3. Re-read the error/behavior with fresh eyes
4. Start from "what do I actually know?"
