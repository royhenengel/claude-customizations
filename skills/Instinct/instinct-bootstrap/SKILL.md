---
name: instinct-bootstrap
description: Bootstrap initial instincts from AI Chat Prefs
---

Generate initial high-confidence instincts from documented AI Chat Prefs.

## Process

1. **Run instinct CLI:**
   ```bash
   ~/.claude/hooks/scripts/instinct-cli.py bootstrap
   ```

2. **Display generated instincts**

## Output Format

```
# Instinct Bootstrap

Generated instincts from AI Chat Prefs:

## Communication (4 instincts)
| Name | Confidence | Description |
|------|------------|-------------|
| direct-communication | 95% | Prefer direct statements over hedging |
| brevity-first | 90% | Short sentences, information-dense |
| active-voice-only | 90% | Never use passive voice |
| no-em-dashes | 85% | Use commas or parentheses instead |

## Reasoning (3 instincts)
| Name | Confidence | Description |
|------|------------|-------------|
| why-not-just-how | 95% | Always explain rationale, not just steps |
| surface-assumptions | 90% | Make implicit assumptions explicit |
| diagnose-before-fix | 88% | Root cause analysis before solutions |

## Visual (2 instincts)
| Name | Confidence | Description |
|------|------------|-------------|
| visual-representations | 85% | Prefer diagrams and structured visuals |
| tables-for-comparisons | 85% | Always use tables when comparing |

## Summary
- Total generated: 10 instincts
- Average confidence: 89%
- Source: AI Chat Prefs (Notion)

Run /instinct-status to see all instincts.
```

## Already Bootstrapped

If instincts already exist:

```
# Instinct Bootstrap

Existing instincts found. Bootstrap will merge with existing.

Options:
1. Continue (merge, keep higher confidence)
2. Cancel

Proceeding with merge...
```

## Source

Instincts are derived from documented preferences in AI Chat Prefs (Notion):
- Section 2: User Profile
- Section 4: Global Tone and Style
- Section 5: Response Structure Rules
- Section 6: Language Rules
- Section 7: Reasoning and Thinking Protocol
