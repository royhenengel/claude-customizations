#!/usr/bin/env node
/**
 * detect-issue.js - Shared detection logic for auto-trigger /fix hooks
 *
 * Analyzes user messages and tool outputs for issue patterns.
 * Returns detection result with reason and source.
 *
 * Usage:
 *   node detect-issue.js --user-message "This function is broken"
 *   node detect-issue.js --tool-output '{"exitCode": 1, "output": "Error: ..."}'
 *   node detect-issue.js --check-build-stage
 */

const fs = require('fs');
const path = require('path');

// === TRIGGER PATTERNS ===

const TRIGGER_PATTERNS = {
  // Error keywords (single words that strongly indicate issues)
  errorKeywords: [
    /\berror\b/i,
    /\bbug\b/i,
    /\bbroken\b/i,
    /\bfailing\b/i,
    /\bcrash(es|ed|ing)?\b/i,
    /\bexception\b/i,
  ],

  // Problem phrases (multi-word patterns)
  problemPhrases: [
    /doesn'?t work/i,
    /not working/i,
    /stopped working/i,
    /can'?t get it to/i,
    /won'?t (start|run|compile|build)/i,
    /keeps (failing|crashing)/i,
  ],

  // Fix requests (explicit requests for help)
  fixRequests: [
    /fix (this|it|the)/i,
    /debug (this|it|the)/i,
    /what'?s wrong (with|here)/i,
    /why (is|does|did) (this|it)/i,
    /help me (fix|debug|solve)/i,
  ],

  // Symptoms (technical error indicators)
  symptoms: [
    /returns? null/i,
    /\bthrows?\b/i,
    /\bundefined\b/i,
    /\b500\b/i,
    /\b404\b/i,
    /\btimeout\b/i,
    /stack ?trace/i,
  ],
};

// === EXCLUSION PATTERNS ===

const EXCLUSION_PATTERNS = {
  // Conceptual discussions
  conceptual: [
    /what is (a |an )?(bug|error)/i,
    /how do (errors|bugs|exceptions) work/i,
    /explain (errors|bugs|exceptions)/i,
    /tell me about (errors|bugs)/i,
  ],

  // Future tense / hypothetical
  futureTense: [
    /might (break|cause|fail)/i,
    /could (break|cause|fail)/i,
    /potential (issue|problem|bug)/i,
    /would (break|fail)/i,
    /if (it|this) (breaks|fails)/i,
  ],

  // General questions about concepts
  questionsAbout: [
    /what causes/i,
    /why do (bugs|errors) happen/i,
    /how to prevent/i,
    /best practices? for/i,
  ],
};

// === TOOL ERROR PATTERNS ===

const TOOL_ERROR_PATTERNS = {
  // Stack traces
  stackTraces: [
    /at line \d+/i,
    /Traceback/,
    /^Error:/m,
    /^\s+at\s+/m,
    /Exception in thread/i,
  ],

  // Build failures
  buildFailures: [
    /\bFAILED\b/,
    /error:/i,
    /compilation (error|failed)/i,
    /build failed/i,
    /cannot find (module|symbol)/i,
    /undefined reference/i,
    /syntax error/i,
  ],
};

// === DETECTION FUNCTIONS ===

/**
 * Check if currently in build stage (should skip detection)
 * @returns {boolean}
 */
function isInBuildStage() {
  const stateFilePaths = [
    path.join(process.cwd(), 'planning', 'STATE.md'),
    path.join(process.env.HOME || '', '.claude', 'planning', 'STATE.md'),
    path.join(process.env.HOME || '', 'worktrees', 'claude-customizations', 'auto-trigger-fix', 'planning', 'STATE.md'),
  ];

  for (const statePath of stateFilePaths) {
    try {
      const content = fs.readFileSync(statePath, 'utf8');
      if (/Stage:\s*building/i.test(content)) {
        return true;
      }
    } catch {
      // File doesn't exist or can't be read, continue to next
    }
  }

  return false;
}

/**
 * Check if text matches any pattern in a category
 * @param {string} text
 * @param {RegExp[]} patterns
 * @returns {RegExp|null} - The matching pattern or null
 */
function matchesAny(text, patterns) {
  for (const pattern of patterns) {
    if (pattern.test(text)) {
      return pattern;
    }
  }
  return null;
}

/**
 * Detect issues in user message
 * @param {string} message
 * @returns {{ detected: boolean, reason: string, source: string }}
 */
function detectInUserMessage(message) {
  const source = 'UserPromptSubmit';

  // Check exclusions first
  for (const [category, patterns] of Object.entries(EXCLUSION_PATTERNS)) {
    const match = matchesAny(message, patterns);
    if (match) {
      return {
        detected: false,
        reason: `Excluded: ${category} pattern matched`,
        source,
      };
    }
  }

  // Check trigger patterns
  for (const [category, patterns] of Object.entries(TRIGGER_PATTERNS)) {
    const match = matchesAny(message, patterns);
    if (match) {
      return {
        detected: true,
        reason: `Trigger: ${category} - "${match.source}"`,
        source,
      };
    }
  }

  return {
    detected: false,
    reason: 'No issue patterns detected',
    source,
  };
}

/**
 * Detect issues in tool output
 * @param {{ exitCode?: number, output?: string, toolName?: string }} toolResult
 * @returns {{ detected: boolean, reason: string, source: string }}
 */
function detectInToolOutput(toolResult) {
  const source = 'PostToolUse';
  const { exitCode, output = '', toolName = 'unknown' } = toolResult;

  // Non-zero exit code is a strong signal
  if (exitCode !== undefined && exitCode !== 0) {
    return {
      detected: true,
      reason: `Non-zero exit code: ${exitCode}`,
      source,
    };
  }

  // Check output for error patterns
  for (const [category, patterns] of Object.entries(TOOL_ERROR_PATTERNS)) {
    const match = matchesAny(output, patterns);
    if (match) {
      return {
        detected: true,
        reason: `Tool error: ${category} - "${match.source}"`,
        source,
      };
    }
  }

  return {
    detected: false,
    reason: 'No error patterns in tool output',
    source,
  };
}

// === CLI INTERFACE ===

function printUsage() {
  console.log(`Usage:
  node detect-issue.js --user-message "message text"
  node detect-issue.js --tool-output '{"exitCode": 1, "output": "..."}'
  node detect-issue.js --check-build-stage

Options:
  --user-message    Analyze user message for issue patterns
  --tool-output     Analyze tool output (JSON with exitCode and output)
  --check-build-stage  Check if currently in build stage

Output:
  JSON object: { detected: boolean, reason: string, source: string }`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  // Check build stage
  if (args.includes('--check-build-stage')) {
    const inBuild = isInBuildStage();
    console.log(JSON.stringify({ inBuildStage: inBuild }));
    process.exit(0);
  }

  // User message detection
  const userMsgIndex = args.indexOf('--user-message');
  if (userMsgIndex !== -1) {
    const message = args[userMsgIndex + 1];
    if (!message) {
      console.error('Error: --user-message requires a message argument');
      process.exit(1);
    }

    // Skip if in build stage
    if (isInBuildStage()) {
      console.log(JSON.stringify({
        detected: false,
        reason: 'Skipped: currently in build stage',
        source: 'UserPromptSubmit',
      }));
      process.exit(0);
    }

    const result = detectInUserMessage(message);
    console.log(JSON.stringify(result));
    process.exit(0);
  }

  // Tool output detection
  const toolOutputIndex = args.indexOf('--tool-output');
  if (toolOutputIndex !== -1) {
    const toolOutputArg = args[toolOutputIndex + 1];
    if (!toolOutputArg) {
      console.error('Error: --tool-output requires a JSON argument');
      process.exit(1);
    }

    let toolResult;
    try {
      toolResult = JSON.parse(toolOutputArg);
    } catch (e) {
      console.error('Error: --tool-output must be valid JSON');
      process.exit(1);
    }

    // Skip if in build stage
    if (isInBuildStage()) {
      console.log(JSON.stringify({
        detected: false,
        reason: 'Skipped: currently in build stage',
        source: 'PostToolUse',
      }));
      process.exit(0);
    }

    const result = detectInToolOutput(toolResult);
    console.log(JSON.stringify(result));
    process.exit(0);
  }

  console.error('Error: No valid option provided');
  printUsage();
  process.exit(1);
}

// Export functions for use as module
module.exports = {
  detectInUserMessage,
  detectInToolOutput,
  isInBuildStage,
  TRIGGER_PATTERNS,
  EXCLUSION_PATTERNS,
  TOOL_ERROR_PATTERNS,
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
