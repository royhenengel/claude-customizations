---
description: Import instincts from file or URL
argument: "<source>"
---

Import instincts from an exported file or URL.

## Arguments

- `source` (required): Path to YAML file or URL

## Process

1. **Validate source:**
   - Check if file exists (for local paths)
   - Validate URL format (for URLs)

2. **Run instinct CLI:**
   ```bash
   ~/.claude/hooks/scripts/instinct-cli.py import <source>
   ```

3. **Report results**

## Output Format

```
# Instinct Import

Imported X instincts from: ./instincts-export.yaml

Added:
- direct-communication (95%) - new
- visual-representations (85%) - new

Updated:
- why-not-just-how: 85% -> 90%

Skipped (lower confidence):
- brevity-first: existing 90% > imported 80%

Run /instinct-status to see all instincts.
```

## Merge Behavior

- New instincts: Added directly
- Existing instincts: Keep higher confidence value
- Conflicting sources: Prefer more recent

## Errors

If source not found:
```
Error: Source not found: ./missing.yaml

Check the path and try again.
```
