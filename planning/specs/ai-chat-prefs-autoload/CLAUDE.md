# ai-chat-prefs-autoload Feature Context

## Summary

@SUMMARY.md

## Key Files

- `AI-CHAT-PREFS.md` - The preferences document (repo root)
- `~/.claude/settings.json` - SessionStart hook configuration

## Notion Source

- Page: [AI Chat Prefs](https://www.notion.so/2c74df894a6980b6ab64f322b96aa753)
- Fetch via: code-executor → Notion MCP → notion-fetch tool

## Resync Command

To update from Notion:
```javascript
// Via code-executor
const result = await callMCPTool('notion', 'notion-fetch', {
  id: '2c74df894a6980b6ab64f322b96aa753'
});
// Then update AI-CHAT-PREFS.md with cleaned content
```

## Status

Feature complete. Prefs auto-load on every session start.
