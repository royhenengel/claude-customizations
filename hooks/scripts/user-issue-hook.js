#!/usr/bin/env node
/**
 * user-issue-hook.js - UserPromptSubmit hook wrapper for issue detection
 */

const fs = require('fs');
const path = require('path');

// Debug log to file
const debugLog = (msg) => {
  const logPath = '/tmp/user-issue-hook-debug.log';
  fs.appendFileSync(logPath, `${new Date().toISOString()} - ${msg}\n`);
};

async function main() {
  debugLog('Hook started');

  // Read JSON input from stdin
  let input = '';
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  debugLog(`Input received: ${input.substring(0, 200)}`);

  let hookInput;
  try {
    hookInput = JSON.parse(input);
  } catch (e) {
    debugLog(`JSON parse error: ${e.message}`);
    process.exit(1);
  }

  const userPrompt = hookInput.prompt || '';
  debugLog(`User prompt: ${userPrompt.substring(0, 100)}`);

  // Import detection module
  let detectInUserMessage, isInBuildStage;
  try {
    const detectModule = require('./detect-issue.js');
    detectInUserMessage = detectModule.detectInUserMessage;
    isInBuildStage = detectModule.isInBuildStage;
    debugLog('Module loaded successfully');
  } catch (e) {
    debugLog(`Module load error: ${e.message}`);
    process.exit(1);
  }

  // Skip if in build stage
  if (isInBuildStage()) {
    debugLog('Skipping: in build stage');
    process.exit(0);
  }

  // Run detection
  const result = detectInUserMessage(userPrompt);
  debugLog(`Detection result: ${JSON.stringify(result)}`);

  if (result.detected) {
    // Truncate and escape the user prompt for the message
    const truncatedPrompt = userPrompt.length > 200
      ? userPrompt.substring(0, 200) + '...'
      : userPrompt;
    const escapedPrompt = truncatedPrompt.replace(/"/g, '\\"').replace(/\n/g, '\\n');

    const additionalContext = `[AUTO-TRIGGER-FIX] Issue detected in user message.

This looks like an issue report. Offer to run /fix.

If user confirms, invoke the /fix skill with context:
- Original message: "${escapedPrompt}"
- Detection reason: ${result.reason}
- Detection source: UserPromptSubmit`;

    // Output JSON with hookSpecificOutput wrapper for Claude Code to inject into context
    const output = JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext
      }
    });
    debugLog(`Outputting: ${output}`);
    console.log(output);
  } else {
    debugLog('No issue detected, no output');
  }

  process.exit(0);
}

main().catch(err => {
  debugLog(`Main error: ${err.message}`);
  process.exit(1);
});
