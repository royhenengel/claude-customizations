# Attach Review to PR

Add line-specific review comments to pull requests using GitHub CLI API.

## Overview

Guide for adding line-specific comments to PRs using either MCP GitHub tools or direct API calls. Creates comments similar to GitHub UI's "Files changed" comments.

## Preferred Approach: MCP Tools

Use `mcp__github_inline_comment__create_inline_comment` when available.

## Fallback: GitHub CLI API

### Single Line Comment

```bash
gh api repos/{owner}/{repo}/pulls/{pr_number}/comments \
  -f body='Your comment text here' \
  -f commit_id='<commit-sha>' \
  -f path='path/to/file.js' \
  -F line=42 \
  -f side='RIGHT'
```

**Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| body | string | Yes | Comment text (supports Markdown) |
| commit_id | string | Yes | SHA of commit to comment on |
| path | string | Yes | Relative file path |
| line | integer | Yes | Line number in diff (-F for integers) |
| side | string | Yes | RIGHT (new/modified), LEFT (deleted) |
| start_line | integer | No | Start of multi-line comment |
| start_side | string | No | Start side for multi-line |

### Multiple Comments (Review)

```bash
cat <<'EOF' | gh api repos/{owner}/{repo}/pulls/{pr}/reviews --input -
{
  "event": "COMMENT",
  "body": "Overall review summary",
  "comments": [
    {
      "path": "file1.tsx",
      "body": "Comment on file 1",
      "side": "RIGHT",
      "line": 15
    },
    {
      "path": "file2.tsx",
      "body": "Comment on file 2",
      "side": "RIGHT",
      "line": 30
    }
  ]
}
EOF
```

**Event Types**:

| Event | Description |
|-------|-------------|
| COMMENT | General feedback without approval |
| APPROVE | Approve PR |
| REQUEST_CHANGES | Block merge until fixed |

## Common Issues

### "user_id can only have one pending review"

**Cause**: Existing pending (unsubmitted) review.

**Solution 1**: Submit pending review
```bash
gh api repos/{owner}/{repo}/pulls/{pr}/reviews | jq '.[] | select(.state=="PENDING")'
```

**Solution 2**: Use single comment endpoint instead of reviews.

### Array syntax not working

**Problem**: `--raw-field 'comments[0][path]=...'` creates object, not array.

**Solution**: Use JSON input via heredoc.

### Invalid line number

**Error**: "line must be part of the diff"

**Solutions**:
- Verify file was changed in PR
- Check "Files changed" tab for actual line numbers
- Use latest commit_id

### Wrong commit_id

**Error**: "commit_sha is not part of the pull request"

**Solution**:
```bash
gh api repos/{owner}/{repo}/pulls/{pr} --jq '.head.sha'
```

## Best Practices

1. **Get PR info first**:
   ```bash
   gh pr view {pr} --json headRefOid,files
   gh api repos/{owner}/{repo}/pulls/{pr}/files --jq '.[] | {filename, additions, deletions}'
   ```

2. **Check for pending reviews**:
   ```bash
   gh api repos/{owner}/{repo}/pulls/{pr}/reviews \
     --jq '.[] | select(.state=="PENDING" and .user.login=="YOUR_USERNAME")'
   ```

3. **Use meaningful comments**: Be specific, suggest alternatives, use code blocks.

4. **Batch related comments**: Use reviews endpoint to group comments.

5. **Choose right event type**:
   - Feedback: COMMENT
   - Approving: APPROVE
   - Blocking: REQUEST_CHANGES

## Example Scripts

### Quick Single Comment

```bash
OWNER="org" REPO="repo" PR=4
COMMIT=$(gh api repos/$OWNER/$REPO/pulls/$PR --jq '.head.sha')

gh api repos/$OWNER/$REPO/pulls/$PR/comments \
  -f body='Consider extracting into separate function' \
  -f commit_id="$COMMIT" \
  -f path='src/utils/validation.ts' \
  -F line=45 \
  -f side='RIGHT'
```

### Multi-Line Comment

```bash
gh api repos/$OWNER/$REPO/pulls/$PR/comments \
  -f body='This block could be simplified' \
  -f commit_id="$COMMIT" \
  -f path='src/utils/parser.ts' \
  -F start_line=10 \
  -f start_side='RIGHT' \
  -F line=15 \
  -f side='RIGHT'
```

## API Reference

### POST /repos/{owner}/{repo}/pulls/{pr}/comments

Creates single review comment on specific line.

### POST /repos/{owner}/{repo}/pulls/{pr}/reviews

Creates review with optional line-specific comments.

**Comment Object**:
- path (string, required)
- body (string, required)
- line (integer, required)
- side (string, required)
- start_line (integer, optional)
- start_side (string, optional)

## Related

- [GitHub API: Pull Request Comments](https://docs.github.com/rest/pulls/comments)
- [GitHub API: Pull Request Reviews](https://docs.github.com/rest/pulls/reviews)
- [GitHub CLI Manual](https://cli.github.com/manual/)
