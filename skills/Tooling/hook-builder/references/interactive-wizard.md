# Interactive Hook Creation Wizard

When a user wants to create a new hook, guide them through these questions:

## Step 1: Gather Requirements

Ask the user:

```
Let me help you create a Claude Code hook! I need some details:

1. **What should this hook do?**
   Examples:
   - Auto-format code after editing files
   - Validate bash commands before execution
   - Add context when user submits prompts
   - Prevent access to sensitive files
   - Run tests after file changes

2. **When should it trigger?**
   - PreToolUse (before tool execution)
   - PostToolUse (after tool execution)
   - UserPromptSubmit (when user sends message)
   - Stop (when Claude finishes responding)
   - SessionStart (when session begins)

3. **Which tools should it match?**
   - Specific tool (Write, Edit, Bash, Read, etc.)
   - Multiple tools (Write|Edit)
   - All tools (*)
   - MCP tools (mcp__server__tool)

4. **What should it return?**
   - Simple exit code (0 = success, 2 = block)
   - JSON with decision control
   - Additional context for Claude

5. **Scope:**
   - User-level (`~/.claude/settings.json`)
   - Project-level (`.claude/settings.json`)
```

## Step 2: Determine Hook Type

Based on requirements, recommend:

**Bash Command Hook** when:
- Simple validation (check file exists)
- Fast, deterministic operations
- Formatting, linting
- Desktop notifications

**Prompt-based Hook** when:
- Complex decision logic needed
- Context-aware checks
- Natural language validation
- Reasoning required (Stop hooks)

## Step 3: Generate Hook Script

### Bash Template
```bash
#!/usr/bin/env bash

# Read JSON input from stdin
INPUT=$(cat)

# Parse JSON (requires jq)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Your validation logic here
if [[ condition ]]; then
  echo "Error message" >&2
  exit 2  # Block operation
fi

# Success
exit 0
```

### Python Template
```python
#!/usr/bin/env python3
import json
import sys

# Read JSON input
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})

# Your logic here
if condition:
    # Block with error
    print("Error message", file=sys.stderr)
    sys.exit(2)

# Or return JSON for control
output = {
    "decision": "approve",
    "reason": "Auto-approved"
}
print(json.dumps(output))
sys.exit(0)
```

## Step 4: Generate Configuration

Show complete settings.json configuration:

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/script.sh",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

## Step 5: Test Instructions

Provide testing steps:

1. **Test script directly:**
```bash
echo '{"tool_name": "Write", "tool_input": {"file_path": "test.txt"}}' | .claude/hooks/your-hook.sh
echo $?  # Check exit code
```

2. **Test in Claude Code:**
```
- Add hook to settings.json
- Restart Claude Code
- Run /hooks to verify loaded
- Trigger the hook
- Check verbose mode (Ctrl+O)
```

3. **Debug mode:**
```bash
claude --debug
```

## Exit Code Reference

| Code | Meaning | Behavior |
|------|---------|----------|
| 0 | Success | stdout shown in verbose mode, JSON parsed if present |
| 2 | Block | stderr shown to Claude, operation blocked |
| Other | Warning | stderr shown in verbose mode, continues |
