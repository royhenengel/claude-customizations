# Reddit MCP Server Research

## Information Gathered

### Codebase Analysis

- MCP servers configured in `~/.claude.json` under `mcpServers` key
- **Existing pattern**: All servers use `npx -y @package/name`
- No Python/uvx servers currently configured
- Technical consistency rule added: prefer npm packages

### External Research (Comprehensive)

#### MCP Server Ecosystem

15+ Reddit MCP implementations found across GitHub, npm, and MCP registries. Adoption varies significantly.

#### Option Comparison (by adoption)

| Server | Stars | Language | npm Package | API Keys | Features |
|--------|-------|----------|-------------|----------|----------|
| [reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy) | ~360 | TypeScript | **Yes** | Optional (3 tiers) | Browse, search, user analysis |
| [adhikasp/mcp-reddit](https://github.com/adhikasp/mcp-reddit) | 342 | Python | No | Required | Hot threads, galleries, post details |
| [Arindam200/reddit-mcp](https://github.com/Arindam200/reddit-mcp) | 260 | Python | No | Required | User profiles, posting support |
| [Hawstein/mcp-server-reddit](https://github.com/Hawstein/mcp-server-reddit) | 134 | Python | No | No | Frontpage, subreddit info, comments |
| zicochaos/reddit-mcp | 0 | Python | No | Yes | LRU caching, rate limiting |

#### reddit-mcp-buddy (Selected)

**Why selected:**
1. **npm package** - Fits existing `npx -y` pattern (technical consistency)
2. **High adoption** - ~360 stars, actively maintained
3. **Optional auth** - 3 tiers: anonymous (10 req/min), app-only, full user auth
4. **TypeScript** - Matches existing Node.js ecosystem

**Tools exposed:**
- Browse subreddits (hot, new, top, rising)
- Search posts and comments
- Get post details with comments
- Analyze user profiles
- Subreddit statistics

**Installation:**
```bash
npx -y reddit-mcp-buddy
```

**Configuration (anonymous mode):**
```json
"reddit": {
  "command": "npx",
  "args": ["-y", "reddit-mcp-buddy"]
}
```

**Configuration (with API keys for higher rate limits):**
```json
"reddit": {
  "command": "npx",
  "args": ["-y", "reddit-mcp-buddy"],
  "env": {
    "REDDIT_CLIENT_ID": "your_client_id",
    "REDDIT_CLIENT_SECRET": "your_client_secret"
  }
}
```

#### Alternative: Hawstein/mcp-server-reddit

Considered for no-auth requirement but rejected:
- Python-based (requires uvx or pip, breaks consistency)
- Fewer stars (134 vs ~360)
- Less feature-rich

## Approach

Use **reddit-mcp-buddy** via npx:
- Maintains technical consistency with existing MCP servers
- Anonymous mode sufficient for most use cases (10 req/min)
- Can upgrade to API keys later if rate limits become an issue

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| reddit-mcp-buddy | npm package, high adoption, optional auth | Anonymous has 10 req/min limit | **SELECTED** |
| adhikasp/mcp-reddit | Highest stars (342) | Python, requires API keys | Rejected: technical inconsistency |
| Hawstein/mcp-server-reddit | No auth required | Python, lower adoption | Rejected: technical inconsistency |
| zicochaos/reddit-mcp | LRU caching | No adoption, Python | Rejected: no community validation |

## Dependencies

- Node.js (already have via npx)
- No API keys required for basic usage

## Open Questions

None - approach is clear.

## Sources

- [GitHub: reddit-mcp-buddy](https://github.com/karanb192/reddit-mcp-buddy)
- [npm: reddit-mcp-buddy](https://www.npmjs.com/package/reddit-mcp-buddy)
- [Smithery MCP Registry](https://smithery.ai)
- [Glama.ai MCP Directory](https://glama.ai/mcp/servers?query=reddit)
