# Commit

Create well-formatted commits with conventional commit messages and emoji.

## Usage

```
/commit
/commit --no-verify
```

## What It Does

1. Unless `--no-verify`, runs pre-commit checks (lint, build)
2. Checks staged files with `git status`
3. If 0 files staged, adds all modified and new files
4. Performs `git diff` to understand changes
5. Analyzes if multiple distinct logical changes present
6. If multiple changes detected, suggests splitting commits
7. Creates commit message with emoji conventional format

## Conventional Commit Format

`<emoji> <type>: <description>`

Types and emojis:
- ✨ `feat`: New feature
- 🐛 `fix`: Bug fix
- 📝 `docs`: Documentation
- 💄 `style`: Formatting/style
- ♻️ `refactor`: Code refactoring
- ⚡️ `perf`: Performance
- ✅ `test`: Tests
- 🔧 `chore`: Tooling, configuration
- 🚀 `ci`: CI/CD improvements
- 🗑️ `revert`: Reverting changes

Additional emojis:
- 🚨 Fix compiler/linter warnings
- 🔒️ Fix security issues
- 🏗️ Architectural changes
- 🏷️ Add/update types
- 👔 Business logic
- 🩹 Simple non-critical fix
- 🚑️ Critical hotfix
- 🔥 Remove code/files
- 💚 Fix CI build

## Guidelines for Splitting

Consider splitting based on:
1. **Different concerns**: Unrelated parts of codebase
2. **Different types**: Mixing features, fixes, refactoring
3. **File patterns**: Source vs documentation
4. **Logical grouping**: Easier to understand separately
5. **Size**: Large changes clearer when broken down

## Best Practices

- Verify before committing (lint, build, docs)
- Atomic commits: each serves single purpose
- Present tense, imperative mood ("add feature" not "added")
- First line under 72 characters

## Examples

Good commit messages:
- ✨ feat: add user authentication system
- 🐛 fix: resolve memory leak in rendering
- 📝 docs: update API documentation
- ♻️ refactor: simplify error handling logic

Splitting example:
- First: ✨ feat: add new type definitions
- Second: 📝 docs: update documentation
- Third: 🔧 chore: update dependencies
- Fourth: ✅ test: add unit tests

## Options

- `--no-verify`: Skip pre-commit checks
