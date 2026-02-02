#!/bin/bash
# Toggle between main and auto-trigger-fix hook configurations
# Usage: ./toggle-hooks.sh [main|worktree|status]

MAIN_HOOKS="$HOME/Projects/Claude Code/claude-customizations/.claude/hooks.json"
WORKTREE_HOOKS="$HOME/worktrees/claude-customizations/auto-trigger-fix/.claude/hooks.json"
ACTIVE_HOOKS="$HOME/.claude/hooks.json"

show_status() {
  if grep -q "issue-detector" "$ACTIVE_HOOKS" 2>/dev/null; then
    echo "Active: worktree (auto-trigger-fix hooks enabled)"
  else
    echo "Active: main (auto-trigger-fix hooks disabled)"
  fi
}

case "${1:-status}" in
  main)
    cp "$MAIN_HOOKS" "$ACTIVE_HOOKS"
    echo "Switched to main hooks (auto-trigger-fix disabled)"
    echo "Restart Claude Code to apply changes."
    ;;
  worktree)
    cp "$WORKTREE_HOOKS" "$ACTIVE_HOOKS"
    echo "Switched to worktree hooks (auto-trigger-fix enabled)"
    echo "Restart Claude Code to apply changes."
    ;;
  status)
    show_status
    ;;
  *)
    echo "Usage: $0 [main|worktree|status]"
    echo "  main     - Use main branch hooks (no auto-trigger-fix)"
    echo "  worktree - Use worktree hooks (auto-trigger-fix enabled)"
    echo "  status   - Show which config is active"
    exit 1
    ;;
esac
