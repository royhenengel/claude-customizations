# Create Hook

Analyze project, suggest hooks, create with proper testing.

## Overview

1. Analyze environment - Detect tooling and existing hooks
2. Suggest hooks - Based on project configuration
3. Configure hook - Ask targeted questions, create script
4. Test and validate - Ensure hook works correctly

## Automatic Suggestions

**TypeScript detected** (`tsconfig.json`):
- PostToolUse: Type-check files after editing
- PreToolUse: Block edits with type errors

**Prettier detected** (`.prettierrc`):
- PostToolUse: Auto-format after editing
- PreToolUse: Require formatted code

**ESLint detected** (`.eslintrc.*`):
- PostToolUse: Lint and auto-fix after editing
- PreToolUse: Block commits with lint errors

**package.json scripts**:
- `test` script → Run tests before commits
- `build` script → Validate build before commits

**Git repository**:
- PreToolUse/Bash: Prevent commits with secrets
- PostToolUse: Security scan on changes

## Configuration Questions

Only ask about details you're unsure about:

1. **Trigger timing**:
   - `PreToolUse`: Before operations (can block)
   - `PostToolUse`: After operations (feedback/fixes)
   - `UserPromptSubmit`: Before processing requests

2. **Tool matcher**: Write, Edit, Bash, * etc.

3. **Scope**: global, project, or project-local

4. **Response approach**:
   - Exit codes: Simple pass/fail
   - JSON response: Advanced control

5. **Blocking behavior**: Stop operations on issues?

6. **Claude integration**: Should Claude see and fix issues?
   - YES: Use `additionalContext`
   - NO: Use `suppressOutput: true`

7. **Context pollution**: Silent on success?

8. **File filtering**: What file types to process?

## Hook Creation

- Create hooks directory: `~/.claude/hooks/` or `.claude/hooks/`
- Generate script with proper shebang and permissions
- Update settings.json
- Use absolute paths (or `$CLAUDE_PROJECT_DIR`)
- Offer validation

**Key Standards**:
- Read JSON from stdin (not argv)
- Use top-level `additionalContext`/`systemMessage` for Claude
- Include `suppressOutput: true` for success
- Provide specific error counts
- Focus on changed files

## Testing

**Happy Path**: Create conditions where hook should pass

**Sad Path**: Create conditions where hook should fail

**Verification**:
- Check hook registration
- Verify script permissions (`chmod +x`)
- Test simplified version first

## Templates

### Type Checking (PostToolUse)
```javascript
#!/usr/bin/env node
// Read stdin JSON, check .ts/.tsx files only
// Run: npx tsc --noEmit --pretty
// Output: JSON with additionalContext for errors
```

### Auto-formatting (PostToolUse)
```javascript
#!/usr/bin/env node
// Read stdin JSON, check supported file types
// Run: npx prettier --write [file]
// Output: JSON with suppressOutput: true
```

### Security Scanning (PreToolUse)
```bash
#!/bin/bash
# Read stdin JSON, check for secrets/keys
# Block if dangerous patterns found
# Exit 2 to block, 0 to continue
```

## Quick Reference

**Common Patterns**:
- stdin input: `JSON.parse(process.stdin.read())`
- File filtering: Check extensions before processing
- Success: `{continue: true, suppressOutput: true}`
- Error: `{continue: true, additionalContext: "error details"}`
- Block: `exit(2)` in PreToolUse

**By Use Case**:
- Code Quality: PostToolUse for feedback
- Security: PreToolUse to block
- CI/CD: PreToolUse to validate
- Development: PostToolUse for improvements

**Notes**:
- Hooks run in parallel
- Design for independence
- Plan interactions carefully

## Success Criteria

Hook created successfully when:
- Script has executable permissions
- Registered in correct settings.json
- Responds correctly to test scenarios
- Integrates properly with Claude
- Follows project conventions
