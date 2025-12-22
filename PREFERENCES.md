# Claude Code Preferences & Decisions

This document tracks preferences, rules, and decisions for Claude Code customization.

---

## Skills Management

### Overlap Analysis (Last checked: 2024-12-22)

**No conflicts found.**

Checked pairs:
- `skill-assistant` vs `skill-creator` — **Complementary**, not conflicting. One finds/installs skills, the other guides creation.

### Bundled Skills

Some skills contain sub-skills in nested folders:

| Bundle | Contains |
|--------|----------|
| `document-skills/` | `docx/`, `pdf/`, `pptx/`, `xlsx/` |

Each sub-folder has its own `SKILL.md` with type-specific instructions.

### Installation Rules

1. **Avoid duplicates** — Before installing a skill, check if a similar one exists
2. **Clean install preferred** — When updating a skill, delete the old directory first:
   ```bash
   rm -rf skills/my-skill && cp -R /source/my-skill skills/
   ```
3. **Naming convention** — Use kebab-case for skill directories (e.g., `my-skill-name`)

### Skill Priority

When multiple skills match a request:
- Both are loaded into context (no strict priority)
- Conflicting instructions may cause unpredictable behavior
- **Resolution**: Remove or rename one skill to avoid overlap

---

## Directory Structure

```
~/.claude/
├── skills/     → symlink to this project's skills/
├── agents/     → symlink to this project's agents/
└── ...

/Users/royengel/Projects/Claude Code/claude-customizations/
├── skills/           # All installed skills
├── agents/           # Custom agents
├── PREFERENCES.md    # This file
└── README.md         # Project overview
```

---

## Session Management

### Resuming Conversations

| Command | Purpose |
|---------|---------|
| `claude --continue` | Resume most recent conversation in current directory |
| `claude --resume` | Interactive picker for all sessions |
| `claude --resume <name>` | Resume specific named session |

### Best Practice

Always name important sessions with `/rename <name>` for easy retrieval later.

---

## Skills vs Agents

| Aspect | Skills | Agents |
|--------|--------|--------|
| What they are | Markdown prompts/instructions | Subprocesses via Task tool |
| Location | `skills/` directory | Built-in or `agents/` directory |
| Invocation | `/skill-name` or auto-matched | Task tool with `subagent_type` |
| Context | Shares main conversation | Isolated subprocess |
| Use case | Reusable prompts, domain knowledge | Multi-step autonomous tasks |

---

## Installed Skills

Source: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

### By Category

**Development**
- artifacts-builder
- changelog-generator
- mcp-builder
- skill-creator
- webapp-testing

**Documents**
- document-skills (docx, pdf, pptx, xlsx)

**Business**
- brand-guidelines
- competitive-ads-extractor
- domain-name-brainstormer
- internal-comms
- lead-research-assistant

**Writing**
- content-research-writer
- meeting-insights-analyzer

**Creative**
- canvas-design
- image-enhancer
- slack-gif-creator
- theme-factory
- video-downloader

**Productivity**
- file-organizer
- invoice-organizer
- raffle-winner-picker

**Meta**
- skill-assistant
- skill-share
- template-skill

---

## Changelog

| Date | Change |
|------|--------|
| 2024-12-22 | Initial document created |
| 2024-12-22 | Installed 23 skills from awesome-claude-skills |
| 2024-12-22 | Set up symlinks for ~/.claude/skills and ~/.claude/agents |
