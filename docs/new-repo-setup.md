# New Repository Setup

When creating a new GitHub repository for `royhenengel`, set up the Notion sync workflow.

## Notion Sync Workflow

Create `.github/workflows/sync-to-notion.yml` with this content:

```yaml
name: Sync Docs to Notion

on:
  push:
    branches: [main]
    paths:
      - 'docs/**/*.md'

jobs:
  trigger-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Get changed files
        id: changed
        run: |
          changed=$(git diff --name-only HEAD~1 HEAD -- 'docs/*.md' | tr '\n' ' ')
          echo "files=$changed" >> $GITHUB_OUTPUT

      - name: Trigger notion-workspace sync
        if: steps.changed.outputs.files != ''
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: royhenengel/Notion-Workspace
          event-type: sync-docs-to-notion
          client-payload: '{"repo": "${{ github.event.repository.name }}", "files": "${{ steps.changed.outputs.files }}"}'
```

## Required Secrets

Add the `REPO_DISPATCH_TOKEN` secret (PAT with `repo` scope) to the repository.

## When to Use

This enables automatic sync of `docs/*.md` files to Notion. Skip if the repo won't have documentation.
