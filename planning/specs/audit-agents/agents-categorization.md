# Agent Categorization Audit

## Overview

This document tracks the categorization and audit results for all agent files in the `agents/` directory.

**Total Agents**: 135

## Categories

| Code | Category | Description |
|------|----------|-------------|
| L | Language | Programming language specialists |
| R | Role | Job role/function specialists |
| D | Domain | Industry/domain specialists |
| I | Infrastructure | DevOps, cloud, platform engineers |
| V | Review | Code review, quality, auditing |
| M | Management | Project management, coordination |
| U | Utility | General purpose utilities |

## Workflow Stages

| Code | Stage | Description |
|------|-------|-------------|
| A | Analysis | Understanding requirements, exploring code |
| P | Planning | Architecture, design decisions |
| E | Execution | Implementation, coding |
| R | Review | Code review, quality checks |
| D | Debugging | Error investigation, fixes |
| O | Documentation | Writing docs, comments |
| N | N/A | Not workflow-specific |

## Quality Markers

| Marker | Meaning |
|--------|---------|
| keep | High quality, actively used |
| review | Needs updates or improvements |
| archive | Candidate for removal/archival |

## Sources

| Code | Source | Description |
|------|--------|-------------|
| Standard | Claude Code built-in | Ships with Claude Code Task tool |
| CEK | Context Engineering Kit | From NeoLabHQ/context-engineering-kit |

---

## Agent Audit Table

| Agent Name | Source | Category | Workflow Stage | Quality | Notes |
|------------|--------|----------|----------------|---------|-------|
| accessibility-tester | Standard | V | R | keep | WCAG compliance and accessibility testing |
| agent-organizer | Standard | M | P | keep | Multi-agent task organization and routing |
| ai-engineer | Standard | R | E | keep | AI/ML systems and model deployment |
| angular-architect | Standard | L | P | keep | Angular 17+ enterprise architecture |
| api-designer | Standard | R | P | keep | REST/GraphQL API design and contracts |
| api-documenter | Standard | R | O | keep | OpenAPI spec and API documentation |
| architect-reviewer | Standard | V | R | keep | Architecture review and design validation |
| azure-infra-engineer | Standard | I | E | keep | Azure cloud infrastructure and services |
| backend-developer | Standard | R | E | keep | Server-side development and APIs |
| build-engineer | Standard | I | E | keep | Build systems and CI/CD pipelines |
| business-analyst | Standard | R | A | keep | Requirements analysis and business logic |
| cek-bug-hunter | CEK | U | D | keep | Bug detection with Five Whys methodology |
| cek-business-analyst | CEK | R | A | keep | Requirements with AC-driven workflow |
| cek-code-explorer | CEK | U | A | keep | Codebase navigation and exploration |
| cek-code-quality-reviewer | CEK | V | R | keep | Binary checklist code quality review |
| cek-contracts-reviewer | CEK | V | R | keep | API contracts and interface review |
| cek-developer | CEK | R | E | keep | AC-driven development implementation |
| cek-historical-context-reviewer | CEK | U | A | keep | Git history and code evolution analysis |
| cek-researcher | CEK | R | A | keep | Technical research with MCP integration |
| cek-security-auditor | CEK | V | R | keep | Code change security review |
| cek-software-architect | CEK | R | P | keep | Software architecture design |
| cek-tech-lead | CEK | M | P | keep | Technical leadership and decision making |
| cek-tech-writer | CEK | R | O | keep | Feature documentation with quality gates |
| cek-test-coverage-reviewer | CEK | V | R | keep | Test coverage analysis and gaps |
| chaos-engineer | Standard | I | E | keep | Chaos testing and resilience engineering |
| cli-developer | Standard | R | E | keep | Command-line interface development |
| cloud-architect | Standard | I | P | keep | Multi-cloud architecture and design |
| code-reviewer | Standard | V | R | keep | Comprehensive code review |
| code-reviewer-plan | Standard | V | R | keep | Plan-based code review validation |
| competitive-analyst | Standard | R | A | keep | Market and competitor analysis |
| compliance-auditor | Standard | V | R | keep | Regulatory compliance verification |
| content-marketer | Standard | R | E | keep | Content creation and marketing |
| context-manager | Standard | M | N | keep | Context aggregation and coordination |
| cpp-pro | Standard | L | E | keep | Modern C++ development (C++20/23) |
| csharp-developer | Standard | L | E | keep | C# and .NET development |
| customer-success-manager | Standard | R | E | keep | Customer relationship management |
| data-analyst | Standard | R | A | keep | Data analysis and insights |
| data-engineer | Standard | R | E | keep | Data pipelines and ETL |
| data-researcher | Standard | R | A | keep | Data science research |
| data-scientist | Standard | R | E | keep | ML models and data science |
| database-administrator | Standard | I | E | keep | Database management and operations |
| database-optimizer | Standard | U | E | keep | Query and database optimization |
| debugger | Standard | U | D | keep | Systematic debugging assistance |
| dependency-manager | Standard | U | E | keep | Package and dependency management |
| deployment-engineer | Standard | I | E | keep | Deployment automation and releases |
| devops-engineer | Standard | I | E | keep | DevOps practices and automation |
| devops-incident-responder | Standard | I | D | keep | Incident response and recovery |
| django-developer | Standard | L | E | keep | Django framework development |
| documentation-engineer | Standard | R | O | keep | Documentation systems and processes |
| dotnet-core-expert | Standard | L | E | keep | .NET Core cross-platform development |
| dotnet-framework-4.8-expert | Standard | L | E | keep | Legacy .NET Framework 4.8 specialist |
| dx-optimizer | Standard | U | E | keep | Developer experience optimization |
| electron-pro | Standard | L | E | keep | Electron desktop app development |
| embedded-systems | Standard | D | E | keep | Embedded systems and firmware |
| error-coordinator | Standard | M | D | keep | Multi-agent error handling coordination |
| error-detective | Standard | U | D | keep | Error pattern analysis and investigation |
| fintech-engineer | Standard | D | E | keep | Financial technology systems |
| flutter-expert | Standard | L | E | keep | Flutter 3+ cross-platform development |
| frontend-developer | Standard | R | E | archive | Weak domain depth; lacks verification and checklists compared to alternatives |
| fullstack-developer | Standard | R | E | keep | Full-stack web development |
| game-developer | Standard | D | E | keep | Game engine and game development |
| git-workflow-manager | Standard | U | E | keep | Git workflows and branching strategies |
| golang-pro | Standard | L | E | keep | Go 1.21+ development |
| graphql-architect | Standard | R | P | keep | GraphQL schema and API design |
| incident-responder | Standard | I | D | keep | Incident management and response |
| iot-engineer | Standard | D | E | keep | IoT solutions and connectivity |
| it-ops-orchestrator | Standard | M | P | keep | IT operations coordination |
| java-architect | Standard | L | P | keep | Java 17+ enterprise architecture |
| javascript-pro | Standard | L | E | keep | ES2023+ JavaScript development |
| knowledge-synthesizer | Standard | U | A | keep | Multi-agent learning synthesis |
| kotlin-specialist | Standard | L | E | keep | Kotlin multiplatform development |
| kubernetes-specialist | Standard | I | E | keep | Kubernetes orchestration |
| laravel-specialist | Standard | L | E | keep | Laravel 10+ PHP framework |
| legacy-modernizer | Standard | U | E | keep | Legacy code modernization |
| legal-advisor | Standard | R | A | keep | Technology law and compliance |
| llm-architect | Standard | D | P | keep | LLM system architecture |
| m365-admin | Standard | I | E | keep | Microsoft 365 administration |
| machine-learning-engineer | Standard | R | E | archive | Redundant with ml-engineer |
| market-researcher | Standard | R | A | keep | Market research and analysis |
| mcp-developer | Standard | L | E | keep | MCP protocol development |
| microservices-architect | Standard | R | P | keep | Microservices architecture design |
| ml-engineer | Standard | R | E | keep | ML lifecycle management |
| mlops-engineer | Standard | I | E | keep | ML platform operations |
| mobile-app-developer | Standard | R | E | keep | Mobile app development |
| mobile-developer | Standard | R | E | archive | Merged into mobile-app-developer |
| multi-agent-coordinator | Standard | M | E | keep | Multi-agent workflow orchestration |
| network-engineer | Standard | I | E | keep | Network architecture and security |
| nextjs-developer | Standard | L | E | keep | Next.js 14+ development |
| nlp-engineer | Standard | D | E | keep | NLP systems and language models |
| payment-integration | Standard | D | E | keep | Payment systems integration |
| penetration-tester | Standard | V | R | keep | Security penetration testing |
| performance-engineer | Standard | U | E | keep | Performance optimization |
| performance-monitor | Standard | U | A | keep | Performance metrics and observability |
| php-pro | Standard | L | E | keep | PHP 8.3+ development |
| platform-engineer | Standard | I | E | keep | Developer platform engineering |
| postgres-pro | Standard | L | E | keep | PostgreSQL specialist |
| powershell-5.1-expert | Standard | L | E | keep | Windows PowerShell 5.1 |
| powershell-7-expert | Standard | L | E | keep | Cross-platform PowerShell 7 |
| powershell-module-architect | Standard | L | P | keep | PowerShell module design |
| powershell-security-hardening | Standard | V | R | keep | PowerShell security review |
| powershell-ui-architect | Standard | L | E | keep | PowerShell UI development |
| product-manager | Standard | M | P | keep | Product strategy and roadmap |
| project-manager | Standard | M | E | keep | Project delivery and tracking |
| prompt-engineer | Standard | R | E | keep | Prompt optimization and design |
| python-pro | Standard | L | E | keep | Python 3.11+ development |
| qa-expert | Standard | V | R | keep | Quality assurance and testing |
| quant-analyst | Standard | D | A | keep | Quantitative financial analysis |
| rails-expert | Standard | L | E | keep | Ruby on Rails development |
| react-specialist | Standard | L | E | keep | React 18+ development |
| refactoring-specialist | Standard | U | E | keep | Code refactoring and transformation |
| research-analyst | Standard | R | A | keep | Research and synthesis |
| rust-engineer | Standard | L | E | keep | Rust systems programming |
| scrum-master | Standard | M | E | keep | Agile facilitation |
| search-specialist | Standard | U | A | keep | Search and information retrieval |
| security-auditor | Standard | V | R | keep | Comprehensive security assessment and compliance |
| security-engineer | Standard | I | E | keep | DevSecOps and security infrastructure |
| skill-auditor | Standard | V | R | keep | Claude Code skills audit |
| slash-command-auditor | Standard | V | R | keep | Claude Code command audit |
| spring-boot-engineer | Standard | L | E | keep | Spring Boot 3+ development |
| sql-pro | Standard | L | E | keep | SQL optimization and databases |
| sre-engineer | Standard | I | E | keep | Site reliability engineering |
| subagent-auditor | Standard | V | R | keep | Claude Code subagent audit |
| swift-expert | Standard | L | E | keep | Swift 5.9+ and Apple platforms |
| task-distributor | Standard | M | E | keep | Task allocation and load balancing |
| technical-writer | Standard | R | O | keep | Technical documentation |
| test-automator | Standard | V | E | keep | Test automation frameworks |
| tooling-engineer | Standard | U | E | keep | Developer tool creation |
| typescript-pro | Standard | L | E | keep | TypeScript 5.0+ development |
| ui-designer | Standard | R | E | keep | Visual and interaction design |
| ux-researcher | Standard | R | A | keep | User research and insights |
| vue-expert | Standard | L | E | keep | Vue 3 and Nuxt development |
| websocket-engineer | Standard | R | E | keep | Real-time WebSocket systems |
| windows-infra-admin | Standard | I | E | keep | Windows Server and Active Directory |
| wordpress-master | Standard | L | E | keep | WordPress development and optimization |
| workflow-orchestrator | Standard | M | E | keep | Business process automation |

---

## Summary Statistics

### By Category

| Category | Count |
|----------|-------|
| Language (L) | 35 |
| Role (R) | 38 |
| Domain (D) | 10 |
| Infrastructure (I) | 21 |
| Review (V) | 18 |
| Management (M) | 10 |
| Utility (U) | 13 |

### By Workflow Stage

| Stage | Count |
|-------|-------|
| Analysis (A) | 16 |
| Planning (P) | 13 |
| Execution (E) | 87 |
| Review (R) | 15 |
| Debugging (D) | 5 |
| Documentation (O) | 4 |
| N/A (N) | 1 |

### By Quality

| Quality | Count |
|---------|-------|
| keep | 132 |
| review | 0 |
| archive | 3 |

### By Source

| Source | Count |
|--------|-------|
| Standard | 122 |
| CEK | 13 |

### Archive Candidates

| Agent | Reason |
|-------|--------|
| mobile-developer | Merged into mobile-app-developer |
| machine-learning-engineer | Redundant with ml-engineer (both cover ML lifecycle) |
| frontend-developer | Weakest developer agent; lacks verification, checklists, and domain depth compared to cek-developer and backend-developer |

---

## Categorization Decisions

### Language (L) Agents
Programming language and framework specialists. Includes both pure language experts (python-pro, golang-pro) and framework specialists (react-specialist, laravel-specialist) since frameworks are tightly coupled to their languages.

### Role (R) Agents
Job function specialists that work across technologies. These represent general professional roles (backend-developer, data-scientist) rather than specific technology expertise.

### Domain (D) Agents
Industry-specific specialists (fintech-engineer, game-developer) with deep domain knowledge beyond general software development.

### Infrastructure (I) Agents
DevOps, cloud, and platform specialists. Includes cloud platforms (azure-infra-engineer), container orchestration (kubernetes-specialist), and operational roles (sre-engineer).

### Review (V) Agents
Quality assurance and auditing specialists. Includes code reviewers, security auditors, and specialized auditors for Claude Code components (skill-auditor, slash-command-auditor).

### Management (M) Agents
Coordination and orchestration agents. Includes project management roles and multi-agent coordination (agent-organizer, workflow-orchestrator).

### Utility (U) Agents
General-purpose tools that support multiple workflows. Includes debugging assistants, performance tools, and specialized utilities (git-workflow-manager, refactoring-specialist).

### Workflow Stage Decisions
- Most implementation agents are marked "Execution (E)" as they primarily write/modify code
- Planning agents focus on architecture and design decisions before implementation
- Analysis agents gather and process information without modifying systems
- Review agents evaluate existing work for quality/compliance
- Documentation agents focus on creating written documentation

### Source Classification
- **Standard**: Agents that ship as built-in subagent types in Claude Code's Task tool. Custom .md files may override the built-in behavior.
- **CEK**: Agents from the Context Engineering Kit (NeoLabHQ/context-engineering-kit). Distinguished by `cek-` prefix. These emphasize AC-driven workflows, binary checklists, and structured outputs.
