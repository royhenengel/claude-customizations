# Multi-Agent Orchestration Patterns

Practical guidance for effectively working with multiple agents in Claude Code's Task tool environment. These patterns enable successful multi-agent workflows while managing context, data flow, and coordination.

## 1. Context Window Management

The most critical factor in multi-agent success. "Most agent failures are not model failures, they are context failures."

### What to Include in Subagent Prompts

**Essential context only:**
- Current task objective (specific and focused)
- Files to modify or analyze (explicit paths)
- Verification criteria ("done when")
- Relevant constraints from SPEC.md or PLAN.md
- Key decisions made earlier that affect this task

**Example from build.md pattern:**
```markdown
Execute Task {N} from the plan:

Objective: {task objective}
Files: {files to modify}
Action: {what to do}
Verify: {verification steps}
Done when: {completion criteria}

Context:
{Paste relevant context from PLAN.md @references}
```

### What to Omit

- Accumulated conversation history from main thread
- Results from unrelated previous tasks
- Exploration that didn't lead to solutions
- Verbose debugging traces (store in scratchpads instead)
- Information not needed for the next 3 steps

### Fresh Context Per Subagent

Each subagent invocation starts with a fresh 200k context window:

```
Main conversation (orchestration)
    |
    +-- Task 1 --> [developer subagent] --> result
    |                   (fresh 200k context)
    |
    +-- Task 2 --> [developer subagent] --> result
    |                   (fresh 200k context)
```

**Benefits:**
- Each task has full context capacity
- No degradation from accumulated work
- Clean verification per task
- Prevents "context pollution" where irrelevant history buries important info

### Context Compression Strategies

**When context is approaching limits:**

1. **Summarization**: Move detailed information to files, keep summaries in context
2. **Structured summaries** with categories vs. long paragraphs
3. **Scratchpads**: Record intermediate results outside LLM context

---

## 2. Data Handoff Patterns

Clean handoffs between agents prevent information loss and ensure target agents have sufficient context.

### Structured Outputs

**JSON for machine-readable handoffs:**
```json
{
  "vulnerabilities": [
    {
      "severity": "Critical",
      "location": "auth.ts:127",
      "type": "SQL injection",
      "fix": "Use parameterized query"
    }
  ],
  "summary": "1 critical vulnerability found"
}
```

**Markdown templates for human-readable handoffs:**
```markdown
## Security Review Results

**Status**: Complete
**Files Reviewed**: auth.ts, db.ts, api.ts
**Issues Found**: 3 (2 High, 1 Medium)
```

### State Files and Shared Artifacts

**STATE.md pattern** (from build.md workflow):
- PLAN.md stays static (the prompt)
- STATE.md tracks completion and progress
- Shared artifacts persist between sessions

### Format Selection by Scenario

| Scenario | Best Format |
|----------|-------------|
| Machine processing | JSON with schema |
| Human review | Markdown with sections |
| State persistence | STATE.md file |
| Complex handoff | Structured markdown + file references |
| Simple status | Inline text summary |

---

## 3. Goal Alignment

Ensuring subagents work toward the main objective without scope creep.

### Prompt Engineering for Focused Execution

**Be specific, not generic:**
```markdown
# Bad
You are a helpful coding assistant.

# Good
You are a React performance optimizer. Analyze components for:
- Hooks best practices
- Unnecessary re-renders
- Memoization opportunities

Focus ONLY on performance. Ignore styling or formatting issues.
```

### Preventing Scope Creep

**Define boundaries explicitly:**
```markdown
In scope:
- Fix the authentication bug in auth.ts
- Update related tests

Out of scope (log to BACKLOG.md if discovered):
- Refactoring unrelated code
- Adding new features
- Performance optimizations
```

**Use deviation rules** (from build.md):

| Rule | Trigger | Action |
|------|---------|--------|
| Auto-fix bugs | Code logic error | Fix immediately, note in STATE.md |
| Auto-fix blockers | Environment issue | Fix immediately, note in STATE.md |
| Ask architectural | Major structural change | STOP. Ask user for decision. |
| Log enhancements | Nice-to-have idea | Append to BACKLOG.md, continue |

### Clear "Done When" Criteria

Every task should have explicit completion criteria:

```markdown
Done when:
- [ ] Authentication endpoint returns 200 for valid credentials
- [ ] Returns 401 for invalid credentials
- [ ] All existing tests still pass
```

**Success criteria should be verifiable** - not "code is good" but "all tests pass."

---

## 4. Verification Strategies

How to validate subagent outputs before continuing.

### Output Validation Before Use

- Verify structure (JSON valid, required fields present)
- Check content matches expected format
- Ensure output satisfies "done when" criteria

### Quality Gates Between Handoffs

**From build.md parallel review pattern:**

Launch 3 parallel review agents after implementation:
1. **Code Quality Agent**: Simplicity, DRY, size limits
2. **Correctness Agent**: Bugs, edge cases, test coverage
3. **Architecture Agent**: Clean architecture alignment, naming

**After reviews complete:**
1. Consolidate findings by severity (Critical, Important, Minor)
2. Present findings to user
3. Ask: "Fix now, fix later (BACKLOG.md), or proceed as-is?"

### Error Detection and Recovery

1. **Graceful degradation**: Produce useful partial results even when ideal path fails
2. **Autonomous retry**: For transient failures (max 3 attempts)
3. **Escalation**: Know when to stop and ask for human help

### When Human Verification is Needed

**Rule 4 from build.md** (MUST STOP):
- Technology changes (switching data storage, frameworks)
- Scope violations (contradicts OVERVIEW.md, out of scope)
- Architecture changes (fundamental structure changes)
- Any change where impact is uncertain

---

## 5. Coordination Patterns

When and how to use different coordination approaches.

### Sequential Pattern (A -> B -> C)

**When to use:**
- Tasks have dependencies (output of A needed by B)
- Order matters (validation before processing)
- Pipeline transformations

**Benefits**: Clear dependencies, each stage builds on previous.
**Drawbacks**: Slower (sequential latency), one failure blocks pipeline.

### Parallel Pattern (A, B, C simultaneously)

**When to use:**
- Tasks are independent (no shared state)
- Same input analyzed differently (security + performance + quality)
- Processing multiple independent items

**Time savings**: max(agent_times) vs sum(agent_times)

**Benefits**: Massive speed improvement, efficient resource use.
**Drawbacks**: Synchronization complexity, handling partial failures.

### Hierarchical Pattern (Orchestrator + Workers)

**When to use:**
- Large, complex problems requiring decomposition
- Tasks need oversight and quality control
- Natural hierarchy (system design -> component -> implementation)

**Model selection guidance:**
- Orchestrator: Sonnet 4.5 (reasoning, coordination)
- Workers: Haiku 4.5 (fast execution, cost-efficient)

**Benefits**: Handles complexity through decomposition, clear responsibilities.
**Drawbacks**: Coordination overhead, risk of level misalignment.

### Hybrid Patterns

Combine patterns as needed:
- Sequential then parallel (dependencies, then independent analysis)
- Coordinator with dynamic routing (analyze and route to specialists)

---

## 6. Agent Granularity

Guidelines for when to use one generalist vs. multiple specialists.

### Decision Framework

```
Is task decomposable into independent subtasks?
├─ Yes: Consider multiple specialists (parallel)
└─ No: ↓

Do subtasks require different expertise?
├─ Yes: Consider specialists for each
└─ No: ↓

Is task large/complex requiring decomposition?
├─ Yes: Hierarchical pattern
└─ No: Single generalist agent
```

### One Generalist vs. Multiple Specialists

**Use single generalist when:**
- Task is straightforward (< 3 steps)
- Skills overlap significantly
- Context sharing is critical
- Coordination overhead would exceed benefits

**Use multiple specialists when:**
- Tasks genuinely independent
- Different expertise domains (security vs. performance)
- Parallel execution provides meaningful speed gain
- Clean handoff boundaries exist

### Cost/Benefit of Agent Switching

**Overhead costs:**
- Context loss at boundaries (mitigate with structured handoffs)
- Coordination complexity
- Token cost for multiple invocations

**Benefits:**
- Fresh context for each task (no degradation)
- Specialized prompts improve quality
- Parallel execution speeds up independent work
- Clear responsibility boundaries

### Anti-pattern: Over-orchestration

```markdown
# Bad: Three agents for simple task
Review 10 lines of code:
- syntax-checker → security-checker → style-checker

# Good: Single capable agent
code-reviewer: Review 10 lines for syntax, security, and style
```

**Right granularity principle:**
- Not too broad: "general-purpose-helper" defeats specialization
- Not too narrow: "sql-injection-in-nodejs-express-only" too specific
- Right: "security-reviewer for web application vulnerabilities"

---

## Quick Reference

### Subagent Prompt Template

```markdown
Execute Task {N}:

Objective: {specific, focused goal}
Files: {explicit file paths}
Action: {what to do}
Verify: {verification steps}
Done when: {completion criteria}

Context:
{Only relevant information from PLAN.md}

Constraints:
- {What NOT to do}
- {Boundaries}
- {Deviation rules}
```

### Coordination Pattern Selection

| Situation | Pattern |
|-----------|---------|
| Tasks have dependencies | Sequential |
| Tasks are independent | Parallel |
| Complex task needs breakdown | Hierarchical |
| Dynamic workflow needed | Coordinator |
| Simple, single task | No multi-agent needed |

### Context Health Monitoring

| Context Level | Action |
|---------------|--------|
| 50% | Note context is growing |
| 25% remaining | Mention context getting full |
| 15% remaining | Pause, confirm whether to continue |
| 10% remaining | Complete current task, end session |

### Error Handling Hierarchy

1. **Auto-fix**: Bugs, blockers, critical issues
2. **Log and continue**: Enhancements, nice-to-haves
3. **Stop and ask**: Architectural changes, scope violations
4. **Escalate**: After 2-3 failed attempts

---

## References

- `skills/my-workflow/workflows/build.md` - Build workflow with subagent execution
- `skills/subagent-design/` - Detailed orchestration patterns and guidance
- `agents/multi-agent-coordinator.md` - Coordination agent definition
