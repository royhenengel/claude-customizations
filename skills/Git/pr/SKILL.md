---
name: pr
description: Create a pull request with smart analysis
---

Create a well-crafted pull request for the current branch.

## Process

1. **Analyze branch state:**
   ```bash
   git status
   git branch --show-current
   git log --oneline origin/main..HEAD 2>/dev/null || git log --oneline origin/master..HEAD
   git diff origin/main..HEAD --stat 2>/dev/null || git diff origin/master..HEAD --stat
   ```

2. **Check for planning context:**
   ```bash
   cat .planning/OVERVIEW.md 2>/dev/null
   cat .planning/ROADMAP.md 2>/dev/null
   # Find relevant summaries
   find .planning/stages -name "*-SUMMARY.md" -newer $(git merge-base origin/main HEAD) 2>/dev/null
   ```

3. **Ensure branch is pushed:**
   ```bash
   git push -u origin $(git branch --show-current) 2>/dev/null || echo "Branch already pushed"
   ```

4. **Generate PR content:**

## PR Template

```markdown
## Summary

[2-4 bullet points describing what this PR does]

## Changes

### [Category 1]
- Change description
- Change description

### [Category 2]
- Change description

## Testing

- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] [Specific test case]

## Screenshots

[If UI changes, note where screenshots should go]

## Notes

[Any reviewer notes, deployment considerations, or follow-up items]

---
Generated with Claude Code
```

5. **Create PR:**
   ```bash
   gh pr create --title "[type]: [description]" --body "$(cat <<'EOF'
   [generated body]
   EOF
   )"
   ```

## Title Format

Use conventional commit style:
- `feat: add user authentication`
- `fix: resolve race condition in data fetch`
- `refactor: extract common validation logic`
- `docs: update API documentation`

## Smart Analysis

When generating summary:

1. **Group commits by type**: Features, fixes, refactors, etc.
2. **Identify key changes**: What's the main purpose?
3. **Note breaking changes**: Highlight if any
4. **Link to context**: Reference planning docs if available

## Draft vs Ready

Ask user:
```
PR ready for review, or create as draft?
1. Ready for review
2. Draft (work in progress)
```

If draft: `gh pr create --draft ...`

## After Creation

```
PR created: [URL]

Title: [title]
Base: main ← [branch]
Status: [ready/draft]

Next steps:
- Review PR in browser
- Request reviewers if needed
- Monitor CI checks
```

## Safety

- NEVER force push without explicit request
- Warn if PR is very large (>500 lines changed)
- Warn if base branch has conflicts
- Note if CI is likely to fail based on local test results
