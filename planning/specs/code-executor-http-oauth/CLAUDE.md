# code-executor-http-oauth Feature Context

## Summary

@SUMMARY.md

## Key Files (implementation)

- `mcp/code-executor/src/bridge/mcp-client.ts` - Core MCP client with HTTP/OAuth support, proactive refresh, retry logic
- `mcp/code-executor/src/bridge/oauth-provider.ts` - CLI OAuth provider with token storage and expiration tracking
- `mcp/code-executor/src/bridge/server-pool.ts` - Server pool with lazy loading support
- `mcp/code-executor/src/bridge/config-loader.ts` - Config loading with lazy server support
- `mcp/code-executor/src/executor/runtime.ts` - Async getToolSchema support
- `mcp/code-executor/src/executor/sandbox.ts` - Updated ExecutionContext type
- `mcp/code-executor/src/tools/get-signature.ts` - Async tool schema lookup
- `mcp/code-executor/src/types/index.ts` - Updated interface definitions

## Configuration

- `~/.claude.json` - Single source of truth for server definitions
  - OAuth servers: `disabled: true`, NOT in `CONNECTED_SERVERS`
  - Pre-connected servers: Listed in `CONNECTED_SERVERS` env var
- `~/.claude/mcp-tokens/` - OAuth token storage directory (per-server JSON files)

## Key Concepts

### Lazy Loading

Servers with `disabled: true` in config are NOT connected at startup. When `callMCPTool()` or `getToolSchema()` is called for a lazy server, `ServerPool` connects it on-demand.

### Token Expiration Tracking

Tokens include `tokensIssuedAt` timestamp. Before connecting, `shouldRefreshTokens()` checks if tokens expire within 5 minutes (300 seconds buffer).

### OAuth Flow Priority

1. Use existing valid tokens
2. Proactively refresh expiring tokens
3. Retry refresh on connection failure
4. Open browser only as last resort

## Status

Feature complete with bug fix. Notion and Supabase MCP connect lazily via OAuth with proactive token refresh. No random browser auth popups.

## Version History

- 2026-01-22: Initial implementation (HTTP transport, OAuth flow, token persistence)
- 2026-01-26: Bug fix (token expiration tracking, proactive refresh, true lazy loading)
