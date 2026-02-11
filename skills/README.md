# Skills Directory

110 skills that auto-activate based on conversation context. Invoke explicitly via `/skill-name`.

## Skill Groups

| Group | Count | Examples |
| --- | --- | --- |
| Audit | 3 | audit-skill, audit-slash-command, audit-subagent |
| Code-Quality | 15 | debugging-practices, quality-practices, software-development-practices |
| Communications | 2 | internal-comms, meeting-insights-analyzer |
| Design | 5 | canvas-design, diagrams-builder, theme-factory |
| Documentation | 12 | docx, pdf, pptx, xlsx, changelog-generator |
| Git | 5 | commit, git-pushing, git-worktrees, pr |
| Instinct | 5 | instinct-bootstrap, instinct-status, evolve |
| Learning | 2 | compound, ship-learn-next |
| Notion | 10 | notion-search, notion-create-task, notion-find |
| Planning | 19 | my-workflow, start, plan, build, status |
| Platform | 10 | n8n, home-assistant-manager, webapp-testing |
| Prompts | 6 | prompt-engineering, create-prompt, run-prompt |
| Research | 1 | content-research-writer |
| Todos | 2 | check-todos, add-to-todos |
| Tooling | 10 | hook-builder, mcp-builder, skill-creation |
| Utilities | 1 | file-organizer |

78 additional skills at root level (not yet grouped).

## Adding a Skill

Create `skills/{Group}/{name}/SKILL.md` with YAML frontmatter:

```yaml
---
name: my-skill
description: What it does and when to use it (third person).
---
```
