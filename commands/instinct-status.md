---
description: Show all instincts with confidence scores
---

Display learned behavioral patterns and their confidence levels.

## Process

1. **Run instinct CLI:**
   ```bash
   ~/.claude/hooks/scripts/instinct-cli.py status
   ```

2. **Parse and display results**

## Output Format

```
# Instinct Status

## Active Instincts (confidence >= 70%)
| Name | Confidence | Source | Updated |
|------|------------|--------|---------|
| direct-communication | 95% | AI Chat Prefs | 2026-01-31 |

## Developing Instincts (30-69%)
| Name | Confidence | Source | Updated |
|------|------------|--------|---------|
| visual-representations | 65% | observation | 2026-01-30 |

## Summary
- Total: X instincts
- Auto-approved (≥70%): Y
- In development: Z
```

## No Instincts

If no instincts found:

```
# Instinct Status

No instincts found.

To get started:
- Run /instinct-bootstrap to generate from AI Chat Prefs
- Run /instinct-import <file> to import from file
```

## Quick Commands

After showing status, suggest relevant commands:
- If no instincts: "Run `/instinct-bootstrap` to initialize"
- If low confidence: "Continue using Claude to build confidence"
- If many high-confidence: "Run `/evolve` to analyze patterns"
