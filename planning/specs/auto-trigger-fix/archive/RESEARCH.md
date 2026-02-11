# Auto-Trigger /fix Research

## Information Gathered

### Codebase Analysis

- Existing hooks infrastructure in `.claude/hooks.json`
- /fix skill already exists in `commands/fix.md`
- STATE.md tracks current stage (can detect if building)
- Hook types available: UserPromptSubmit, PostToolUse, and others

### External Research

- Claude Code hooks support `prompt` type for injecting context
- Hooks can return structured responses to influence Claude's behavior
- Pattern matching can be done in JavaScript for flexibility

## Approach

Combined hook strategy using two complementary hooks:

1. **UserPromptSubmit hook**: Analyzes incoming user messages for issue-related patterns
2. **PostToolUse hook**: Fires after tool failures to detect error patterns

Both hooks share detection logic and prompt for confirmation before invoking /fix.

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A: UserPromptSubmit + PostToolUse hooks | Full coverage (user messages + errors), native mechanism | Two hooks to maintain | SELECTED |
| B: Skill auto-activation | Fits existing skill infrastructure | Less control over timing, activates after parsing | Rejected: less precise control |
| C: PostToolUse only | Simple, catches errors | Misses user-described issues | Rejected: incomplete coverage |

## Detection Patterns

### Trigger Patterns (User Messages)

| Category | Patterns |
|----------|----------|
| Error keywords | error, bug, broken, failing, crash, exception |
| Problem phrases | doesn't work, not working, stopped working, can't get it to |
| Fix requests | fix this, debug this, what's wrong with, why is this |
| Symptoms | returns null, throws, undefined, 500, timeout |

### Exclusion Patterns

| Category | Patterns |
|----------|----------|
| Conceptual | "what is a bug", "how do errors work", "explain" |
| Future tense | "might break", "could cause", "potential issue" |
| Questions about | "what causes", "why do bugs happen" |

### Tool Error Patterns

| Category | Patterns |
|----------|----------|
| Exit codes | Non-zero exit from Bash |
| Stack traces | "at line", "Traceback", "Error:" prefix |
| Build failures | "FAILED", "error:", compilation errors |

## Dependencies

- Existing /fix skill (no changes needed)
- Claude Code hooks infrastructure

## Future Improvements

- Confidence threshold for auto-running /fix without confirmation
- Pattern refinement based on false positive feedback
