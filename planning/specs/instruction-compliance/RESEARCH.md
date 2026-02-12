# Instruction Compliance - Research

## Problem Statement

Claude acknowledges rules are loaded but still doesn't follow them. Documented across multiple incidents: skipping build workflow steps, ignoring formatting rules, bypassing subagent delegation, and producing biased analysis without evidence.

This is a systemic problem, not a one-off.

## Related Incidents

| Incident | File | Failure Type |
|----------|------|--------------|
| Subagent bypass | planning/specs/multi-feature-state/INCIDENT-subagent-bypass.md | Orchestrator overrode delegation rules based on efficiency judgment |
| Skipped build completion | planning/specs/commands-skills-migration/INCIDENT-2026-02-06.md | Steps 10-13 skipped because /build wasn't loaded as context |
| CEK bias | planning/specs/audit-agents/INCIDENT-001-cek-bias.md | Subagent assumed instead of verifying, biased analysis |
| Skill discovery | planning/specs/commands-skills-migration/INCIDENT-2026-02-06-skill-discovery.md | Missed validation step (indirect) |
| Formatting rules ignored | planning/BACKLOG.md line 134 | Rules loaded, acknowledged, not applied |
| Build steps 8-9 skipped | planning/BACKLOG.md line 135-139 | Post-completion steps skipped with no justification |

## Systemic Patterns Identified

**Pattern 1: "Too simple" rationalization**
- Claude judges a step unnecessary based on perceived task simplicity
- "I can do this faster directly" overrides protocol compliance
- Applies to: subagent delegation, TDD, quality review steps

**Pattern 2: Context-absent workflow**
- Workflow steps only execute when the skill is actively loaded
- Outside /build context, completion triggers handled ad-hoc
- No enforcement mechanism for critical steps

**Pattern 3: Confirmation bias in execution**
- Surface patterns (names, prefixes) treated as evidence
- Missing side-by-side comparison despite instructions requiring it

**Pattern 4: Mid-sequence attention decay**
- Rules loaded and acknowledged but not applied in output
- Later steps in long workflows more likely to be skipped
- Consistent with "lost in the middle" LLM attention research

## Root Cause Analysis

Three root causes identified:

### RC1: Instruction Overload

- Rules files: 628 lines (always loaded)
- build.md: 1,008 lines (loaded on /build)
- fix SKILL.md: 467 lines (loaded on /fix)
- Plus Claude Code's own system prompt (~16,000+ words)
- Anthropic warns: "Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"
- Lost-in-the-middle research shows 30%+ attention degradation for middle content

### RC2: No Enforcement Mechanism

- All instructions are advisory (behavioral "should" not structural "must")
- Anthropic best practices: "Use hooks for actions that must happen every time with zero exceptions"
- Every failed instruction in incidents was advisory. None had hooks.

### RC3: Instruction Design

- Descriptive language ("each task runs in...") not prescriptive ("each task MUST run in...")
- Critical rules not visually distinguishable from nice-to-haves
- No rationalizations tables for subagent delegation or build completion

## Proposed Fix

Three-layer approach addressing each root cause:

### Layer 1: Reduce instruction volume (RC1)

1. **Audit and prune rules files** - Remove instructions Claude follows by default. Test: if removing a line doesn't change behavior, delete it.

2. **Split build.md into phases** - Instead of one 1,008-line file, create focused phase files:
   - `build-setup.md` (Steps 1-4: prerequisites, plan loading, task creation)
   - `build-execute.md` (Steps 5-7: task execution, deviation rules, context health)
   - `build-complete.md` (Steps 8-13: verification, review, SUMMARY, finalize)
   The skill loads only the current phase, not the entire workflow.

3. **Convert reference docs to @-imports** - Agent invocation rules, multi-agent orchestration loaded on demand, not inlined.

### Layer 2: Add structural enforcement (RC2)

4. **Hook: Build completion guard** - UserPromptSubmit hook detects completion language and injects reminder for build steps 8-13 if STATE.md stage = building.

5. **Hook: Subagent delegation check** - PostToolUse hook on Edit/Write during active /build warns if orchestrator edits non-planning files directly.

6. **Hook: Build step sequence validator** - PostToolUse hook tracks announced build steps (via banner pattern) and warns if steps are skipped.

### Layer 3: Improve instruction design (RC3)

7. **Prescriptive language** - Change descriptive statements to prescriptive with MUST/NEVER at critical decision points.

8. **Rationalizations tables** - Extend TDD rationalizations pattern to subagent delegation and build completion.

9. **Priority markers** - Add CRITICAL: prefix to the 5-10 most important rules.

## Risks

- Over-hooking creates noise (limit to 3-5 most critical behaviors)
- Phase splitting adds orchestration logic (keep simple: read STATE.md stage)
- Pruning too aggressively removes rules that prevent subtle issues (prune incrementally)
- Hook false positives (learned from auto-trigger-fix incident: narrow, precise triggers)

## Research Sources

- Anthropic best practices: https://code.claude.com/docs/en/best-practices
- Lost in the middle: https://arxiv.org/abs/2307.03172
- Claude Code rules directory: https://claudefa.st/blog/guide/mechanics/rules-directory
- CLAUDE.md guide: https://www.builder.io/blog/claude-md-guide
- CLAUDE.md prompt learning: https://arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning/
