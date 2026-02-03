# Audit Agents Research

## Information Gathered

### Current Agent Inventory

**Total**: 135 agents in `agents/` directory

**Breakdown by prefix**:
- Generic (no prefix): 122 agents
- cek-*: 11 agents (from Context Engineering Kit)
- gsd-*: 0 agents (GSD patterns not yet ported)

**Sample categories observed**:
- Language specialists: python-pro, typescript-pro, javascript-pro, golang-pro, rust-engineer, etc.
- Role specialists: backend-developer, frontend-developer, fullstack-developer
- Domain specialists: security-auditor, compliance-auditor, penetration-tester
- Infrastructure: kubernetes-specialist, cloud-architect, platform-engineer
- Review/Quality: code-reviewer, code-reviewer-plan, qa-expert
- Management: project-manager, product-manager, scrum-master

### Reference Patterns Analyzed

#### GSD (Get Shit Done) - 11 Agents

| Agent | Purpose | Workflow Stage |
|-------|---------|----------------|
| gsd-project-researcher | Initial project research | Planning |
| gsd-phase-researcher | Phase-specific research | Planning |
| gsd-research-synthesizer | Synthesize findings | Planning |
| gsd-planner | Create execution plans | Planning |
| gsd-plan-checker | Verify plan quality | Planning |
| gsd-executor | Execute tasks | Execution |
| gsd-verifier | Verify completed work | Review |
| gsd-debugger | Debug issues | Execution |
| gsd-integration-checker | Check integrations | Review |
| gsd-codebase-mapper | Map existing codebases | Analysis |
| gsd-roadmapper | Manage roadmap | Planning |

**Key insight**: Clear stage mapping. Each agent has one job.

#### Everything Claude - 9 Agents

| Agent | Purpose | Invocation Rule |
|-------|---------|-----------------|
| planner | Implementation planning | Complex features |
| architect | System design | Architecture questions |
| tdd-guide | Test-driven development | Bug fixes, new features |
| code-reviewer | Code review | Code modifications |
| security-reviewer | Security analysis | Before commits |
| build-error-resolver | Build failures | Build errors |
| e2e-runner | End-to-end testing | Critical user flows |
| refactor-cleaner | Dead code cleanup | Maintenance |
| doc-updater | Documentation | Doc changes |

**Key insight**: Explicit invocation rules. "If X happens → use agent Y"

#### CEK - 13 Agents (from cek-* prefix)

| Agent | Purpose |
|-------|---------|
| cek-developer | Implementation |
| cek-software-architect | Architecture |
| cek-tech-lead | Technical leadership |
| cek-code-explorer | Codebase exploration |
| cek-researcher | Research |
| cek-bug-hunter | Bug finding |
| cek-code-quality-reviewer | Quality review |
| cek-contracts-reviewer | API/contract review |
| cek-security-auditor | Security review |
| cek-historical-context-reviewer | Historical analysis |
| cek-test-coverage-reviewer | Test coverage |
| cek-tech-writer | Documentation |
| cek-business-analyst | Requirements |

**Key insight**: Role-based with multi-perspective review pattern.

### Current build.md Integration

Build workflow Step 5 uses generic "developer" subagent:
```
Task tool (developer subagent):
  "Implement Task N from PLAN.md"
```

Step 9 has 3 parallel review agents but they're not from the agents/ directory - they're inline prompts.

### Multi-Perspective Review Pattern

Everything Claude defines 5 reviewer perspectives:
1. **Factual reviewer** - Checks accuracy of claims/data
2. **Senior engineer** - Evaluates technical soundness
3. **Security expert** - Identifies vulnerabilities
4. **Consistency reviewer** - Checks for contradictions
5. **Redundancy checker** - Identifies duplicate logic

Pattern: All reviewers analyze same artifact in parallel, findings consolidated.

## Approach

**Phased approach:**

1. **Phase 1: Categorize** - Map all 135 agents to workflow stages
2. **Phase 2: Rules** - Define invocation rules for key stages
3. **Phase 3: Integrate** - Wire agents into build.md
4. **Phase 4: Archive** - Move redundant/unused agents

**Why this order**: Must understand what exists before defining rules. Must have rules before integration. Archive last to avoid breaking anything.

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A: Audit then integrate | Thorough, minimal risk | Slower | SELECTED |
| B: Integrate first, audit later | Faster immediate benefit | May integrate wrong agents | Rejected |
| C: Start fresh (new agent set) | Clean slate | Loses existing work, high effort | Rejected |

## Agent Stage Mapping (Proposed)

| Workflow Stage | Agent Categories |
|----------------|------------------|
| Analysis | researcher, code-explorer, codebase-mapper |
| Planning | planner, architect, tech-lead |
| Execution | developer (language-specific), executor |
| Review | code-reviewer, security-auditor, test-coverage-reviewer |
| Debugging | debugger, bug-hunter, error-detective |
| Documentation | tech-writer, doc-updater |

## Invocation Rules (Proposed)

| Trigger | Agent |
|---------|-------|
| Complex feature start | planner |
| Architecture decision needed | architect |
| Task execution | developer (or language-specific) |
| Code modification done | code-reviewer |
| Before commit | security-auditor |
| Tests failing | debugger |
| Bug investigation | bug-hunter |

## Dependencies

- None external
- Internal: must complete Phase 1 before Phase 2

## Open Questions

(None - approach is clear)
