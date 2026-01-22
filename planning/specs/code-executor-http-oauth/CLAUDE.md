# code-executor-http-oauth Feature Context

## Summary

@SUMMARY.md

## Key Files (implementation)

- `mcp/code-executor/src/bridge/mcp-client.ts` - Core MCP client with HTTP/OAuth support
- `mcp/code-executor/src/bridge/oauth-provider.ts` - CLI OAuth provider with token storage
- `mcp/code-executor/src/bridge/config-loader.ts` - Config loading with lazy server support

## Configuration

- `~/.claude.json` - Server definitions with `disabled: true` for lazy loading
- `~/.claude/mcp-tokens/` - OAuth token storage directory

## Status

Feature complete. Notion MCP connects via OAuth on demand.
