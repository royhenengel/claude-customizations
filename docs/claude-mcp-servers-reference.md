# MCP Servers Reference

This document provides a quick reference to all installed MCP (Model Context Protocol) servers.

**Total Servers:** 12 (10 active, 2 disabled)

---

## Core Anthropic Servers

| Server | Description | Status |
|--------|-------------|--------|
| filesystem | Read/write access to files in ~/Users/royengel | Active |
| memory | Knowledge graph for persistent entity storage | Active |
| sequential-thinking | Structured step-by-step reasoning and problem solving | Active |
| puppeteer | Browser automation for web scraping and testing | Active |
| github | GitHub API integration for repos, issues, PRs | Active |
| postgres | PostgreSQL database access | Disabled |

---

## Workflow Automation

| Server | Description | Status |
|--------|-------------|--------|
| n8n-mcp | n8n workflow automation (nodes, templates, executions) | Active |

---

## Design & Visual

| Server | Description | Status |
|--------|-------------|--------|
| figma | Figma design context, screenshots, and Code Connect | Active |
| icons8 | Search and retrieve icons from Icons8 catalog | Active |

---

## Diagrams & Visualization

| Server | Description | Status |
|--------|-------------|--------|
| mcp-mermaid | Render Mermaid diagrams to PNG/SVG/base64 | Active |
| plantuml | Render PlantUML diagrams via plantuml.com server | Active |

---

## API Documentation

| Server | Description | Status |
|--------|-------------|--------|
| apidog | Read OpenAPI specs from Apidog projects | Disabled |

---

## Configuration

MCP servers are configured in `~/.claude/.mcp.json` (symlinked from `/Users/royengel/Projects/Claude Code/claude-customizations/.mcp.json`).

### Adding a New Server

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

### Disabling a Server

Add `"disabled": true` to temporarily disable without removing:

```json
{
  "server-name": {
    "command": "npx",
    "args": ["..."],
    "disabled": true
  }
}
```

---

*Generated: 2026-02-11*
