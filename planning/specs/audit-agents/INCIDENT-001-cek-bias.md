# Incident Report: CEK Bias in Agent Comparison

**ID**: INCIDENT-001
**Date**: 2026-02-05
**Severity**: High
**Status**: Open
**Feature**: audit-agents

---

## Summary

Agent comparison analysis (Task 5a) produced biased recommendations favoring CEK agents without proper justification. Analysis was also incomplete, covering only 6 of potentially 15+ overlapping agent groups.

---

## Impact

1. **Invocation rules based on flawed analysis**: agent-invocation-rules.md routes to CEK agents by default without evidence they're actually better
2. **build.md integration affected**: Step 5 and Step 9 now use CEK agents based on unjustified assumptions
3. **Other sources ignored**: GSD, Everything Claude, and other imported agent sources weren't evaluated
4. **Incomplete overlap coverage**: Only 6 groups analyzed when 15+ groups have overlapping agents

---

## Root Cause Analysis

### 1. Task framing bias
The task prompt for 5a included:
- Pre-selected groups that happened to have CEK agents
- Language suggesting CEK agents have "structured outputs" without comparative evidence
- No explicit instruction to compare against non-CEK alternatives fairly

### 2. Confirmation bias in subagent execution
The subagent:
- Assumed CEK agents were better based on naming ("cek-" prefix implies toolkit)
- Didn't read and compare actual content of competing agents side-by-side
- Listed CEK features as advantages without checking if non-CEK agents had similar features

### 3. Incomplete scope definition
Groups analyzed (6):
- Developers, Code Reviewers, Architects, Security, Bug Hunters, Researchers

Groups NOT analyzed (9+):
- Tech writers (5 agents): tech-writer, cek-tech-writer, technical-writer, documentation-engineer, api-documenter
- PowerShell (5 agents): powershell-5.1-expert, powershell-7-expert, powershell-module-architect, powershell-security-hardening, powershell-ui-architect
- .NET (3 agents): dotnet-core-expert, dotnet-framework-4.8-expert, csharp-developer
- Data roles (4 agents): data-analyst, data-scientist, data-engineer, data-researcher
- Project/Product (3 agents): project-manager, product-manager, scrum-master
- Test/QA (3 agents): test-automator, qa-expert, test-coverage-reviewer
- Infrastructure (multiple): cloud-architect, azure-infra-engineer, kubernetes-specialist, etc.
- Others not inventoried

### 4. No source tracking
Agent files don't consistently document their source (CEK, GSD, Everything Claude, custom, etc.), making fair comparison difficult.

---

## Evidence

### Claimed CEK advantages (from agent-comparison.md):
> "CEK agents are generally preferred because they provide binary pass/fail checklists, AC-driven workflows, structured output formats"

### Reality check needed:
- Do non-CEK agents also have checklists? Unknown - not compared
- Are CEK outputs actually more structured? Unknown - not measured
- Which source has better prompt engineering? Unknown - not evaluated

### Missing comparisons:
- code-reviewer vs cek-code-quality-reviewer: Marked cek as better without reading code-reviewer.md
- security-auditor vs cek-security-auditor: Marked cek as better without side-by-side comparison
- researcher vs cek-researcher: Assumed distinction without verification

---

## Affected Artifacts

| File | Status | Issue |
|------|--------|-------|
| planning/specs/audit-agents/agent-comparison.md | Biased | CEK preference without evidence |
| skills/my-workflow/docs/agent-invocation-rules.md | Compromised | Routes to CEK agents based on flawed comparison |
| skills/my-workflow/workflows/build.md | Affected | Step 5 and Step 9 use potentially wrong agents |
| planning/specs/audit-agents/agents-categorization.md | Incomplete | No source column for agent origin tracking |

---

## Remediation Options

### Option A: Redo comparison properly (Recommended)
1. Add source column to agents-categorization.md
2. Identify ALL overlapping groups (not just 6)
3. For each overlap, read both/all agent files side-by-side
4. Compare on objective criteria:
   - Prompt clarity
   - Output structure specification
   - Workflow integration
   - Completeness of guidance
5. Document comparison with evidence (quotes from files)
6. Update invocation rules based on evidence

### Option B: Spot-check and validate
1. Pick 3-4 pairs where CEK was chosen
2. Actually read both files
3. Validate or invalidate CEK preference
4. If invalidated, trigger Option A

### Option C: Accept with caveat
1. Note in documentation that CEK preference is assumed, not proven
2. Add to backlog for future audit
3. Proceed with current choices

---

## Lessons Learned

1. **Explicit comparison instructions**: Task prompts for comparison work must require side-by-side content analysis, not pattern matching on names
2. **Source tracking**: Agent files should document their origin
3. **Scope verification**: Before executing comparison tasks, verify the scope covers all relevant items
4. **Evidence requirements**: Comparison recommendations must include quotes/evidence from compared files

---

## Next Steps

1. Add to BACKLOG.md for remediation
2. Pause Task 8 checkpoint approval until decision on remediation
3. Consider whether to proceed with build.md changes or revert pending proper analysis

---

## Related

- Task 5a: Compare overlapping agents by source and capability
- Task 5b: Update invocation rules with justified selections
- Gap Protocol: This incident should inform future Gap Protocol additions
