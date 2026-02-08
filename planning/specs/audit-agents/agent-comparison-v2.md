# Agent Comparison Analysis v2

**Date**: 2026-02-05 (revised 2026-02-07)
**Methodology**: Side-by-side file reading with domain-focused scoring
**Supersedes**: agent-comparison.md (biased, incomplete)

## Methodology

- **Side-by-side file reading**: Every agent file was read in full before scoring
- **Evidence-based scoring**: All scores justified with quoted evidence from the files
- **Source-agnostic evaluation**: CEK agents evaluated against the same criteria as Standard agents
- **Scoring scale**: 1 (minimal/missing) to 5 (excellent/comprehensive)

### Scoring Criteria (Revised)

| Criterion | What it measures | Why it matters |
|-----------|------------------|----------------|
| **Domain Depth** | How deeply the agent understands its specific area | Deep domain knowledge produces better results |
| **Breadth** | How many relevant scenarios and use cases it covers | Wider coverage handles more real-world situations |
| **Adaptability** | How well it works across different project contexts | Agents shouldn't require specific project structures to be useful |
| **Prompt Clarity** | How clear and effective the instructions are | Clearer prompts produce more consistent results |
| **Completeness** | Whether there are gaps in coverage | Missing areas create blind spots |

**What is NOT scored**: Output structure (checklists, templates) and workflow integration (tasks.md, plan.md references) are not primary criteria. These are structural features that can be retrofitted to any agent. An agent with deep domain knowledge and a flat output format is more valuable than one with shallow knowledge and beautiful templates.

---

## Group Comparisons

### Group 1: Developers

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| fullstack-developer | 4 | 5 | 5 | 4 | 4 | **22** |
| backend-developer | 5 | 4 | 4 | 4 | 4 | **21** |
| cek-developer | 3 | 4 | 3 | 5 | 4 | **19** |
| frontend-developer | 3 | 3 | 3 | 3 | 3 | **15** |

#### Evidence

**backend-developer.md** - Deep backend domain knowledge:

> "Database architecture approach: Normalized schema design for relational data, Indexing strategy for query optimization, Connection pooling configuration, Transaction management with rollback"

Covers API design, database architecture, security implementation, performance optimization, microservices patterns, message queue integration, Docker configuration, and monitoring. Multi-language (Node.js 18+, Python 3.11+, Go 1.21+). Strong domain depth with structured development workflow (Analysis, Development, Production Readiness).

**fullstack-developer.md** - Broadest coverage across both layers:

> "Data flow architecture: Database design with proper relationships, API endpoints following RESTful/GraphQL patterns, Frontend state management synchronized with backend"

Highest adaptability because it works in any full-stack project context without requiring specific structures.

**cek-developer.md** - Strong process, moderate domain depth:

> "Implement approved tasks and user stories with zero hallucination by treating Story Context XML and acceptance criteria as the single source of truth."

Excellent process discipline (pre-implementation checklist, refusal guidelines, AC tracking). However, domain depth is process-oriented rather than technology-oriented. Adaptability is limited by its dependency on tasks.md, Story Context XML, and AC-driven project structures.

**frontend-developer.md** - Minimal depth and coverage. Weakest agent in this group across all criteria.

#### Recommendation

**Use the domain-appropriate agent**:
- **fullstack-developer**: Default for cross-stack work or when layer boundaries are unclear
- **backend-developer**: When work is explicitly backend (APIs, databases, microservices)
- **cek-developer**: When you have AC-driven project structure and want strict implementation discipline
- **frontend-developer**: Archive candidate (weakest in group)

---

### Group 2: Code Reviewers

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| code-reviewer | 4 | 5 | 5 | 4 | 5 | **23** |
| cek-code-quality-reviewer | 4 | 3 | 3 | 5 | 4 | **19** |
| code-reviewer-plan | 3 | 2 | 3 | 4 | 3 | **15** |

#### Evidence

**code-reviewer.md** - Broadest review coverage:

> "Code quality assessment: Logic correctness, Error handling, Resource management, Naming conventions, Code organization, Function complexity, Duplication detection, Readability analysis"

Covers 8 distinct review dimensions: code quality, security, performance, design patterns, testing, documentation, dependencies, and technical debt. Plus language-specific review patterns and review automation guidance. Works in any codebase.

**cek-code-quality-reviewer.md** - Focused binary checklist approach:

> "Binary Evaluation: Each checklist item must be marked as either passed (check) or failed (X). No partial credit."

50+ explicit binary items organized by Clean Code, SOLID, naming. Produces a clear Quality Score. However, narrower scope (focused on code quality patterns) and lower adaptability (the binary format is rigid for nuanced review situations).

**code-reviewer-plan.md** - Narrow: plan alignment verification only.

#### Recommendation

**Primary: code-reviewer** - Broadest domain coverage, highest adaptability, works in any codebase. Covers security, performance, patterns, testing, and technical debt in a single pass.

**When to use alternatives**:
- **cek-code-quality-reviewer**: When you want a binary pass/fail quality gate with a numeric score
- **code-reviewer-plan**: Specifically to verify implementation matches a planning document

---

### Group 3: Security

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| security-auditor | 5 | 5 | 4 | 4 | 5 | **23** |
| security-engineer | 5 | 4 | 4 | 4 | 5 | **22** |
| cek-security-auditor | 4 | 3 | 3 | 5 | 4 | **19** |

#### Evidence

**security-auditor.md** - Deepest domain expertise for comprehensive security:

> "Compliance frameworks: SOC 2 Type II, ISO 27001/27002, HIPAA requirements, PCI DSS standards, GDPR compliance, NIST frameworks, CIS benchmarks"

Covers compliance frameworks, vulnerability assessment, access control, data security, infrastructure audit, incident response, risk assessment, audit evidence collection, third-party security, and executive reporting. Genuine organizational security audit depth.

**security-engineer.md** - Infrastructure and DevSecOps focus:

> "Infrastructure hardening: OS-level security baselines, Container security standards, Kubernetes security policies"

Different purpose: building secure infrastructure rather than auditing existing systems.

**cek-security-auditor.md** - Code change review focus:

Structured severity classification and file:line evidence format. Narrower scope (code changes only) and lower adaptability (designed for PR-review workflow).

#### Recommendation

**These serve different purposes** (not competitors):
- **security-auditor**: Comprehensive security assessments, compliance audits, risk evaluation
- **security-engineer**: Infrastructure security, DevSecOps pipelines, security controls
- **cek-security-auditor**: Focused code change security review (PR-level)

Select based on the task, not on which scores higher overall.

---

### Group 4: Architects

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| architect-reviewer | 4 | 5 | 4 | 4 | 5 | **22** |
| cek-software-architect | 4 | 4 | 4 | 5 | 4 | **21** |
| microservices-architect | 5 | 4 | 3 | 4 | 5 | **21** |

#### Evidence

**cek-software-architect.md** - Architecture creation with structured approach:

> "Generate 5 possible design approaches with trade-offs. Approaches should each include a text and a numeric probability."

Unique multi-option design approach. Creates Implementation Maps with file:line references.

**architect-reviewer.md** - Architecture evaluation and validation:

> "You are a senior architecture reviewer with expertise in evaluating system designs"

Broader scope for reviewing existing architecture. Scalability assessment, technical debt tracking.

**microservices-architect.md** - Domain-specific depth for distributed systems:

> "Service design principles: Single responsibility focus, Domain-driven boundaries, Database per service"

Deep microservices knowledge but limited adaptability (only useful for distributed systems).

#### Recommendation

**These serve different purposes**:
- **cek-software-architect**: Creating new architecture designs (multi-option approach)
- **architect-reviewer**: Reviewing and validating existing architecture
- **microservices-architect**: Specifically for distributed systems design

---

### Group 5: Bug Hunters/Debuggers

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| cek-bug-hunter | 5 | 4 | 4 | 5 | 5 | **23** |
| debugger | 4 | 5 | 5 | 4 | 5 | **23** |
| error-detective | 4 | 4 | 3 | 4 | 5 | **20** |

#### Evidence

**cek-bug-hunter.md** - Genuine domain depth in debugging methodology:

> "1. Identify the symptom: Where does the error manifest? 2. Find immediate cause: What code directly causes this? 3. Trace the call chain: What called this code? 4. Find original trigger: Where did the invalid data/state originate? 5. Identify systemic enabler: What architectural decision allowed this?"

Includes Five Whys and Fishbone analysis. This is real methodological depth, not just structural formatting.

**debugger.md** - Broadest debugging toolkit:

> "Diagnostic approach: Symptom analysis, Hypothesis formation, Systematic elimination"

Works in any debugging scenario. Higher adaptability.

**error-detective.md** - Cross-service error correlation. Different purpose: production error patterns.

#### Recommendation

**Tied at 23, with different strengths**:
- **cek-bug-hunter**: When you want structured root cause analysis (Five Whys, Fishbone)
- **debugger**: For general debugging, especially when the issue is poorly defined

---

### Group 6: Researchers

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| research-analyst | 4 | 5 | 4 | 4 | 5 | **22** |
| cek-researcher | 4 | 3 | 4 | 5 | 4 | **20** |
| data-researcher | 4 | 4 | 3 | 4 | 5 | **20** |

#### Evidence

**cek-researcher.md** - Technical research with MCP integration:

> "If you have access to following MCP servers use it: context7 MCP to investigate libraries and frameworks documentation"

Structured output (Research Context, Options Comparison, Implementation Guide, Code Examples). MCP awareness is a genuine capability advantage for technical research.

**research-analyst.md** - Broader research scope:

> "Research domains: Market research, Technology trends, Competitive intelligence"

Wider applicability beyond technical research.

**data-researcher.md** - Data-focused: mining and statistical analysis. Different purpose.

#### Recommendation

**Different research domains**:
- **cek-researcher**: Technical library/framework research (has MCP integration)
- **research-analyst**: Market research, business research, competitive intelligence
- **data-researcher**: Data mining and statistical analysis

---

### Group 7: Technical Writers

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| cek-tech-writer | 5 | 5 | 4 | 5 | 5 | **24** |
| documentation-engineer | 4 | 4 | 4 | 4 | 4 | **20** |
| technical-writer | 4 | 4 | 4 | 4 | 4 | **20** |
| api-documenter | 4 | 3 | 3 | 4 | 4 | **18** |

#### Evidence

**cek-tech-writer.md** - Genuinely comprehensive documentation methodology:

> "What TO Document: Getting Started: Quick setup, first success in <5 minutes. How-To Guides: Task-oriented, problem-solving documentation."
> "What NOT to Document: Generic 'Getting Started' without specific tasks. API docs that duplicate generated/schema documentation."

This agent's high score reflects real domain depth: it has a complete documentation framework including what to document, what not to document, quality gates, and feature-documentation workflow. This is methodology depth, not just structural formatting.

#### Recommendation

**Primary: cek-tech-writer** - Genuine domain depth advantage in documentation methodology.

**When to use alternatives**:
- **api-documenter**: Specifically for OpenAPI/Swagger documentation
- **documentation-engineer**: For building documentation systems and infrastructure
- **technical-writer**: General technical writing

---

### Group 8: Business Analysts

#### Agent Comparison Matrix

| Agent | Domain Depth | Breadth | Adaptability | Prompt Clarity | Completeness | Total |
|-------|-------------|---------|--------------|----------------|--------------|-------|
| business-analyst | 4 | 5 | 4 | 4 | 5 | **22** |
| cek-business-analyst | 4 | 3 | 4 | 5 | 4 | **20** |

#### Evidence

**business-analyst.md** - Broader BA practice coverage:

> "Analysis techniques: SWOT analysis, Root cause analysis, Cost-benefit analysis"

Covers full BA lifecycle: requirements, process improvement, stakeholder management.

**cek-business-analyst.md** - Requirements-focused with clarity limits:

> "LIMIT: Maximum 3 [NEEDS CLARIFICATION] markers total"

Good discipline for requirements gathering, but narrower scope than full BA work.

#### Recommendation

- **business-analyst**: For comprehensive BA activities (analysis, process, stakeholder)
- **cek-business-analyst**: For focused requirements gathering with AC-driven workflow

---

### Group 9: Data Roles

**These agents serve distinct, non-overlapping purposes:**

| Purpose | Agent |
|---------|-------|
| Building data pipelines/ETL | data-engineer |
| ML models and statistical analysis | data-scientist |
| Dashboards and BI reporting | data-analyst |
| Finding/discovering data sources | data-researcher |

**No consolidation recommended** - different job functions.

---

### Group 10: ML/AI Engineers

**Significant overlap between ml-engineer and machine-learning-engineer.** Both cover ML lifecycle with slightly different emphases.

| Purpose | Agent |
|---------|-------|
| Full ML lifecycle | ml-engineer |
| AI system design with ethics | ai-engineer |
| ML platform infrastructure | mlops-engineer |
| Deployment only | machine-learning-engineer (redundant) |

**Archive candidate**: machine-learning-engineer (duplicates ml-engineer)

---

## Summary Table

| Group | Primary Recommendation | When to Use Alternatives |
|-------|----------------------|--------------------------|
| **Developers** | Use domain-appropriate (fullstack or backend) | cek-developer for AC-driven workflow |
| **Code Reviewers** | code-reviewer (broadest coverage) | cek-code-quality-reviewer for binary pass/fail gate |
| **Security** | Match to task type | security-auditor (compliance), security-engineer (infra), cek-security-auditor (code review) |
| **Architects** | Match to task type | cek-software-architect (create), architect-reviewer (validate) |
| **Bug Hunters** | cek-bug-hunter or debugger (tied) | cek for structured root cause, debugger for general |
| **Researchers** | Match to research domain | cek-researcher (technical), research-analyst (market) |
| **Technical Writers** | cek-tech-writer | api-documenter for APIs |
| **Business Analysts** | business-analyst (broader) | cek-business-analyst for requirements only |
| **Data Roles** | Use appropriate role | All 4 are distinct |
| **ML/AI** | ml-engineer (lifecycle) | ai-engineer for ethics, mlops for platform |

---

## Agents to Archive or Merge

### Strong Archive Candidates

| Agent | Reason | Evidence |
|-------|--------|----------|
| machine-learning-engineer | Redundant with ml-engineer | Both cover ML lifecycle; ml-engineer has better coverage |
| frontend-developer | Weakest developer agent | Least depth, breadth, and adaptability in developer group |

### Keep as Distinct (Initially Seemed Overlapping)

| Agent Pair | Why Distinct |
|------------|--------------|
| code-reviewer vs cek-code-quality-reviewer | Broad review vs binary quality gate |
| security-auditor vs cek-security-auditor | Compliance audit vs code change review |
| architect-reviewer vs cek-software-architect | Review existing vs create new designs |
| debugger vs cek-bug-hunter | General debugging vs structured root cause analysis |
| All data roles | Different job functions (engineer, scientist, analyst, researcher) |

---

## Where CEK Agents Excel (Evidence-Based)

CEK agents score highest on **Prompt Clarity** consistently. Their instructions are explicit, well-structured, and leave less room for ambiguity. This is a genuine advantage.

CEK agents also excel in specific methodology areas where the methodology IS the domain depth:
- **cek-bug-hunter**: Five Whys and Fishbone analysis are real debugging methodologies
- **cek-tech-writer**: Documentation framework (what to/not to document) is real documentation expertise
- **cek-researcher**: MCP tool awareness is a genuine capability

Where CEK agents score lower is in **Breadth** and **Adaptability**:
- Most CEK agents assume specific project structures (tasks.md, AC, Story Context XML)
- Narrower scope means they handle fewer real-world scenarios
- Standard agents tend to work in any project context

**Structural features are not differentiators.** Checklists, binary pass/fail formats, and template outputs can be added to any agent's prompt. These should not be used as selection criteria. Select based on domain knowledge, coverage breadth, and adaptability to your project context.

---

## Remaining Groups Not Compared (Lower Priority)

These groups have clear specialization by version, framework, or language:

| Group | Agents | Selection Criteria |
|-------|--------|-------------------|
| PowerShell | 5.1-expert, 7-expert, module-architect, security-hardening, ui-architect | Version and specialization |
| .NET | dotnet-core-expert, dotnet-framework-4.8-expert, csharp-developer | Framework version |
| Frontend Frameworks | react-specialist, angular-architect, vue-expert, nextjs-developer | Framework used |
| Backend Frameworks | django-developer, rails-expert, laravel-specialist, spring-boot-engineer | Framework used |
| Language Specialists | python-pro, javascript-pro, typescript-pro, golang-pro, etc. | Language used |

No comparison needed - selection is determined by the technology stack.
