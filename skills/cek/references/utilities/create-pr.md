# Create Pull Request

Create pull requests using GitHub CLI with proper templates and formatting.

## Overview

Guide for creating PRs using `gh` CLI. All PR titles and descriptions in English.

## Prerequisites

1. Install GitHub CLI:
   ```bash
   # macOS
   brew install gh

   # Windows
   winget install --id GitHub.cli
   ```

2. Authenticate:
   ```bash
   gh auth login
   ```

## Creating a PR

1. Prepare description from PR template
2. Create as draft:
   ```bash
   gh pr create --draft \
     --title "✨(scope): Descriptive title" \
     --body "Description" \
     --base main
   ```

For complex descriptions:
```bash
gh pr create --draft \
  --title "✨(scope): Title" \
  --body-file .github/pull_request_template.md \
  --base main
```

## Title Format

Use conventional commit format with emoji:
- Always include appropriate emoji at beginning
- Use actual emoji character (not `:sparkles:`)

Examples:
- `✨(supabase): Add staging remote configuration`
- `🐛(auth): Fix login redirect issue`
- `📝(readme): Update installation instructions`

## Best Practices

1. **Language**: English for titles and descriptions
2. **Template Accuracy**: Follow PR template exactly
3. **Draft PRs**: Start as draft with `--draft`
4. **Convert to ready**: `gh pr ready`

## Common Mistakes

- Using non-English text
- Incorrect section headers
- Adding custom sections not in template
- Using outdated templates
- Missing sections (include all, even if "N/A")

## Additional Commands

```bash
# List your PRs
gh pr list --author "@me"

# Check status
gh pr status

# View specific PR
gh pr view <PR-NUMBER>

# Checkout PR branch
gh pr checkout <PR-NUMBER>

# Convert draft to ready
gh pr ready <PR-NUMBER>

# Add reviewers
gh pr edit <PR-NUMBER> --add-reviewer user1,user2

# Merge
gh pr merge <PR-NUMBER> --squash
```

## Related

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI docs](https://cli.github.com/manual/)
