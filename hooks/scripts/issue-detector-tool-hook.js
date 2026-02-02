#!/usr/bin/env node
/**
 * issue-detector-tool-hook.js - PostToolUse hook for detecting errors in tool output
 *
 * This hook fires after Bash tool execution to detect errors.
 * If an error is detected, it injects a prompt asking to run /fix.
 *
 * Input (via stdin): JSON from Claude Code PostToolUse event
 *   - tool_name: Name of the tool (e.g., "Bash")
 *   - tool_input: The tool input (e.g., command string for Bash)
 *   - tool_response: The tool response (output, may include exit code info)
 *
 * Output (to stdout): JSON response
 *   - On error detected: { hookSpecificOutput: { hookEventName, additionalContext } }
 *   - On no error: { continue: true, suppressOutput: true }
 */

const { detectInToolOutput, isInBuildStage } = require('./detect-issue.js');

/**
 * Read JSON from stdin
 * @returns {Promise<unknown>}
 */
async function readJsonFromStdin() {
  return new Promise((resolve, reject) => {
    let input = '';
    process.stdin.on('data', (chunk) => (input += chunk));
    process.stdin.on('end', () => {
      try {
        resolve(input.trim() ? JSON.parse(input) : undefined);
      } catch (e) {
        reject(new Error(`Failed to parse hook input: ${e}`));
      }
    });
  });
}

/**
 * Extract exit code from tool response
 * Claude Code's Bash tool may include exit code in various formats
 * @param {unknown} toolResponse
 * @returns {number|undefined}
 */
function extractExitCode(toolResponse) {
  if (toolResponse === null || toolResponse === undefined) {
    return undefined;
  }

  // If toolResponse is an object with exitCode property
  if (typeof toolResponse === 'object' && 'exitCode' in toolResponse) {
    return toolResponse.exitCode;
  }

  // If toolResponse is an object with exit_code property
  if (typeof toolResponse === 'object' && 'exit_code' in toolResponse) {
    return toolResponse.exit_code;
  }

  // If toolResponse is a string, look for exit code patterns
  if (typeof toolResponse === 'string') {
    // Pattern: "exit code: N" or "Exit code: N" or "exit_code: N"
    const exitCodeMatch = toolResponse.match(/exit[_\s]?code[:\s]+(\d+)/i);
    if (exitCodeMatch) {
      return parseInt(exitCodeMatch[1], 10);
    }
  }

  return undefined;
}

/**
 * Extract output string from tool response
 * @param {unknown} toolResponse
 * @returns {string}
 */
function extractOutput(toolResponse) {
  if (toolResponse === null || toolResponse === undefined) {
    return '';
  }

  // If toolResponse is a string
  if (typeof toolResponse === 'string') {
    return toolResponse;
  }

  // If toolResponse is an object with output/stdout/stderr properties
  if (typeof toolResponse === 'object') {
    const parts = [];
    if ('output' in toolResponse && toolResponse.output) {
      parts.push(String(toolResponse.output));
    }
    if ('stdout' in toolResponse && toolResponse.stdout) {
      parts.push(String(toolResponse.stdout));
    }
    if ('stderr' in toolResponse && toolResponse.stderr) {
      parts.push(String(toolResponse.stderr));
    }
    if (parts.length > 0) {
      return parts.join('\n');
    }
    // Fallback: stringify the object
    return JSON.stringify(toolResponse);
  }

  return String(toolResponse);
}

/**
 * Truncate output for display in prompt
 * @param {string} output
 * @param {number} maxLength
 * @returns {string}
 */
function truncateOutput(output, maxLength = 500) {
  if (output.length <= maxLength) {
    return output;
  }
  return output.slice(0, maxLength) + '\n... (truncated)';
}

/**
 * Main hook function
 */
async function main() {
  try {
    // Skip if in build stage
    if (isInBuildStage()) {
      console.log(JSON.stringify({ continue: true, suppressOutput: true }));
      process.exit(0);
    }

    // Read input from stdin
    const input = await readJsonFromStdin();

    if (!input) {
      // No input, continue normally
      console.log(JSON.stringify({ continue: true, suppressOutput: true }));
      process.exit(0);
    }

    const { tool_name: toolName, tool_input: toolInput, tool_response: toolResponse } = input;

    // Extract data for detection
    const exitCode = extractExitCode(toolResponse);
    const output = extractOutput(toolResponse);

    // Run detection
    const result = detectInToolOutput({
      exitCode,
      output,
      toolName: toolName || 'Bash',
    });

    if (result.detected) {
      // Error detected - inject prompt to suggest /fix
      const commandSnippet =
        typeof toolInput === 'string' ? toolInput : JSON.stringify(toolInput);
      const outputSnippet = truncateOutput(output);

      const additionalContext = `[AUTO-TRIGGER-FIX] Error detected in tool output.

This looks like an issue. Offer to run /fix.

If user confirms, invoke the /fix skill with context:
- Tool: ${toolName || 'Bash'}
- Command: ${commandSnippet}
- Error output:
\`\`\`
${outputSnippet}
\`\`\`
- Detection reason: ${result.reason}
- Detection source: ${result.source}`;

      console.log(JSON.stringify({ additionalContext }));
    } else {
      // No error detected - continue normally
      console.log(JSON.stringify({ continue: true, suppressOutput: true }));
    }

    process.exit(0);
  } catch (error) {
    // On error, log to stderr and continue
    console.error(`issue-detector-tool-hook error: ${error}`);
    console.log(JSON.stringify({ continue: true, suppressOutput: true }));
    process.exit(0);
  }
}

main();
