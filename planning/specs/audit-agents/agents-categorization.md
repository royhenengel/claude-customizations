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

---

## Agent Audit Table

| Agent Name | Category | Workflow Stage | Quality | Notes |
|------------|----------|----------------|---------|-------|
| accessibility-tester | V | R | keep | WCAG compliance and accessibility testing |
| agent-organizer | M | P | keep | Multi-agent task organization and routing |
| ai-engineer | R | E | keep | AI/ML systems and model deployment |
| angular-architect | L | P | keep | Angular 17+ enterprise architecture |
| api-designer | R | P | keep | REST/GraphQL API design and contracts |
| api-documenter | R | O | keep | OpenAPI spec and API documentation |
| architect-reviewer | V | R | keep | Architecture review and design validation |
| azure-infra-engineer | I | E | keep | Azure cloud infrastructure and services |
| backend-developer | R | E | keep | Server-side development and APIs |
| build-engineer | I | E | keep | Build systems and CI/CD pipelines |
| business-analyst | R | A | keep | Requirements analysis and business logic |
| cek-bug-hunter | U | D | keep | Bug detection and investigation |
| cek-business-analyst | R | A | keep | Business requirements and analysis |
| cek-code-explorer | U | A | keep | Codebase navigation and exploration |
| cek-code-quality-reviewer | V | R | keep | Code quality and standards review |
| cek-contracts-reviewer | V | R | keep | API contracts and interface review |
| cek-developer | R | E | keep | General development implementation |
| cek-historical-context-reviewer | U | A | keep | Git history and code evolution analysis |
| cek-researcher | R | A | keep | Technical research and investigation |
| cek-security-auditor | V | R | keep | Security vulnerability assessment |
| cek-software-architect | R | P | keep | Software architecture design |
| cek-tech-lead | M | P | keep | Technical leadership and decision making |
| cek-tech-writer | R | O | keep | Technical documentation writing |
| cek-test-coverage-reviewer | V | R | keep | Test coverage analysis and gaps |
| chaos-engineer | I | E | keep | Chaos testing and resilience engineering |
| cli-developer | R | E | keep | Command-line interface development |
| cloud-architect | I | P | keep | Multi-cloud architecture and design |
| code-reviewer | V | R | keep | Comprehensive code review |
| code-reviewer-plan | V | R | keep | Plan-based code review validation |
| competitive-analyst | R | A | keep | Market and competitor analysis |
| compliance-auditor | V | R | keep | Regulatory compliance verification |
| content-marketer | R | E | keep | Content creation and marketing |
| context-manager | M | N | keep | Context aggregation and coordination |
| cpp-pro | L | E | keep | Modern C++ development (C++20/23) |
| csharp-developer | L | E | keep | C# and .NET development |
| customer-success-manager | R | E | keep | Customer relationship management |
| data-analyst | R | A | keep | Data analysis and insights |
| data-engineer | R | E | keep | Data pipelines and ETL |
| data-researcher | R | A | keep | Data science research |
| data-scientist | R | E | keep | ML models and data science |
| database-administrator | I | E | keep | Database management and operations |
| database-optimizer | U | E | keep | Query and database optimization |
| debugger | U | D | keep | Systematic debugging assistance |
| dependency-manager | U | E | keep | Package and dependency management |
| deployment-engineer | I | E | keep | Deployment automation and releases |
| devops-engineer | I | E | keep | DevOps practices and automation |
| devops-incident-responder | I | D | keep | Incident response and recovery |
| django-developer | L | E | keep | Django framework development |
| documentation-engineer | R | O | keep | Documentation systems and processes |
| dotnet-core-expert | L | E | keep | .NET Core cross-platform development |
| dotnet-framework-4.8-expert | L | E | keep | Legacy .NET Framework 4.8 specialist |
| dx-optimizer | U | E | keep | Developer experience optimization |
| electron-pro | L | E | keep | Electron desktop app development |
| embedded-systems | D | E | keep | Embedded systems and firmware |
| error-coordinator | M | D | keep | Multi-agent error handling coordination |
| error-detective | U | D | keep | Error pattern analysis and investigation |
| fintech-engineer | D | E | keep | Financial technology systems |
| flutter-expert | L | E | keep | Flutter 3+ cross-platform development |
| frontend-developer | R | E | keep | Frontend web development |
| fullstack-developer | R | E | keep | Full-stack web development |
| game-developer | D | E | keep | Game engine and game development |
| git-workflow-manager | U | E | keep | Git workflows and branching strategies |
| golang-pro | L | E | keep | Go 1.21+ development |
| graphql-architect | R | P | keep | GraphQL schema and API design |
| incident-responder | I | D | keep | Incident management and response |
| iot-engineer | D | E | keep | IoT solutions and connectivity |
| it-ops-orchestrator | M | P | keep | IT operations coordination |
| java-architect | L | P | keep | Java 17+ enterprise architecture |
| javascript-pro | L | E | keep | ES2023+ JavaScript development |
| knowledge-synthesizer | U | A | keep | Multi-agent learning synthesis |
| kotlin-specialist | L | E | keep | Kotlin multiplatform development |
| kubernetes-specialist | I | E | keep | Kubernetes orchestration |
| laravel-specialist | L | E | keep | Laravel 10+ PHP framework |
| legacy-modernizer | U | E | keep | Legacy code modernization |
| legal-advisor | R | A | keep | Technology law and compliance |
| llm-architect | D | P | keep | LLM system architecture |
| m365-admin | I | E | keep | Microsoft 365 administration |
| machine-learning-engineer | R | E | keep | ML model deployment |
| market-researcher | R | A | keep | Market research and analysis |
| mcp-developer | L | E | keep | MCP protocol development |
| microservices-architect | R | P | keep | Microservices architecture design |
| ml-engineer | R | E | keep | ML lifecycle management |
| mlops-engineer | I | E | keep | ML platform operations |
| mobile-app-developer | R | E | keep | Mobile app development |
| mobile-developer | R | E | review | Potentially redundant with mobile-app-developer |
| multi-agent-coordinator | M | E | keep | Multi-agent workflow orchestration |
| network-engineer | I | E | keep | Network architecture and security |
| nextjs-developer | L | E | keep | Next.js 14+ development |
| nlp-engineer | D | E | keep | NLP systems and language models |
| payment-integration | D | E | keep | Payment systems integration |
| penetration-tester | V | R | keep | Security penetration testing |
| performance-engineer | U | E | keep | Performance optimization |
| performance-monitor | U | A | keep | Performance metrics and observability |
| php-pro | L | E | keep | PHP 8.3+ development |
| platform-engineer | I | E | keep | Developer platform engineering |
| postgres-pro | L | E | keep | PostgreSQL specialist |
| powershell-5.1-expert | L | E | keep | Windows PowerShell 5.1 |
| powershell-7-expert | L | E | keep | Cross-platform PowerShell 7 |
| powershell-module-architect | L | P | keep | PowerShell module design |
| powershell-security-hardening | V | R | keep | PowerShell security review |
| powershell-ui-architect | L | E | keep | PowerShell UI development |
| product-manager | M | P | keep | Product strategy and roadmap |
| project-manager | M | E | keep | Project delivery and tracking |
| prompt-engineer | R | E | keep | Prompt optimization and design |
| python-pro | L | E | keep | Python 3.11+ development |
| qa-expert | V | R | keep | Quality assurance and testing |
| quant-analyst | D | A | keep | Quantitative financial analysis |
| rails-expert | L | E | keep | Ruby on Rails development |
| react-specialist | L | E | keep | React 18+ development |
| refactoring-specialist | U | E | keep | Code refactoring and transformation |
| research-analyst | R | A | keep | Research and synthesis |
| rust-engineer | L | E | keep | Rust systems programming |
| scrum-master | M | E | keep | Agile facilitation |
| search-specialist | U | A | keep | Search and information retrieval |
| security-auditor | V | R | keep | Security vulnerability assessment |
| security-engineer | I | E | keep | DevSecOps and security infrastructure |
| skill-auditor | V | R | keep | Claude Code skills audit |
| slash-command-auditor | V | R | keep | Claude Code command audit |
| spring-boot-engineer | L | E | keep | Spring Boot 3+ development |
| sql-pro | L | E | keep | SQL optimization and databases |
| sre-engineer | I | E | keep | Site reliability engineering |
| subagent-auditor | V | R | keep | Claude Code subagent audit |
| swift-expert | L | E | keep | Swift 5.9+ and Apple platforms |
| task-distributor | M | E | keep | Task allocation and load balancing |
| technical-writer | R | O | keep | Technical documentation |
| test-automator | V | E | keep | Test automation frameworks |
| tooling-engineer | U | E | keep | Developer tool creation |
| typescript-pro | L | E | keep | TypeScript 5.0+ development |
| ui-designer | R | E | keep | Visual and interaction design |
| ux-researcher | R | A | keep | User research and insights |
| vue-expert | L | E | keep | Vue 3 and Nuxt development |
| websocket-engineer | R | E | keep | Real-time WebSocket systems |
| windows-infra-admin | I | E | keep | Windows Server and Active Directory |
| wordpress-master | L | E | keep | WordPress development and optimization |
| workflow-orchestrator | M | E | keep | Business process automation |

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
| keep | 134 |
| review | 1 |
| archive | 0 |

### Notes

- **mobile-developer** marked for review: Appears to have significant overlap with mobile-app-developer. Consider consolidating or differentiating their purposes.

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

