# Reddit MCP Server Specification

## Goal

Set up a Reddit MCP server to enable Claude Code to fetch Reddit posts and comments directly, replacing the need for Puppeteer-based browser automation.

## User Stories

- As a Claude Code user, I want to fetch Reddit posts from specific subreddits so that I can research topics discussed on Reddit
- As a Claude Code user, I want to retrieve comments on Reddit posts so that I can understand community discussions
- As a Claude Code user, I want to search Reddit content so that I can find relevant discussions on specific topics

## Requirements

### Functional

- [ ] Install and configure zicochaos/reddit-mcp server
- [ ] Register server in Claude Code MCP configuration
- [ ] Expose Reddit tools: subreddit feed, post comments, search, user feed, subreddit info
- [ ] No API key configuration required (uses public API)

### Non-Functional

- [ ] Use uv-based installation for consistency with existing tools
- [ ] Caching enabled to reduce API calls
- [ ] Rate limiting to respect Reddit API policies

## Constraints

- Public Reddit API only (no authenticated operations like posting)
- Cannot access private/quarantined subreddits
- Subject to Reddit rate limits (default: 60 calls/minute)

## Success Criteria

- [ ] MCP server runs and connects to Claude Code
- [ ] Can fetch posts from a subreddit via MCP tool
- [ ] Can retrieve comments on a specific post
- [ ] Can search Reddit for topics

## Open Questions

None - requirements are clear.
