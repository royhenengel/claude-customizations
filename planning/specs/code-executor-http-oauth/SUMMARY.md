# code-executor HTTP/OAuth Feature Implementation Summary

Added HTTP transport with OAuth support to code-executor MCP server for connecting to official Notion MCP and Supabase MCP

Initial Release: 2026-01-22
Bug Fix Release: 2026-01-26

## What Was Built

Extended code-executor MCP bridge to support HTTP transport (in addition to stdio) with full OAuth 2.0 flow:

- HTTP Transport: StreamableHTTPClientTransport from @modelcontextprotocol/sdk
- OAuth Provider: CLI-based OAuth with PKCE, local callback server, token storage
- Token Management: Persistent tokens in `~/.claude/mcp-tokens/<server>.json`
- Lazy Loading: Servers marked `disabled: true` connect on-demand when tools are called
- Proactive Token Refresh: Tokens refresh before expiration to prevent auth interruptions

## Bug Fix (2026-01-26): Random Browser Auth Popups

### Problem

After successful OAuth sign-in, browser would randomly open auth links unpredictably. Expected behavior: sign in once, stay authenticated.

### Root Cause Analysis

1. No expiration tracking: Tokens had `expires_in` (e.g., 3600s) but no `issued_at` timestamp
2. No proactive refresh: System waited for 401 errors instead of refreshing before expiration
3. Aggressive token clearing: On any connection failure, tokens were cleared immediately
4. SDK behavior: When HTTP request returns 401, SDK calls `auth()` which triggers `redirectToAuthorization()` - opening browser

### Fix Applied

1. Token expiration tracking - Added `tokensIssuedAt` timestamp when saving tokens
2. Proactive refresh - Added `shouldRefreshTokens()` to check if tokens expire within 5 minutes
3. Retry before clearing - On connection failure, attempt token refresh before clearing
4. True lazy loading - Removed OAuth servers from `CONNECTED_SERVERS` so they only connect on-demand

## Configuration

### Single Source of Truth: ~/.claude.json

```json
{
  "mcpServers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp",
      "disabled": true
    },
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp",
      "disabled": true
    },
    "code-executor": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/code-executor/dist/index.js"],
      "env": {
        "MCP_CONFIG_PATH": "/Users/royengel/.claude.json",
        "CONNECTED_SERVERS": "notion-workspace,memory,github,context7"
      }
    }
  }
}
```

Key Points:

- OAuth servers (notion, supabase) are `disabled: true` and NOT in `CONNECTED_SERVERS`
- They connect lazily when `callMCPTool()` is invoked
- Non-OAuth servers that need immediate availability go in `CONNECTED_SERVERS`

### Token Storage

Tokens stored in `~/.claude/mcp-tokens/<server>.json`:

```json
{
  "clientInfo": {
    "client_id": "...",
    "client_secret": "...",
    "redirect_uris": ["http://localhost:8976/callback"]
  },
  "tokens": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600,
    "token_type": "Bearer"
  },
  "tokensIssuedAt": 1769422501
}
```

## Tasks Completed

### Initial Implementation (2026-01-22)

- [x] Add StreamableHTTPClientTransport import to mcp-client.ts
- [x] Create CLIOAuthProvider class for CLI OAuth flow
- [x] Implement local callback server (port 8976) for authorization code
- [x] Add token persistence to filesystem
- [x] Modify config-loader to ignore `disabled` flag for CONNECTED_SERVERS entries
- [x] Test OAuth flow with official Notion MCP
- [x] Build and verify connection

### Bug Fix (2026-01-26)

- [x] Add `tokensIssuedAt` timestamp when saving tokens
- [x] Add `shouldRefreshTokens()` method with 5-minute buffer
- [x] Add `hasRefreshToken()` and `getRefreshToken()` helper methods
- [x] Update `connectHttp()` to proactively refresh expiring tokens
- [x] Add retry logic: attempt refresh before clearing tokens on failure
- [x] Extract `handleOAuthRedirect()` method for clarity
- [x] Add true lazy loading to `ServerPool.callTool()`
- [x] Add async lazy loading to `ServerPool.getToolSchema()`
- [x] Update all callers for async `getToolSchema()`
- [x] Remove notion/supabase from `CONNECTED_SERVERS`
- [x] Delete redundant `~/.claude/.mcp.json` file
- [x] Test lazy loading for Notion and Supabase

## Files Changed

### Core Implementation

- `mcp/code-executor/src/bridge/mcp-client.ts` - HTTP connection with OAuth, proactive refresh, retry logic
- `mcp/code-executor/src/bridge/oauth-provider.ts` - Token storage with `tokensIssuedAt`, expiration checking
- `mcp/code-executor/src/bridge/server-pool.ts` - Lazy loading in `callTool()` and `getToolSchema()`
- `mcp/code-executor/src/bridge/config-loader.ts` - Config loading with lazy server support

### Async getToolSchema Updates

- `mcp/code-executor/src/executor/runtime.ts` - Made `getToolSchema` async
- `mcp/code-executor/src/executor/sandbox.ts` - Updated type signature
- `mcp/code-executor/src/tools/get-signature.ts` - Added await
- `mcp/code-executor/src/types/index.ts` - Updated `ExecutionContext` interface

### Config Changes

- `~/.claude.json` - Updated `CONNECTED_SERVERS` to exclude lazy-loaded OAuth servers

## OAuth Flow (Updated)

1. On first tool call to lazy server: `ServerPool.callTool()` detects server not connected
2. Lazy connection: Creates `MCPClientConnection` and calls `connect()`
3. Token check: `connectHttp()` checks for existing tokens
4. Proactive refresh: If tokens expire within 5 minutes and refresh_token exists, refresh first
5. Connection attempt: Try connecting with current tokens
6. On failure: If refresh_token exists, attempt refresh via `auth()` before clearing
7. Browser auth: Only if no valid tokens and no successful refresh, open browser
8. Token storage: Save tokens with `tokensIssuedAt` timestamp

## Server Categories

| Server           | Transport  | Pre-connected | Lazy-loaded |
| ---------------- | ---------- | ------------- | ----------- |
| notion-workspace | stdio      | Yes           | -           |
| memory           | stdio      | Yes           | -           |
| github           | stdio      | Yes           | -           |
| context7         | stdio      | Yes           | -           |
| notion           | http/OAuth | -             | Yes         |
| supabase         | http/OAuth | -             | Yes         |
| n8n-mcp          | stdio      | -             | Yes         |
| filesystem       | stdio      | -             | Yes         |
| mcp-mermaid      | stdio      | -             | Yes         |

## Testing Results (2026-01-26)

| Test                             | Result                   |
| -------------------------------- | ------------------------ |
| Pre-connected servers count      | 4 (correct)              |
| Notion lazy connection           | Success (4 to 5 servers) |
| Notion OAuth tokens reused       | Success (no browser)     |
| Supabase lazy connection         | Success (5 to 6 servers) |
| Supabase OAuth tokens reused     | Success (no browser)     |
| Token files have tokensIssuedAt  | Verified                 |

## Known Limitations

1. OAuth callback port conflict: If multiple OAuth servers auth simultaneously, port 8976 may conflict
2. No automatic token cleanup: Expired tokens stay in filesystem until next auth attempt

---

Feature: code-executor-http-oauth
Initial: 2026-01-22
Updated: 2026-01-26
