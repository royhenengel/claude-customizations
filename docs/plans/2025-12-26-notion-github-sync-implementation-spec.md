# Notion ↔ GitHub Bidirectional Sync

## Overview
Bidirectional sync between Notion (source of truth) and GitHub repos. Markdown docs in `docs/` folders sync automatically.

## Key Decisions
- **Scope:** Only `docs/*.md` files
- **Conflict resolution:** Most recent edit wins
- **Trigger:** Git push to main (GitHub→Notion), Notion webhook + 15min polling fallback (Notion→GitHub)
- **Default:** All repos sync unless `.notion-sync-ignore` exists
- **New Notion pages:** Don't sync to GitHub in v1 (only GitHub-originated docs sync back)

## Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   GitHub    │◄───────►│    n8n      │◄───────►│   Notion    │
│   (repos)   │ webhook │ (orchestrator)│  API   │ (source of  │
│   docs/*.md │         │             │         │   truth)    │
└─────────────┘         └─────────────┘         └─────────────┘
```

## Workflow 1: GitHub → Notion

**Trigger:** GitHub webhook on push to main branch

**Steps:**
1. Filter - Check if push includes `docs/*.md` changes, check for `.notion-sync-ignore`
2. Fetch files - Get content via GitHub API, extract frontmatter, parse filename for title
3. Find or create Notion page - Search by `github_path` property
4. Convert & sync - Markdown to Notion blocks, set `last_synced` and `sync_source = "github"`
5. Handle deletions - Archive Notion page (don't delete), set `archived_from_github = true`

## Workflow 2: Notion → GitHub

**Trigger:** Notion webhook (primary) + 15min schedule (fallback)

**Steps:**
1. Detect changes - Query pages where `last_edited_time > last_synced` AND `github_path` is set
2. Skip echo loops - Ignore if `sync_source = "github"` AND `last_synced` within 2 minutes
3. **Detect renames** - Compare Notion title (kebab-cased) with current `github_path` filename
4. Convert - Notion blocks to markdown
5. **If rename needed:**
   - Delete old file from GitHub
   - Create new file with renamed path
   - Update `github_path` property in Notion
   - Commit message: `docs: rename oldname.md → newname.md [auto]`
6. **If content-only:**
   - Commit to GitHub with message `docs: sync from Notion [auto]`
7. Update sync state - Set `last_synced` and `sync_source = "notion"`

### Title → Filename Conversion
Notion page titles are converted to kebab-case filenames:
- `Claude Agents Reference` → `claude-agents-reference.md`
- `My Cool Doc!` → `my-cool-doc.md`

## Resources Database Properties (Add to existing)

| Property | Type | Purpose |
|----------|------|---------|
| `github_path` | Text | `owner/repo:docs/filename.md` |
| `github_repo` | Text | `owner/repo` |
| `last_synced` | Date | Timestamp of last sync |
| `sync_source` | Select | `github` / `notion` |
| `sync_enabled` | Checkbox | Default true |
| `archived_from_github` | Checkbox | File deleted from repo |

## Error Handling

- **Echo loop prevention:** Check `sync_source` + 2 minute window
- **API failures:** Retry 3x with backoff, log to n8n
- **Markdown conversion:** Preserve code/tables/headers, strip inline HTML, keep image URLs
- **Deletions:** GitHub delete → archive Notion page; Notion delete → no GitHub action
- **Large files:** Chunk API calls, warn on >50KB

## Implementation Steps

1. Add 5 properties to Resources database
2. Create GitHub org-wide webhook (push events, main branch only)
3. Build n8n workflow: `github-to-notion`
4. Build n8n workflow: `notion-to-github`
5. Build/use markdown ↔ Notion converters
6. Test with `claude-customizations` repo
7. Roll out to other repos

## Future Improvements

- Sync Notion-native pages to GitHub (infer repo from Project relation or manual assignment)
- Project ↔ Repo mapping
- GitHub → Notion rename detection (when files are renamed in GitHub)
