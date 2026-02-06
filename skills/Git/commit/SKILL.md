---
name: commit
description: Smart conventional commits with analysis
---

Create a well-crafted conventional commit for staged changes.

## Process

1. **Analyze changes:**
   ```bash
   git status
   git diff --cached --stat
   git diff --cached
   git log --oneline -5
   ```

2. **Determine commit type:**
   - `feat`: New feature or capability
   - `fix`: Bug fix
   - `docs`: Documentation only
   - `style`: Formatting, no code change
   - `refactor`: Code restructure, no behavior change
   - `perf`: Performance improvement
   - `test`: Adding or fixing tests
   - `chore`: Build, config, dependencies
   - `ci`: CI/CD changes

3. **Identify scope** (optional):
   - Module or component affected
   - Use kebab-case: `auth`, `api`, `ui-components`

4. **Write commit message:**
   ```
   <type>(<scope>): <description>

   [optional body - what and why, not how]

   [optional footer - breaking changes, issue refs]
   ```

## Rules

- **Subject line**: Max 50 chars, imperative mood, no period
- **Body**: Wrap at 72 chars, explain motivation
- **Breaking changes**: Add "!" after type/scope AND footer note

## Examples

```
feat(auth): add password reset flow

Users can now reset passwords via email link.
Token expires after 24 hours for security.

Closes #123
```

```
fix(api): handle null response in user fetch

The API was throwing when user not found.
Now returns 404 with appropriate error message.
```

```
refactor!: migrate from REST to GraphQL

BREAKING CHANGE: All API endpoints now use GraphQL.
See migration guide in docs/api-migration.md.
```

## Execution

After analysis, present:
```
Proposed commit:
<type>(<scope>): <description>

<body if needed>

Proceed? (yes / edit / abort)
```

If "yes": Execute commit with HEREDOC format:
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<body>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## Safety

- NEVER commit secrets, credentials, or .env files
- NEVER use --force or --amend without explicit request
- NEVER skip hooks (--no-verify) without explicit request
- Warn if committing large binary files
