#!/usr/bin/env node
/**
 * ecosystem-awareness-hook.js - Reminds Claude to consider the full ecosystem
 * (agents, skills, MCP servers) before answering capability/availability questions.
 */

const fs = require('fs');

const debugLog = (msg) => {
  const logPath = '/tmp/ecosystem-awareness-hook-debug.log';
  fs.appendFileSync(logPath, `${new Date().toISOString()} - ${msg}\n`);
};

async function main() {
  let input = '';
  for await (const chunk of process.stdin) {
    input += chunk;
  }

  let hookInput;
  try {
    hookInput = JSON.parse(input);
  } catch (e) {
    process.exit(1);
  }

  const prompt = (hookInput.prompt || '').toLowerCase();

  // Detect capability/availability questions
  const patterns = [
    /(?:what|which|who|how)\s+(?:can|could|should|would)\s+(?:review|help|do|handle|check|audit|test|fix|analyze|build)/,
    /(?:available|options|tools|reviewers|agents)\s+(?:for|to|are|do)/,
    /(?:is there|are there|do we have|do i have)\s+(?:a|an|any)\s+(?:tool|agent|skill|way|option)/,
    /(?:what|which)\s+(?:tools?|agents?|skills?|options?)\s+(?:are|do|can)/,
    /(?:who|what)\s+(?:can|could)\s+(?:i|we)\s+(?:use|ask|get)/,
  ];

  const matched = patterns.some(p => p.test(prompt));

  if (matched) {
    debugLog(`Capability question detected: ${prompt.substring(0, 100)}`);

    const additionalContext = `[ECOSYSTEM-AWARENESS] Capability/availability question detected.

Before answering, inventory the full ecosystem:
1. Agents (132 in agents/) - check for specialized agents matching the need
2. Skills (91 in skills/) - check for relevant skills
3. MCP servers (in mcp/) - check for relevant integrations
4. THEN consider external tools (GitHub, CLI, etc.)

Present ALL relevant options to the user, not just the conventional default.`;

    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext
      }
    }));
  }

  process.exit(0);
}

main().catch(err => {
  debugLog(`Error: ${err.message}`);
  process.exit(1);
});
