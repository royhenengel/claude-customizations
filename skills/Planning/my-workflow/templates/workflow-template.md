# Workflow: /{command-name}

## Purpose

{What this workflow accomplishes and why it exists.}

## When to Use

- {Trigger condition 1}
- {Trigger condition 2}
- {Trigger condition 3}

## Entry Point

User invokes `/{command-name}` or {alternative trigger description}.

## Steps

### 1. Check Prerequisites

```bash
# Verify required state exists
ls planning/STATE.md 2>/dev/null || echo "No STATE.md - run /start first"
```

{Describe what must exist before this workflow runs.}

### 2. Gather Information

{What input is needed from user or codebase.}

```
{Example prompt to user if applicable}
```

### 3. Main Action

{Core logic of the workflow.}

### 4. Update STATE.md

```markdown
**Stage**: {appropriate-stage}
**Last Updated**: {timestamp}

## Current Focus

{Description of current focus}

## Progress

- [x] {Completed item}
- [ ] {Next item}
```

### 5. Completion Message

```
{Command name} complete!

Created:
- {file1}
- {file2}

Next steps:
- {suggestion 1}
- {suggestion 2}
```

## Output Structure

```
planning/
├── {files created or modified}
```

## Integration Flow

```
/{command-name} invoked
    |
    v
Check prerequisites
    |
    v
{Main workflow steps}
    |
    v
Update STATE.md
    |
    v
"What's next?"
```

## Error Handling

**{Error condition 1}:**
{How to handle it}

**{Error condition 2}:**
{How to handle it}
