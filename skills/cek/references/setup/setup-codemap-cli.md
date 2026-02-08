# Setup Codemap CLI

Guide for setting up Codemap CLI for intelligent codebase visualization and navigation.

## Usage

`/setup-codemap-cli [optional: OS type or config preferences]`

## Step 1: Determine Setup Context

Ask user where to store configuration:

**Options:**

1. **Project level (shared via git)**
   - CLAUDE.md: `./CLAUDE.md`
   - Hook settings: `./.claude/settings.json`

2. **Project level (personal)**
   - CLAUDE.md: `./CLAUDE.local.md`
   - Hook settings: `./.claude/settings.local.json`
   - Verify in `.gitignore`

3. **User level (global)**
   - CLAUDE.md: `~/.claude/CLAUDE.md`
   - Hook settings: `~/.claude/settings.json`

## Step 2: Check Installation

```bash
codemap --version
codemap --help
```

If not installed, proceed with setup.

## Step 3: Load Documentation

Read <https://raw.githubusercontent.com/JordanCoin/codemap/refs/heads/main/README.md>

## Step 4: Install

### macOS/Linux (Homebrew)
```bash
brew tap JordanCoin/tap && brew install codemap
```

### Windows (Scoop)
```bash
scoop bucket add codemap https://github.com/JordanCoin/scoop-codemap
scoop install codemap
```

## Step 5: Verify

```bash
codemap --version
codemap .
```

## Step 6: Update CLAUDE.md

Add to appropriate CLAUDE.md:

```markdown
## Use Codemap CLI for Codebase Navigation

Codemap CLI is available for intelligent codebase visualization and navigation.

**Required Usage** - You MUST use `codemap --diff --ref master` to research changes different from default branch, and `git diff` + `git status` to research current working state.

### Quick Start

```bash
codemap .                    # Project tree
codemap --only swift .       # Just Swift files
codemap --exclude .xcassets,Fonts,.png .  # Hide assets
codemap --depth 2 .          # Limit depth
codemap --diff               # What changed vs main
codemap --deps .             # Dependency flow
```

### Options

| Flag | Description |
|------|-------------|
| `--depth, -d <n>` | Limit tree depth |
| `--only <exts>` | Only show extensions |
| `--exclude <patterns>` | Exclude patterns |
| `--diff` | Show changed files |
| `--ref <branch>` | Branch to compare |
| `--deps` | Dependency flow mode |
| `--importers <file>` | Check who imports |
| `--skyline` | City skyline visualization |
| `--json` | Output JSON |
```

**Note:** If default branch is `master` (not `main`), update commands accordingly.

## Step 7: Update .gitignore

Add:
```
.codemap/
```

## Step 8: Test

```bash
codemap .
codemap --diff
```

## Step 9: Add Hooks

Add to settings file:

```json
{
  "hooks": {
    "session-start": "codemap hook session-start && echo 'git diff:' && git diff --stat && echo 'git status:' && git status"
  }
}
```

### Available Hooks

| Command | Trigger | Description |
|---------|---------|-------------|
| `codemap hook session-start` | SessionStart | Full tree, hubs, branch diff |
| `codemap hook pre-edit` | PreToolUse (Edit/Write) | Who imports file |
| `codemap hook post-edit` | PostToolUse (Edit/Write) | Impact of changes |
| `codemap hook prompt-submit` | UserPromptSubmit | Hub context |
| `codemap hook pre-compact` | PreCompact | Save hub state |
| `codemap hook session-stop` | SessionEnd | Edit timeline |

Ask user which hooks to add.

### Full Hooks Example

```json
{
  "hooks": {
    "SessionStart": [{"hooks": [{"type": "command", "command": "codemap hook session-start"}]}],
    "PreToolUse": [{"matcher": "Edit|Write", "hooks": [{"type": "command", "command": "codemap hook pre-edit"}]}],
    "PostToolUse": [{"matcher": "Edit|Write", "hooks": [{"type": "command", "command": "codemap hook post-edit"}]}],
    "UserPromptSubmit": [{"hooks": [{"type": "command", "command": "codemap hook prompt-submit"}]}],
    "PreCompact": [{"hooks": [{"type": "command", "command": "codemap hook pre-compact"}]}],
    "SessionEnd": [{"hooks": [{"type": "command", "command": "codemap hook session-stop"}]}]
  }
}
```
