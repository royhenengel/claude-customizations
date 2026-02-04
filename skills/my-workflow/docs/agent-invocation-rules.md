# Agent Invocation Rules

Quick-reference guide for selecting the right agent. When in doubt, check the trigger first, then the stage, then the language.

## Selection Rationale

Agent selections in this document are based on the following principles:

1. **Structured Outputs**: Agents with checklist-based outputs and explicit deliverables are preferred for orchestration workflows
2. **Single Responsibility**: Focused specialists over broad generalists for subagent work
3. **Evidence-Based**: Agents requiring file:line citations ensure actionable feedback
4. **Fresh Context**: Each subagent gets clean context, so clear completion criteria matter more than institutional knowledge

**CEK agents are generally preferred** because they provide:

- Binary pass/fail checklists for objective quality measurement
- AC-driven workflows with explicit verification
- Structured output formats that enable trend tracking and automation
- Clear handoff patterns with predictable deliverables

## Trigger-Based Selection

| Trigger | Agent | Justification |
|---------|-------|---------------|
| Complex feature planning | cek-software-architect | Generates 5 design approaches with probabilities; creates decisive blueprints with implementation maps |
| Task execution | cek-developer or language-specific | AC-driven with explicit pre/post checklists; tasks.md integration; zero-hallucination approach |
| Code review needed | cek-code-quality-reviewer | Binary checklist (Clean Code, SOLID, naming); quality score enables trend tracking |
| Plan alignment check | code-reviewer-plan | Validates implementation against planning docs; detects justified vs problematic deviations |
| Security check | cek-security-auditor | 20 binary security checks; severity classification; attack scenarios with file:line evidence |
| Tests failing | debugger | Tool-focused approach for active debugging of known/reproduced issues |
| Bug investigation | cek-bug-hunter | Root cause tracing with Five Whys; Fishbone analysis; defense-in-depth recommendations |
| Understanding requirements | cek-business-analyst | Requirements analysis and business logic |
| Codebase exploration | cek-code-explorer | Feature tracing, call chain analysis, architecture layer mapping |
| Technical research | cek-researcher | External technology/library research with MCP integration |
| Git history analysis | cek-historical-context-reviewer | Code evolution and blame analysis |
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
|-------|---------------|--------------|--------------------------|
| **Analysis (External)** | cek-researcher | - | Technology research, library evaluation |
| **Analysis (Internal)** | cek-code-explorer | cek-historical-context-reviewer | Feature tracing; use historical reviewer for git blame analysis |
| **Planning** | cek-software-architect | cek-tech-lead, api-designer | Tech lead for team coordination; api-designer for contract-first work |
| **Execution** | cek-developer | backend-developer, frontend-developer | Use stack-specific agents when work is clearly single-layer |
| **Review (Code Quality)** | cek-code-quality-reviewer | code-reviewer-plan | Use plan reviewer to verify implementation matches original plan |
| **Review (Architecture)** | architect-reviewer | cek-software-architect | Use architect for design; reviewer for validation |
| **Review (Security)** | cek-security-auditor | penetration-tester, compliance-auditor | Pen-tester for active testing; compliance for regulatory |
| **Debugging (Bug Finding)** | cek-bug-hunter | - | Proactive bug detection in code changes |
| **Debugging (Active)** | debugger | error-detective | Use debugger for known issues; error-detective for production analysis |
| **Documentation** | cek-tech-writer | api-documenter | Use api-documenter for OpenAPI/contract documentation |

## Language Routing

| Language/Framework | Preferred Agent | Alternative |
|-------------------|-----------------|-------------|
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
| Default | cek-developer | backend-developer, frontend-developer |

## Decision Flow

1. **Check trigger first** - If the task matches a specific trigger above, use that agent
2. **Check workflow stage** - Use stage defaults if no specific trigger matches
3. **Check language** - For implementation tasks, route to language-specific agent
4. **Fall back to cek-developer** - AC-driven implementation with structured outputs

## Infrastructure Tasks

| Task Type | Agent |
|-----------|-------|
| Kubernetes | kubernetes-specialist |
| Azure cloud | azure-infra-engineer |
| CI/CD pipelines | build-engineer |
| Deployment | deployment-engineer |
| DevOps | devops-engineer |
| Site reliability | sre-engineer |
| Network | network-engineer |
| Windows Server | windows-infra-admin |

## Context-Dependent Selection Notes

1. **Stack-specific work**: Use backend-developer or frontend-developer when work is clearly single-layer
2. **Security review timing**: Use cek-security-auditor for routine review; penetration-tester for scheduled assessments
3. **Bug workflow**: Use cek-bug-hunter proactively after changes; debugger when investigating known issues
4. **Research workflow**: Start with cek-researcher for external context, then cek-code-explorer for internal mapping
5. **Architecture workflow**: Use cek-software-architect before implementation; architect-reviewer after or periodically

## Domain-Specific Routing (Explicit)

High-value domains with explicit triggers:

| Domain Indicator | Agent | When Triggered |
|------------------|-------|----------------|
| ML/AI codebase or task | ml-engineer | Model training, inference, ML pipelines |
| Data science work | data-scientist | Statistical analysis, modeling, visualization |
| Mobile app (React Native/Flutter) | mobile-app-developer | Cross-platform mobile development |
| iOS/Swift code | swift-expert | Native iOS development |
| Kotlin/Android code | kotlin-specialist | Native Android development |
| GraphQL schema/API | graphql-architect | GraphQL design and optimization |
| WebSocket/real-time | websocket-engineer | Real-time communication systems |

## Implicit Discovery (Context-Based)

These agents are invoked when context makes them relevant. No explicit trigger needed.

**Domain specialists**: fintech-engineer, game-developer, quant-analyst, healthcare/biotech specialists
**Platform specialists**: wordpress-master, home-assistant-manager, electron-pro
**Specialized roles**: legal-advisor, customer-success-manager, ux-researcher, scrum-master, product-manager
**Niche technical**: embedded-systems, iot-engineer, nlp-engineer

*Claude selects these when task context clearly indicates domain relevance (e.g., "working on trading algorithm" → quant-analyst)*

## Deprecated Agents

The following agents have been superseded and should not be used:

| Agent | Replacement | Reason |
|-------|-------------|--------|
| code-reviewer (generic) | cek-code-quality-reviewer | Less structured output; significant overlap |
| security-auditor (generic) | cek-security-auditor | Less actionable format; significant overlap |
| fullstack-developer | cek-developer + stack-specific | Too broad for focused subagent execution; use for scoping only |
| mobile-developer | mobile-app-developer | Redundant naming; mobile-app-developer preferred |
