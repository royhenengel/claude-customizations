# Migration Plan: Commands & Skills Reorganization

## Overview

Reorganize all 74 items (38 commands + 36 existing skills) into 17 functional groups under skills/.

## Target Structure

```
skills/
├── Audit/              (3)
├── CEK/                (1)
├── Code-Quality/       (10)
├── Communications/     (2)
├── Design/             (5)
├── Documentation/      (1)
├── Git/                (5)
├── Instinct/           (5)
├── Learning/           (2)
├── Notion/             (10)
├── Planning/           (4)
├── Platform/           (5)
├── Prompts/            (3)
├── Research/           (2)
├── Todos/              (2)
├── Tooling/            (5)
└── Utilities/          (1)
```

## Group Details

### Notion/ (10 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| notion-knowledge-capture | existing skill | Move |
| notion-meeting-intelligence | existing skill | Move |
| notion-research-docs | existing skill | Move |
| notion-spec-to-implementation | existing skill | Move |
| notion-create-database-row | command | Migrate |
| notion-create-page | command | Migrate |
| notion-create-task | command | Migrate |
| notion-database-query | command | Migrate |
| notion-find | command | Migrate |
| notion-search | command | Migrate |

### Code-Quality/ (10 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| debugging-practices | existing skill | Move |
| quality-practices | existing skill | Move |
| software-development-practices | existing skill | Move |
| webapp-testing | existing skill | Move |
| debug | command | Migrate |
| fix | command | Migrate |
| review | command | Migrate |
| test | command | Migrate |
| analyse | command | Migrate |
| map-codebase | command | Migrate |

### Git/ (5 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| git-pushing | existing skill | Move |
| git-worktrees | existing skill | Move |
| changelog-generator | existing skill | Move |
| commit | command | Migrate |
| pr | command | Migrate |

### Design/ (5 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| canvas-design | existing skill | Move |
| artifacts-builder | existing skill | Move |
| theme-factory | existing skill | Move |
| brand-guidelines | existing skill | Move |
| web-asset-generator | existing skill | Move |

### Platform/ (5 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| supabase | existing skill | Move |
| n8n | existing skill | Move |
| home-assistant-manager | existing skill | Move |
| anthropic | existing skill | Move |
| mcp-builder | existing skill | Move |

### Tooling/ (5 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| hook-builder | existing skill | Move |
| skill-creation | existing skill | Move |
| slash-command-builder | existing skill | Move |
| subagent-design | existing skill | Move |
| heal-skill | command | Migrate |

### Instinct/ (5 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| instinct-bootstrap | command | Migrate |
| instinct-export | command | Migrate |
| instinct-import | command | Migrate |
| instinct-status | command | Migrate |
| evolve | command | Migrate |

### Planning/ (4 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| my-workflow | existing skill | Move |
| brainstorming | existing skill | Move |
| living-requirements | existing skill | Move |
| handoff | command | Migrate |

### Prompts/ (3 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| prompt-engineering | existing skill | Move |
| create-prompt | command | Migrate |
| run-prompt | command | Migrate |

### Audit/ (3 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| audit-skill | command | Migrate |
| audit-slash-command | command | Migrate |
| audit-subagent | command | Migrate |

### Communications/ (2 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| internal-comms | existing skill | Move |
| meeting-insights-analyzer | existing skill | Move |

### Research/ (2 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| notebooklm | existing skill | Move |
| content-research-writer | existing skill | Move |

### Learning/ (2 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| ship-learn-next | existing skill | Move |
| compound | command | Migrate |

### Todos/ (2 items)

| Item | Source | Action |
| ---- | ------ | ------ |
| add-to-todos | command | Migrate |
| check-todos | command | Migrate |

### Documentation/ (1 item)

| Item | Source | Action |
| ---- | ------ | ------ |
| diagrams-builder | existing skill | Move |

### CEK/ (1 item)

| Item | Source | Action |
| ---- | ------ | ------ |
| cek | existing skill (already consolidated) | Keep |

### Utilities/ (1 item)

| Item | Source | Action |
| ---- | ------ | ------ |
| file-organizer | existing skill | Move |

## Commands to Archive (no migration needed)

Thin wrappers that delegate to existing skills. Archive only.

| Command | Delegates To |
| ------- | ------------ |
| create-agent-skill | Skill(skill-creation) |
| create-hook | Skill(hook-builder) |
| create-meta-prompt | Skill(prompt-engineering) |
| create-slash-command | Skill(slash-command-builder) |
| create-subagent | Skill(subagent-design) |
| build | skills/my-workflow/ |
| plan | skills/my-workflow/ |
| start | skills/my-workflow/ |
| status | skills/my-workflow/ |

## Migration Actions

**Move** (existing skill): Relocate skill directory into group directory. Update any internal paths.
**Migrate** (command): Create SKILL.md with frontmatter (name + description), copy command content, archive original.
**Archive**: Move command to archive/commands/.

## Batch Assignment

**Batch 1** (Task 7): Archive 9 thin wrappers + migrate consolidated groups (Notion, Instinct, Audit, Todos) + move existing skills into groups
**Batch 2** (Task 8): Migrate remaining commands into their groups (Code-Quality, Git, Prompts, Planning, Tooling, Learning)
