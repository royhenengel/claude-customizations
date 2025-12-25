# Skills Reference

This document provides a quick reference to all installed Claude Code skills organized by category.

**Total Skills:** 66 unique skills (excluding catalog duplicates)

---

## Anthropic Claude Code Skills

| Skill | Description |
|-------|-------------|
| anthropic | Parent skill for Anthropic Claude-specific expertise |
| anthropic/claude-code | Expert on Claude Code CLI and agent development |
| anthropic/claude-command-builder | Expert guidance for building Claude Code commands |
| anthropic/claude-hook-builder | Expert guidance for building Claude Code hooks |
| anthropic/claude-mcp-expert | Expert on MCP server development for Claude |
| anthropic/claude-settings-expert | Expert on Claude Code settings and configuration |
| anthropic/claude-skill-builder | Expert guidance for building Claude Code skills |

---

## Skill Management

| Skill | Description |
|-------|-------------|
| skill-assistant | Help find, install, and create Claude Skills and Agents |
| skill-creator | Guide for creating effective skills that extend Claude's capabilities |
| skill-share | Creates new Claude skills and automatically shares them on Slack |

---

## n8n Workflow Automation

| Skill | Description |
|-------|-------------|
| n8n-code-javascript | Write JavaScript code in n8n Code nodes with $input/$json/$node syntax |
| n8n-code-python | Write Python code in n8n Code nodes with _input/_json/_node syntax |
| n8n-expression-syntax | Validate n8n expression syntax and fix common errors |
| n8n-mcp-tools-expert | Expert guide for using n8n-mcp MCP tools effectively |
| n8n-node-configuration | Operation-aware node configuration guidance with property dependencies |
| n8n-validation-expert | Interpret validation errors and guide fixing them |
| n8n-workflow-patterns | Proven workflow architectural patterns from real n8n workflows |

---

## Claude Code Development (taches-*)

| Skill | Description |
|-------|-------------|
| create-agent-skills | Expert guidance for creating, writing, and refining Claude Code Skills |
| create-hooks | Create and configure Claude Code hooks for event-driven automation |
| create-meta-prompts | Create optimized prompts for Claude-to-Claude pipelines |
| create-plans | Create hierarchical project plans optimized for solo agentic development |
| create-slash-commands | Expert guidance for creating Claude Code slash commands |
| create-subagents | Expert guidance for creating and using Claude Code subagents and Task tool |
| debug-like-expert | Deep analysis debugging mode with methodical investigation protocols |
| taches-expertise/iphone-apps | Build professional native iPhone apps in Swift with SwiftUI and UIKit (CLI-only) |
| taches-expertise/macos-apps | Build professional native macOS apps in Swift with SwiftUI and AppKit (CLI-only) |
| taches-create-slash-commands | Create Claude Code slash commands |

---

## Platform Development

| Skill | Description |
|-------|-------------|
| ios | Expert on iOS development with Swift, UIKit, SwiftUI, Xcode |
| supabase | Comprehensive Supabase expert (PostgreSQL, auth, real-time) |

---

## Development Practices (cek-*)

| Skill | Description |
|-------|-------------|
| kaizen | Continuous improvement mindset with iterative improvements and error-proof designs |
| software-architecture | Quality focused software architecture based on Clean Architecture and DDD |
| test-driven-development | Write tests first, watch them fail, write minimal code to pass |
| subagent-driven-development | Execute plans by dispatching fresh subagent per task with code review |
| prompt-engineering | Advanced prompt engineering techniques for LLM performance and reliability |

---

## Document Processing

| Skill | Description |
|-------|-------------|
| docx | Comprehensive Word document creation, editing, and analysis with tracked changes |
| pdf | PDF manipulation toolkit for extracting text, creating, merging, splitting, and forms |
| pptx | Presentation creation, editing, and analysis for PowerPoint files |
| xlsx | Spreadsheet creation, editing, and analysis with formulas, formatting, and visualization |

---

## Design and Visual

| Skill | Description |
|-------|-------------|
| artifacts-builder | Suite of tools for creating multi-component claude.ai HTML artifacts |
| brand-guidelines | Apply Anthropic's official brand colors and typography to artifacts |
| canvas-design | Create beautiful visual art in PNG and PDF documents using design philosophy |
| image-enhancer | Improve image quality, especially screenshots, for presentations and documentation |
| slack-gif-creator | Create animated GIFs optimized for Slack with validators for size constraints |
| theme-factory | Toolkit for styling artifacts with 10 pre-set themes (colors/fonts) |
| web-asset-generator | Generate favicons, app icons (PWA), and social media meta images |

---

## Content and Research

| Skill | Description |
|-------|-------------|
| brainstorming | Explore user intent, requirements and design before any creative work |
| changelog-generator | Create user-facing changelogs from git commits automatically |
| competitive-ads-extractor | Extract and analyze competitors' ads from ad libraries |
| content-research-writer | Research, add citations, improve hooks, and iterate on outlines |
| lead-research-assistant | Identify high-quality leads by analyzing your business and target companies |
| notebooklm | Query Google NotebookLM notebooks for source-grounded, citation-backed answers |
| ship-learn-next | Transform learning content into actionable implementation plans |
| youtube-transcript | Download YouTube video transcripts/captions using yt-dlp |

---

## Productivity and Organization

| Skill | Description |
|-------|-------------|
| file-organizer | Intelligently organize files and folders, find duplicates, suggest better structures |
| internal-comms | Write internal communications (status reports, leadership updates, newsletters) |
| invoice-organizer | Organize invoices and receipts for tax preparation automatically |
| meeting-insights-analyzer | Analyze meeting transcripts for behavioral patterns and communication insights |
| raffle-winner-picker | Pick random winners from lists, spreadsheets, or Google Sheets for giveaways |

---

## Developer Tools

| Skill | Description |
|-------|-------------|
| developer-growth-analysis | Analyze Claude Code chat history to identify coding patterns and growth areas |
| domain-name-brainstormer | Generate creative domain name ideas and check availability across TLDs |
| git-pushing | Stage, commit, and push git changes with conventional commit messages |
| mcp-builder | Guide for creating high-quality MCP servers in Python or TypeScript |
| move-code-quality | Analyze Move language packages against the Code Quality Checklist |
| webapp-testing | Test local web applications using Playwright with browser automation |
| video-downloader | Download videos from YouTube and other platforms for offline viewing |

---

## Template

| Skill | Description |
|-------|-------------|
| template-skill | Template for creating new skills (replace description and add instructions) |

---

## Notes

- Skills are located in `~/.claude/skills/`
- The `skill-assistant/catalog/` folder contains the source catalog (duplicates of installed skills)
- To add new skills, work in `/Users/royengel/Projects/Claude Code/claude-customizations/skills/`
- Changes automatically apply globally via symlinks
