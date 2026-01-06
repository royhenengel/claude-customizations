# Workflow: Install Auto-Update Hook

## When to Use

Installing the PostToolUse hook that prompts for requirement updates after code changes.

## Steps

### 1. Check Existing Hooks

```bash
cat .claude/hooks.json 2>/dev/null || echo "No hooks configured"
```

### 2. Explain What the Hook Does

```
The auto-update hook:
1. Fires after you Write or Edit code files
2. Analyzes what changed
3. Suggests which features/*/CLAUDE.md files may need updates
4. You decide whether to update

It SUGGESTS updates, it doesn't auto-edit your docs.

Install location options:
1. Project-level (.claude/hooks.json) - This project only [Recommended]
2. User-level (~/.claude/hooks.json) - All projects
```

### 3. Create/Update hooks.json

**If no existing hooks.json:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "A code file was modified. Determine if any features/*/CLAUDE.md requirement files need updating.\n\nChange details:\n$ARGUMENTS\n\nAnalysis rules:\n1. SKIP if the changed file is inside features/ (avoid infinite loops)\n2. Map the file path to likely feature (src/auth/* -> features/authentication/)\n3. Check if the change completes a documented requirement\n4. Check if Implementation Notes need new file paths or patterns\n\nRespond with JSON:\n{\n  \"updates_needed\": true|false,\n  \"reason\": \"brief explanation\",\n  \"files_to_review\": [\"features/X/CLAUDE.md\"],\n  \"suggested_changes\": [\"mark requirement X complete\", \"add file to Implementation Notes\"],\n  \"systemMessage\": \"One-line summary for user\"\n}",
            "timeout": 30000
          }
        ]
      }
    ]
  }
}
```

**If hooks.json exists, merge the PostToolUse entry.**

### 4. Write Configuration

For project-level:
```bash
mkdir -p .claude
# Write hooks.json
```

For user-level:
```bash
# Merge into ~/.claude/hooks.json
```

### 5. Verify Installation

```
Hook installed at: .claude/hooks.json

How it works:
1. You edit a code file (Write/Edit tool)
2. Hook analyzes the change
3. You see: "Requirements update suggested: features/auth/CLAUDE.md"
4. Claude proposes specific updates
5. You approve or skip

To disable temporarily:
- Rename .claude/hooks.json to .claude/hooks.json.disabled

To uninstall:
- Delete the PostToolUse entry (or entire file if only entry)
```

## Hook Configuration Reference

### Matcher

`"Write|Edit"` - Triggers on file writes and edits only.

Does NOT trigger on:
- Read operations
- Bash commands
- Other tools

### Timeout

`30000` (30 seconds) - Allows time for LLM analysis.

Increase if you see timeout errors on complex changes.

### Loop Prevention

The prompt includes: "SKIP if the changed file is inside features/"

This prevents infinite loops when updating requirement files themselves.

## Customization

### Stricter Matching

Only trigger for src/ files:
```json
"matcher": "Write|Edit"
```
Then add to prompt: "Only analyze if file path starts with src/"

### Different Feature Mapping

If your code isn't in src/:
```
Map file paths:
- lib/auth/* -> features/authentication/
- app/billing/* -> features/billing/
```

### Quieter Mode

Add to prompt: "Only suggest updates for significant changes (new files, major edits). Skip for minor fixes."
