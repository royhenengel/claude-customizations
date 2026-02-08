# Agent Invocation Rules

**Date**: 2026-02-07
**Source**: [agent-comparison-v2.md](../../../planning/specs/audit-agents/agent-comparison-v2.md)

Quick-reference guide for selecting the right agent. When in doubt, check the trigger first, then the stage, then the language.

## Selection Rationale

Agent selections are based on evidence from side-by-side agent comparison (see source). Selection criteria:

1. **Domain Depth**: Deep domain knowledge produces better results than shallow structural formatting
2. **Breadth**: Wider coverage handles more real-world scenarios
3. **Adaptability**: Agents that work in any project context are preferred over those requiring specific structures
4. **Prompt Clarity**: Clear, unambiguous instructions produce more consistent results
5. **Completeness**: No blind spots in coverage

Structural features (checklists, templates, binary pass/fail formats) can be retrofitted to any agent prompt. These are not primary selection criteria.

## Trigger-Based Selection

| Trigger | Agent | Justification |
| ------- | ----- | ------------- |
| Complex feature planning | cek-software-architect | Generates 5 design approaches with probabilities; creates implementation maps |
| Task execution (cross-stack) | fullstack-developer | Broadest coverage, highest adaptability across both layers |
| Task execution (backend) | backend-developer | Deep backend patterns: database architecture, APIs, microservices, Docker |
| Task execution (AC-driven) | cek-developer | When project uses AC, Story Context XML, and tasks.md workflow |
| Code review needed | code-reviewer | 8 review dimensions, language-specific patterns, works in any codebase |
| Quality gate (binary) | cek-code-quality-reviewer | 50+ binary pass/fail items with numeric score for trend tracking |
| Plan alignment check | code-reviewer-plan | Validates implementation against planning docs |
| Security assessment | security-auditor | Compliance frameworks (SOC 2, HIPAA, PCI DSS, GDPR, NIST), risk evaluation |
| Security (code changes) | cek-security-auditor | PR-level security review with severity classification and file:line evidence |
| Security (infrastructure) | security-engineer | Infrastructure hardening, DevSecOps pipelines, security controls |
| Tests failing | debugger | Tool-focused approach for active debugging of known/reproduced issues |
| Bug investigation | cek-bug-hunter | Root cause tracing with Five Whys, Fishbone analysis (genuine debugging methodology) |
| Understanding requirements | business-analyst | Full BA lifecycle: requirements, process improvement, stakeholder management |
| Requirements (AC workflow) | cek-business-analyst | Focused requirements gathering with AC-driven structure |
| Codebase exploration | cek-code-explorer | Feature tracing, call chain analysis, architecture layer mapping |
| Technical research | cek-researcher | External technology/library research with MCP tool integration |
| Git history analysis | cek-historical-context-reviewer | Code evolution and blame analysis |
| Documentation | cek-tech-writer | Complete documentation framework with quality gates (genuine methodology depth) |
| API documentation | api-documenter | OpenAPI/Swagger specification documentation |
| API design | api-designer | REST/GraphQL contracts |
| Performance issues | performance-engineer | Optimization and profiling |
| Database optimization | database-optimizer | Query and schema optimization |
| Multi-agent coordination | multi-agent-coordinator | Orchestrating multiple agents |
| Architecture validation | architect-reviewer | Post-design review; scalability assessment; technical debt tracking |
| Compliance audit | compliance-auditor | Regulatory framework focus (GDPR, HIPAA, PCI DSS, SOC 2) |
| Penetration testing | penetration-tester | Active security testing; exploit validation (requires authorization) |
| Production errors | error-detective | Cross-service error correlation; cascade failure analysis |

## Stage-Based Defaults

| Stage | Primary Agent | Alternatives | When to Use Alternatives |
| ----- | ------------- | ------------ | ------------------------ |
| **Analysis (External)** | cek-researcher | research-analyst | cek-researcher for technical/library research (MCP); research-analyst for market/business research |
| **Analysis (Internal)** | cek-code-explorer | cek-historical-context-reviewer | Feature tracing; use historical reviewer for git blame analysis |
| **Planning** | cek-software-architect | architect-reviewer, api-designer | architect-reviewer for validating existing designs; api-designer for contract-first work |
| **Execution** | fullstack-developer | backend-developer, cek-developer | backend-developer for pure backend work; cek-developer for AC-driven projects |
| **Review (Code Quality)** | code-reviewer | cek-code-quality-reviewer, code-reviewer-plan | cek for binary quality gate with numeric score; plan-reviewer for plan alignment |
| **Review (Architecture)** | architect-reviewer | cek-software-architect | Use architect for design creation; reviewer for validation |
| **Review (Security)** | security-auditor | cek-security-auditor, penetration-tester | cek for PR-level code review; pen-tester for active testing |
| **Debugging (Bug Finding)** | cek-bug-hunter | debugger | cek for structured root cause analysis (Five Whys); debugger for general/poorly-defined issues |
| **Debugging (Active)** | debugger | error-detective | Use debugger for known issues; error-detective for production analysis |
| **Documentation** | cek-tech-writer | api-documenter, documentation-engineer | api-documenter for OpenAPI specs; documentation-engineer for doc system infrastructure |

## Language Routing

| Language/Framework | Preferred Agent | Alternative |
| ------------------ | --------------- | ----------- |
| TypeScript | typescript-pro | javascript-pro |
| JavaScript | javascript-pro | - |
| Python | python-pro | django-developer |
| Go | golang-pro | - |
| Rust | rust-engineer | - |
| C# | csharp-developer | dotnet-core-expert |
| Java | java-architect | spring-boot-engineer |
| PHP | php-pro | laravel-specialist |
| Ruby/Rails | rails-expert | - |
| Swift | swift-expert | - |
| Kotlin | kotlin-specialist | - |
| C++ | cpp-pro | - |
| SQL | sql-pro | postgres-pro |
| PowerShell | powershell-7-expert | powershell-5.1-expert |
| React | react-specialist | - |
| Vue | vue-expert | - |
| Angular | angular-architect | - |
| Next.js | nextjs-developer | - |
| Flutter | flutter-expert | - |
| Electron | electron-pro | - |

## Decision Flow

1. **Check trigger first** - If the task matches a specific trigger above, use that agent
2. **Check language** - For implementation tasks, route to language-specific agent
3. **Check workflow stage** - Use stage defaults if no specific trigger or language matches
4. **Fall back to fullstack-developer** - Broadest coverage, works in any project context

## Infrastructure Tasks

| Task Type | Agent |
| --------- | ----- |
| Kubernetes | kubernetes-specialist |
| Azure cloud | azure-infra-engineer |
| CI/CD pipelines | build-engineer |
| Deployment | deployment-engineer |
| DevOps | devops-engineer |
| Site reliability | sre-engineer |
| Network | network-engineer |
| Windows Server | windows-infra-admin |

## Domain-Specific Routing

High-value domains with explicit triggers:

| Domain Indicator | Agent | When Triggered |
| ---------------- | ----- | -------------- |
| ML/AI codebase or task | ml-engineer | Model training, inference, ML pipelines |
| Data science work | data-scientist | Statistical analysis, modeling, visualization |
| Data pipelines/ETL | data-engineer | Building and maintaining data infrastructure |
| Dashboards/BI | data-analyst | Data analysis, insights, reporting |
| Mobile app (cross-platform) | mobile-app-developer | React Native, Flutter, cross-platform mobile |
| iOS/Swift code | swift-expert | Native iOS development |
| Kotlin/Android code | kotlin-specialist | Native Android development |
| GraphQL schema/API | graphql-architect | GraphQL design and optimization |
| WebSocket/real-time | websocket-engineer | Real-time communication systems |

## Implicit Discovery

These agents are invoked when task context clearly indicates domain relevance. Selection criteria: the task description, codebase patterns, or user request must explicitly reference the domain.

| Category | Agents | Context Signal |
| -------- | ------ | -------------- |
| Finance | fintech-engineer, quant-analyst, payment-integration | Payment processing, trading algorithms, financial regulations |
| Games | game-developer | Game engine, rendering, multiplayer systems |
| IoT/Embedded | iot-engineer, embedded-systems | Microcontrollers, RTOS, device connectivity |
| NLP | nlp-engineer | Text processing, language models, tokenization |
| Web platforms | wordpress-master | WordPress themes, plugins, multisite |
| Business | legal-advisor, customer-success-manager, product-manager, scrum-master | Non-technical business tasks |
| UX | ux-researcher, ui-designer | User research, interface design |

## Archived Agents

These agents are marked for archival and should not be used:

| Agent | Replacement | Reason |
| ----- | ----------- | ------ |
| mobile-developer | mobile-app-developer | Redundant; merged into mobile-app-developer |
| machine-learning-engineer | ml-engineer | Redundant; both cover ML lifecycle, ml-engineer has better coverage |
| frontend-developer | fullstack-developer or react-specialist | Weakest developer agent; lowest depth, breadth, and adaptability |
