#!/usr/bin/env node
/**
 * Auto-commit claude-mem context injections
 *
 * Detects CLAUDE.md files with <claude-mem-context> tags that have been modified
 * and silently commits and pushes them to keep the working directory clean.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get working directory from environment or use current
const workingDir = process.env.CLAUDE_WORKING_DIRECTORY || process.cwd();

function run(cmd, options = {}) {
  try {
    const result = execSync(cmd, {
      cwd: workingDir,
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : ['pipe', 'pipe', 'pipe'],
      ...options
    });
    // Only trim trailing whitespace, preserve leading spaces (important for git porcelain)
    return options.preserveLeading ? result.trimEnd() : result.trim();
  } catch (e) {
    if (options.ignoreError) return '';
    throw e;
  }
}

function isGitRepo() {
  try {
    run('git rev-parse --git-dir', { silent: true });
    return true;
  } catch {
    return false;
  }
}

function getModifiedClaudeMdFiles() {
  // Get list of modified CLAUDE.md files (staged or unstaged)
  // Porcelain format: XY filename where X=staged, Y=unstaged
  // M  = staged modification
  //  M = unstaged modification
  // MM = both staged and unstaged
  const status = run('git status --porcelain', { ignoreError: true, preserveLeading: true });
  if (!status) return [];

  return status
    .split('\n')
    .filter(line => line.includes('CLAUDE.md'))
    .filter(line => {
      const xy = line.substring(0, 2);
      return xy.includes('M'); // Any modification (staged or unstaged)
    })
    .map(line => line.substring(3).trim());
}

function hasClaudeMemContext(filePath) {
  try {
    const fullPath = path.join(workingDir, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    return content.includes('<claude-mem-context>');
  } catch {
    return false;
  }
}

function main() {
  // Skip if not a git repo
  if (!isGitRepo()) {
    process.exit(0);
  }

  // Find modified CLAUDE.md files with claude-mem context
  const modifiedFiles = getModifiedClaudeMdFiles();
  const claudeMemFiles = modifiedFiles.filter(hasClaudeMemContext);

  if (claudeMemFiles.length === 0) {
    process.exit(0);
  }

  // Stage only the claude-mem CLAUDE.md files
  for (const file of claudeMemFiles) {
    run(`git add "${file}"`, { silent: true });
  }

  // Commit with a standard message
  const fileList = claudeMemFiles.join(', ');
  const commitMsg = `chore(claude-mem): auto-commit context injection\n\nFiles: ${fileList}`;

  try {
    run(`git commit -m "${commitMsg}"`, { silent: true });
  } catch (e) {
    // Commit might fail if nothing to commit (race condition)
    process.exit(0);
  }

  // Push silently (don't fail if push fails - might be offline)
  try {
    run('git push', { silent: true, ignoreError: true });
  } catch {
    // Ignore push failures
  }

  process.exit(0);
}

main();
