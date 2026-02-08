# Audit Agents Implementation Plan

## Objective

Review 135 agents for quality and relevance. Define invocation rules. Wire specialized agents into build.md. Archive redundant agents.

## Context

@planning/specs/audit-agents/SPEC.md
@planning/specs/audit-agents/RESEARCH.md
@skills/my-workflow/ref/gsd/README.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Create agent categorization document | auto | - | - |
| 2 | Categorize all 135 agents by workflow stage | auto | Task 1 | - |
| 3 | Verify categories and identify archive candidates | checkpoint:human-verify | Task 2 | yes |
| 4 | Draft invocation rules document | auto | Task 3 | - |
| 5 | Verify invocation rules | checkpoint:human-verify | Task 4 | yes |
| 5-orch | Research multi-agent orchestration patterns | auto | Task 5 | - |
| 5a | Compare overlapping agents by source and capability | auto | Task 5-orch | - |
| 5b | Update invocation rules with justified selections | auto | Task 5a | - |
| 5c | Decide disposition for untriggered agents | checkpoint:human-verify | Task 5b | yes |
| 6 | Update build.md with specialized agent invocation | auto | Task 5c | - |
| 7 | Add multi-perspective review pattern to build.md | auto | Task 6 | - |
| 8 | Verify build.md integration | checkpoint:human-verify | Task 7 | yes |
| 9 | Archive redundant/outdated agents | auto | Task 8 | - |
| 10 | Final verification | checkpoint:human-verify | Task 9 | yes |

## Tasks

### Task 1: Create agent categorization document

**Type**: auto
**Files**: `planning/specs/audit-agents/AGENTS-CATEGORIZATION.md`
**Dependencies**: None

**Context**: Need a structured document to track agent categorization and audit results.

**Action**:
Create `AGENTS-CATEGORIZATION.md` with:
- Table structure for all 135 agents
- Columns: Agent Name, Category, Workflow Stage, Quality (keep/review/archive), Notes
- Categories: Language, Role, Domain, Infrastructure, Review, Management, Utility
- Workflow stages: Analysis, Planning, Execution, Review, Debugging, Documentation

**Verify**: File exists with correct structure
**Done**: CATEGORIZATION.md created with all 135 agent rows

---

### Task 2: Categorize all 135 agents by workflow stage

**Type**: auto
**Files**: `planning/specs/audit-agents/CATEGORIZATION.md`
**Dependencies**: Task 1

**Context**: Each agent needs category, workflow stage, and initial quality assessment.

**Action**:
For each agent in `agents/`:
1. Read agent file to understand purpose
2. Assign category (Language/Role/Domain/Infrastructure/Review/Management/Utility)
3. Assign workflow stage (Analysis/Planning/Execution/Review/Debugging/Documentation/N/A)
4. Assess quality:
   - **keep**: Clear purpose, well-written, useful
   - **review**: Unclear purpose or redundant with another
   - **archive**: Outdated, broken, or superseded
5. Add notes for review/archive candidates

**Verify**: All 135 rows populated
**Done**: Complete categorization with quality assessments

---

### Task 3: Verify categories and identify archive candidates

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 2

**Context**: Human review needed before proceeding with rules and integration.

**Action**: Present categorization summary:
- Count by category
- Count by workflow stage
- List of agents marked for archive (with reasons)
- List of agents marked for review

**Verify**: Human confirms categorization is reasonable
**Done**: Human approves or provides corrections

---

### Task 4: Draft invocation rules document

**Type**: auto
**Files**: `skills/my-workflow/docs/agent-invocation-rules.md`
**Dependencies**: Task 3

**Context**: Rules should be simple: "If X → use agent Y"

**Action**:
Create `agent-invocation-rules.md` with:

1. **Trigger → Agent mapping table**:
   | Trigger | Agent | Notes |
   |---------|-------|-------|
   | Complex feature planning | planner or architect | Use architect for system design |
   | Task execution | cek-developer or language-specific | Match to task language |
   | Code review needed | code-reviewer | After any code changes |
   | Security check | security-auditor | Before commits |
   | Tests failing | debugger | Investigation mode |
   | Bug investigation | cek-bug-hunter | Root cause analysis |

2. **Stage-based defaults**:
   - Analysis stage: cek-code-explorer, cek-researcher
   - Planning stage: cek-software-architect, cek-tech-lead
   - Execution stage: cek-developer (or language-specific)
   - Review stage: code-reviewer, cek-security-auditor, cek-test-coverage-reviewer
   - Debugging stage: debugger, cek-bug-hunter

3. **Language-specific routing**:
   | Language | Preferred Agent |
   |----------|-----------------|
   | TypeScript | typescript-pro |
   | Python | python-pro |
   | Go | golang-pro |
   | Rust | rust-engineer |
   | Default | cek-developer |

**Verify**: Rules are clear and complete
**Done**: Invocation rules documented

---

### Task 5: Verify invocation rules

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 4

**Context**: Rules will be wired into build.md - need human approval first.

**Action**: Present invocation rules for review:
- Trigger → Agent mappings
- Stage-based defaults
- Language routing logic

**Verify**: Human confirms rules make sense
**Done**: Human approves or provides corrections

---

### Task 5-orch: Research multi-agent orchestration patterns (Added via Gap Protocol)

**Type**: auto
**Files**: `skills/my-workflow/docs/multi-agent-orchestration.md`
**Dependencies**: Task 5

**Context**: Before selecting which agents to use, understand HOW to effectively work with multiple agents. This foundational knowledge should inform agent selection decisions.

**Action**:
Research and document multi-agent orchestration patterns:

1. **Context window management**
   - What to include in subagent prompts (essential context only)
   - What to omit (accumulated conversation, irrelevant history)
   - Fresh context per subagent vs. shared state

2. **Data handoff patterns**
   - Structured outputs (JSON, markdown templates)
   - State files and shared artifacts
   - How to pass results between agents

3. **Goal alignment**
   - Ensuring subagents work toward the main objective
   - Prompt engineering for focused execution
   - Preventing scope creep within subagents

4. **Verification strategies**
   - How to validate subagent outputs before continuing
   - Error detection and recovery
   - Quality gates between agent handoffs

5. **Coordination patterns**
   - Sequential (A → B → C)
   - Parallel (A, B, C simultaneously)
   - Hierarchical (orchestrator + workers)
   - When to use each pattern

6. **Agent granularity**
   - When to use one generalist vs. multiple specialists
   - Cost/benefit of agent switching
   - Context loss at boundaries

Create `multi-agent-orchestration.md` with practical guidance for each area.

**Verify**: Document covers all 6 areas with actionable patterns
**Done**: Orchestration patterns documented

---

### Task 5a: Compare overlapping agents by source and capability (Added via Gap Protocol)

**Type**: auto
**Files**: `planning/specs/audit-agents/agent-comparison.md`
**Dependencies**: Task 5

**Context**: Current invocation rules pick agents without comparing alternatives. Need to understand which agents overlap and why one should be preferred over another.

**Action**:
1. Identify agent groups with overlapping capabilities:
   - Developers: developer, cek-developer, fullstack-developer, backend-developer, frontend-developer
   - Reviewers: code-reviewer, code-reviewer-plan, cek-code-quality-reviewer
   - Architects: software-architect, cek-software-architect, architect-reviewer
   - Security: security-auditor, cek-security-auditor, penetration-tester
   - Bug hunters: debugger, cek-bug-hunter, error-detective
2. For each group, document:
   - Source repository (built-in, CEK, GSD, etc.)
   - Key differentiators (scope, tools, approach)
   - Recommended selection with justification
3. Create `agent-comparison.md` with findings

**Verify**: All overlapping groups identified and compared
**Done**: Comparison document created with recommendations

---

### Task 5b: Update invocation rules with justified selections (Added via Gap Protocol)

**Type**: auto
**Files**: `skills/my-workflow/docs/agent-invocation-rules.md`
**Dependencies**: Task 5a

**Context**: Update invocation rules based on comparison findings.

**Action**:
1. Review agent-comparison.md recommendations
2. Update agent-invocation-rules.md to:
   - Use recommended agents from comparison
   - Add brief justification for each selection (e.g., "cek-developer preferred: broader tool access")
   - Note alternatives when context-dependent

**Verify**: All trigger mappings have justified selections
**Done**: Invocation rules updated with rationale

---

### Task 5c: Decide disposition for untriggered agents (Added via Gap Protocol)

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 5b

**Context**: ~100 agents aren't covered by invocation rules. Need to decide what to do with them.

**Action**:
Present options for untriggered agents:

1. **Domain routing**: Add domain-specific triggers (e.g., "fintech codebase → fintech-engineer")
2. **Implicit discovery**: Accept that domain agents are invoked when context makes them relevant
3. **Archive candidates**: Mark rarely-useful agents for archive
4. **Hybrid**: Combine approaches (domain routing for common domains, implicit for niche)

For each untriggered agent category, recommend disposition:
- Domain specialists (fintech, game, etc.)
- Platform specialists (wordpress, home-assistant)
- Specialized roles (legal, customer-success)

**Verify**: Human approves disposition strategy
**Done**: Clear policy for untriggered agents

---

### Task 6: Update build.md with specialized agent invocation

**Type**: auto
**Files**: `skills/my-workflow/workflows/build.md`
**Dependencies**: Task 5c

**Context**: Replace generic "developer" with invocation rules.

**Action**:
1. Find Step 5 (task execution) in build.md
2. Replace generic "developer" subagent with:
   - Read task from PLAN.md
   - Determine appropriate agent based on invocation rules
   - If task specifies language → use language-specific agent
   - Otherwise → use cek-developer
3. Add reference to `@skills/my-workflow/docs/agent-invocation-rules.md`

**Deviation**: Fallback changed from cek-developer to fullstack-developer per v2 comparison evidence (fullstack-developer scored 22 vs cek-developer's 19 on domain-focused criteria).

**Verify**: build.md references invocation rules
**Done**: Step 5 uses specialized agents based on rules

---

### Task 7: Add multi-perspective review pattern to build.md

**Type**: auto
**Files**: `skills/my-workflow/workflows/build.md`
**Dependencies**: Task 6

**Context**: Adopt Everything Claude's multi-perspective review pattern.

**Action**:
1. Find Step 9 (quality review) in build.md
2. Update to use these parallel reviewers:
   - code-reviewer (technical soundness)
   - cek-security-auditor (security vulnerabilities)
   - cek-contracts-reviewer (API/interface consistency)
3. Define review aggregation:
   - Collect findings from all reviewers
   - Categorize by severity (Critical/Important/Minor)
   - Present consolidated summary

**Deviation**: Review agents changed to cek-code-quality-reviewer (binary pass/fail quality gate with numeric score), cek-security-auditor (kept), and architect-reviewer (broader architecture review). CEK agents retained in Step 9 specifically for their structured output format in review gates.

**Verify**: Step 9 uses 3 specialized review agents
**Done**: Multi-perspective review pattern integrated

---

### Task 8: Verify build.md integration

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 7

**Context**: Build workflow changes need human verification before archiving agents.

**Action**: Show build.md changes:
- New Step 5 agent selection logic
- New Step 9 multi-perspective review
- Reference to invocation rules

**Verify**: Human confirms integration is correct
**Done**: Human approves build.md changes

---

### Task 9: Archive redundant/outdated agents

**Type**: auto
**Files**: `agents/*.md`, `archive/agents/*.md`
**Dependencies**: Task 8

**Context**: Move agents marked for archive in Task 3.

**Action**:
1. Create `archive/agents/` if not exists
2. For each agent marked "archive" in CATEGORIZATION.md:
   - Move from `agents/` to `archive/agents/`
   - Add to archive list in CATEGORIZATION.md
3. Update agent count in README or CLAUDE.md if referenced

**Verify**: Archived agents moved, count updated
**Done**: Redundant agents archived

---

### Task 10: Final verification

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 9

**Context**: Final check that everything works together.

**Action**: Present summary:
- Agents categorized: 135
- Agents kept: X
- Agents archived: Y
- Invocation rules documented
- build.md updated with specialized agents
- Multi-perspective review pattern active

**Verify**: Human confirms audit complete
**Done**: Human approves final state

## Verification

- [ ] CATEGORIZATION.md exists with all agents assessed
- [ ] agent-invocation-rules.md exists with clear trigger → agent mappings
- [ ] build.md Step 5 uses invocation rules instead of generic "developer"
- [ ] build.md Step 9 uses multi-perspective review pattern
- [ ] Redundant agents moved to archive/

## Success Criteria

- Invocation rules documented and integrated
- build.md uses specialized agents
- Agent collection reduced to essential, distinct agents
- Multi-perspective review pattern adopted
