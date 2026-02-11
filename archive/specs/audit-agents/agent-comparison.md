# Agent Comparison Analysis

This document compares agents with overlapping capabilities to justify selection decisions for orchestration workflows.

## Key Orchestration Insights Applied

Based on multi-agent orchestration patterns:
- **Fresh context per subagent**: Agent selection should prioritize focused specialists over generalists
- **Structured outputs**: Agents with clear output formats are easier to orchestrate
- **Handoff patterns**: Agents should have predictable behavior with explicit deliverables
- **Single responsibility**: Each agent should excel at one thing rather than being adequate at many

---

## 1. Developer Agents

### Comparison Table

| Agent | Source | Key Differentiator | Orchestration Fit | Recommendation |
|-------|--------|-------------------|-------------------|----------------|
| **cek-developer** | CEK (Context Engineering Kit) | AC-driven implementation with Story Context XML, TDD workflow, explicit pre/post checklists | Excellent - structured output (AC verification), clear completion criteria, tasks.md integration | **PRIMARY** for task execution |
| **fullstack-developer** | Generic collection | End-to-end feature ownership across all stack layers, comprehensive but broad | Moderate - good for scoping but too broad for focused subagent work | Use for **feature scoping**, not implementation |
| **backend-developer** | Generic collection | Server-side focus (Node.js, Python, Go), API/database specialization | Good - clear domain boundary, predictable deliverables | Use for **backend-only tasks** |
| **frontend-developer** | Generic collection | UI focus (React, Vue, Angular), TypeScript/accessibility emphasis | Good - clear domain boundary, predictable deliverables | Use for **frontend-only tasks** |

### Justification

**cek-developer is the primary implementation agent because:**
1. **Structured completion criteria**: Explicit AC verification with file:line references
2. **Tasks.md integration**: Built-in support for phased execution and progress tracking
3. **Zero-hallucination approach**: Refuses to implement without proper context
4. **TDD workflow**: Tests are integrated into the completion definition
5. **Clear handoff**: Post-implementation report format is orchestration-friendly

**When to use others:**
- **fullstack-developer**: Initial feature discovery/scoping across stack boundaries
- **backend-developer**: Pure API/database work with no UI component
- **frontend-developer**: Pure UI work with stable backend APIs

---

## 2. Code Reviewer Agents

### Comparison Table

| Agent | Source | Key Differentiator | Orchestration Fit | Recommendation |
|-------|--------|-------------------|-------------------|----------------|
| **cek-code-quality-reviewer** | CEK | Quality checklist review with binary pass/fail, specific file:line citations | Excellent - structured checklist output, clear scoring | **PRIMARY** for code quality |
| **code-reviewer** | Generic collection | Comprehensive but generic review covering security, performance, design | Moderate - too broad, output format less structured | Archive or merge into cek-code-quality-reviewer |
| **code-reviewer-plan** | Custom | Plan alignment validation - compares implementation against original plan | Good - unique purpose (plan deviation detection) | **KEEP** for plan verification |

### Justification

**cek-code-quality-reviewer is the primary code review agent because:**
1. **Binary checklist**: Clean Code, SOLID, naming, architecture - all with pass/fail
2. **Quality score**: X/Y format enables trend tracking
3. **Evidence required**: Every failed check needs file:line citation
4. **Focused scope**: Reviews only changed code by default

**code-reviewer-plan serves a different purpose:**
- Validates implementation against planning documents
- Detects justified vs problematic deviations from plan
- Use after completing a major project step

**code-reviewer is redundant:**
- Overlaps heavily with cek-code-quality-reviewer
- Less structured output format
- Recommend archiving or merging best elements into cek-code-quality-reviewer

---

## 3. Architect Agents

### Comparison Table

| Agent | Source | Key Differentiator | Orchestration Fit | Recommendation |
|-------|--------|-------------------|-------------------|----------------|
| **cek-software-architect** | CEK | Design approach generation (5 options with probabilities), decisive blueprint creation | Excellent - structured output with explicit trade-offs | **PRIMARY** for architecture design |
| **architect-reviewer** | Generic collection | Architecture validation, scalability assessment, technical debt analysis | Good - clear review purpose, structured progress tracking | **KEEP** for architecture review |

### Justification

**These agents serve distinct workflow stages:**

**cek-software-architect (Planning stage):**
1. **Design approach generation**: 5 options with probabilities enables confident selection
2. **Decisive blueprints**: Makes architectural choices rather than presenting options
3. **Implementation map**: Provides specific files, components, build sequences
4. **Pattern extraction**: Analyzes existing codebase before designing

**architect-reviewer (Review stage):**
1. **Post-design validation**: Reviews existing architecture decisions
2. **Scalability assessment**: Evaluates long-term viability
3. **Technical debt tracking**: Identifies modernization needs
4. **Evolution planning**: Assesses future adaptability

**Selection rule:**
- **Before implementation**: Use cek-software-architect
- **After implementation or periodically**: Use architect-reviewer

---

## 4. Security Agents

### Comparison Table

| Agent | Source | Key Differentiator | Orchestration Fit | Recommendation |
|-------|--------|-------------------|-------------------|----------------|
| **cek-security-auditor** | CEK | Code-focused security review with checklist, severity classification, attack scenarios | Excellent - structured checklist, evidence-based findings | **PRIMARY** for code security review |
| **security-auditor** | Generic collection | Comprehensive but overlapping with cek-security-auditor, compliance framework focus | Moderate - broader scope but less actionable | Archive or specialize for compliance |
| **penetration-tester** | Generic collection | Active security testing, exploit validation, attack simulation | Good - distinct purpose (active testing vs passive review) | **KEEP** for penetration testing |
| **compliance-auditor** | Generic collection | Regulatory compliance (GDPR, HIPAA, PCI DSS, SOC 2) | Good - distinct purpose (compliance vs technical security) | **KEEP** for compliance audits |

### Justification

**cek-security-auditor is the primary security review agent because:**
1. **Security checklist**: 20 binary security checks with pass/fail
2. **Severity classification**: Critical/High/Medium/Low with clear definitions
3. **Attack scenarios**: "An attacker could..." format makes risks concrete
4. **Evidence required**: File:line citations with exploit scenarios
5. **Scope clarity**: Reviews changed code by default

**penetration-tester is complementary, not overlapping:**
- Active testing vs passive code review
- Requires explicit authorization/scope
- Validates exploitability of identified vulnerabilities
- Use for security assessments, not routine code review

**compliance-auditor is complementary, not overlapping:**
- Regulatory framework focus vs code security focus
- Control mapping and evidence collection
- Use for audit preparation, not implementation review

**security-auditor (generic) is redundant:**
- Significant overlap with cek-security-auditor
- Recommend archiving or specializing for compliance-adjacent work

---

## 5. Bug Hunter / Debugger Agents

### Comparison Table

| Agent | Source | Key Differentiator | Orchestration Fit | Recommendation |
|-------|--------|-------------------|-------------------|----------------|
| **cek-bug-hunter** | CEK | Root cause analysis with call chain tracing, Five Whys, Fishbone analysis, defense-in-depth solutions | Excellent - structured analysis format, systemic recommendations | **PRIMARY** for bug hunting |
| **debugger** | Generic collection | Systematic debugging techniques, tool expertise, issue resolution | Good - general debugging support | Use for **active debugging sessions** |
| **error-detective** | Generic collection | Error pattern analysis, correlation, cascade detection in distributed systems | Good - unique focus on patterns across systems | Use for **production error analysis** |

### Justification

**cek-bug-hunter is the primary bug detection agent because:**
1. **Root cause tracing**: 5-step trace from symptom to systemic issue
2. **Multi-dimensional analysis**: Technology, Methods, Process, Environment, Materials
3. **Five Whys**: Deep analysis for critical issues
4. **Defense-in-depth**: Multiple-layer fix recommendations
5. **Priority classification**: Critical > High > Medium with clear criteria

**debugger serves a different workflow:**
- Active debugging of known issues (already reproduced)
- Tool-focused approach (breakpoints, profilers, memory analyzers)
- Post-mortem and prevention documentation
- Use when you have a specific bug to fix, not when searching for bugs

**error-detective serves production analysis:**
- Cross-service error correlation
- Pattern detection across large log volumes
- Cascade failure analysis
- Use for production incident investigation, not code review

---

## 6. Researcher / Explorer Agents

### Comparison Table

| Agent | Source | Key Differentiator | Orchestration Fit | Recommendation |
|-------|--------|-------------------|-------------------|----------------|
| **cek-researcher** | CEK | External technology/library research, MCP integration (context7, serena) | Good - clear external research focus | **PRIMARY** for external research |
| **cek-code-explorer** | CEK | Internal codebase feature tracing, architecture layer mapping | Good - clear internal analysis focus | **PRIMARY** for codebase exploration |
| **data-researcher** | Generic collection | Data analysis, statistical methods, pattern recognition in datasets | Moderate - overlaps with data-analyst | Use for **research-focused data work** |

### Justification

**cek-researcher and cek-code-explorer serve distinct purposes:**

**cek-researcher (External focus):**
1. Technology/library evaluation
2. Package registry analysis
3. Documentation research
4. Competitive analysis
5. Use when learning about new dependencies or technologies

**cek-code-explorer (Internal focus):**
1. Feature implementation tracing
2. Call chain analysis
3. Architecture layer mapping
4. Existing pattern discovery
5. Use when understanding existing codebase features

**Selection rule:**
- **Unknown external technology**: Use cek-researcher
- **Unknown internal feature**: Use cek-code-explorer
- **Both**: Use cek-researcher first (external context), then cek-code-explorer (internal integration)

**data-researcher is context-dependent:**
- Use for data-focused research projects
- Overlaps with data-analyst for non-research scenarios
- Consider consolidating in future audit

---

## Summary: Recommended Primary Agents by Workflow Stage

| Workflow Stage | Primary Agent | When to Use Alternatives |
|----------------|---------------|--------------------------|
| **Analysis (External)** | cek-researcher | Technology research, library evaluation |
| **Analysis (Internal)** | cek-code-explorer | Feature tracing, pattern discovery |
| **Planning** | cek-software-architect | Architecture design, implementation blueprints |
| **Execution** | cek-developer | Task implementation with AC verification |
| **Execution (Backend)** | backend-developer | Pure server-side work |
| **Execution (Frontend)** | frontend-developer | Pure UI work |
| **Review (Code Quality)** | cek-code-quality-reviewer | Standard code review |
| **Review (Plan Alignment)** | code-reviewer-plan | Verify implementation matches plan |
| **Review (Architecture)** | architect-reviewer | Architecture validation |
| **Review (Security)** | cek-security-auditor | Security vulnerability detection |
| **Review (Compliance)** | compliance-auditor | Regulatory compliance |
| **Debugging (Bug Finding)** | cek-bug-hunter | Proactive bug detection in changes |
| **Debugging (Active)** | debugger | Fix known/reproduced issues |
| **Debugging (Production)** | error-detective | Production incident analysis |
| **Security (Active Testing)** | penetration-tester | Security assessments |

---

## Agents to Archive or Merge

| Agent | Recommendation | Reason |
|-------|----------------|--------|
| **code-reviewer** | Archive or merge into cek-code-quality-reviewer | Significant overlap, less structured output |
| **security-auditor** (generic) | Archive or specialize | Significant overlap with cek-security-auditor |
| **fullstack-developer** | Keep for scoping only | Too broad for focused subagent execution |

---

## Context-Dependent Selection Notes

1. **Stack-specific work**: Use backend-developer or frontend-developer when work is clearly single-layer
2. **Feature scoping**: Use fullstack-developer to understand cross-stack requirements before delegating
3. **Security review timing**: Use cek-security-auditor for routine review; penetration-tester for scheduled assessments
4. **Bug workflow**: Use cek-bug-hunter proactively after changes; debugger when investigating known issues
5. **Research workflow**: Start with cek-researcher for external context, then cek-code-explorer for internal mapping
