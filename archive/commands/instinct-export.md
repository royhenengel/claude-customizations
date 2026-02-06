---
description: Export instincts to file
argument: "[path]"
---

Export learned instincts to a file for backup or sharing.

## Arguments

- `path` (optional): Output file path. Defaults to `./instincts-export.yaml`

## Process

1. **Determine output path:**
   - Use provided argument or default to `./instincts-export.yaml`

2. **Run instinct CLI:**
   ```bash
   ~/.claude/hooks/scripts/instinct-cli.py export [path]
   ```

3. **Confirm export**

## Output Format

```
# Instinct Export

Exported X instincts to: ./instincts-export.yaml

Contents:
- direct-communication (95%)
- visual-representations (85%)
- why-not-just-how (90%)
...

Use `/instinct-import ./instincts-export.yaml` to restore.
```

## No Instincts

If no instincts to export:

```
# Instinct Export

No instincts to export.

To get started:
- Run /instinct-bootstrap to generate from AI Chat Prefs
```
