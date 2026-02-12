# Compound Workflow Integration Discovery

## Context

Backlog item: "Clarify /compound and integrate into workflow." /compound skill exists but has zero documented solutions. No integration points in /fix or /build.

## Initial Research Findings

- /compound skill exists at `skills/Learning/compound/SKILL.md` (189 lines, ported from compound-engineering plugin)
- Solutions directory at `planning/solutions/INDEX.md` with zero solutions
- memory-boundaries.md already defines /compound's role in the 4-system knowledge hierarchy
- Archived command at `archive/commands/compound.md` references stale `docs/solutions/` path
- /fix has no solution search and no compound integration
- /build has no compound integration

## Clarifications

### Why has /compound never been used?

Root cause: no trigger points. Nothing in /fix or /build mentions or invokes /compound. The skill only activates on explicit manual invocation, which never happens organically.

### Is the 3-agent extraction overengineered?

Initial assessment said yes. On review: the 3 agents run in parallel (not sequentially), each with a focused extraction task. The pattern may produce higher-quality structured output than single-pass. No evidence that the 3-agent pattern creates friction since the skill has never been invoked. The reason for zero usage is missing trigger points, not skill complexity.

Decision: **Keep the 3-agent extraction pattern.** The skill's internal architecture isn't the problem to solve.

### Should integration be offer-based or automated?

Initial plan proposed offer-based ("Document this solution? yes/no"). User feedback: offers are easy to decline repeatedly, leading back to zero usage.

Options explored:

- **Offered**: User controls signal-to-noise. Risk: easy to always decline, zero capture.

- **Fully automated**: Guarantees capture, zero friction. Risk: documents trivial fixes, noise.

- **Hybrid (auto-draft, review later)**: Captures everything automatically, user curates. Mirrors how claude-mem works.

Decision: **Hybrid approach.** Auto-capture ensures solutions accumulate. User review prevents noise.

### What about categories?

Initial plan proposed making categories "flexible." This was vague. The generic categories in INDEX.md are fine as-is. No changes needed. Categories are a formatting detail, not a design decision.

Decision: **No changes to categories.**

### What belongs in DISCOVERY.md?

Discovery captures any feedback and clarification that facilitated creating the plan, not just brainstorming. Includes back-and-forth discussion, user corrections, scope refinements, and design pivots.

## Scope Refinements

From initial plan to revised plan:

| Aspect | Initial | Revised | Reason |
|--------|---------|---------|--------|
| Integration model | Offer-based | Hybrid (auto-capture + review) | Offers are easy to ignore |
| Skill simplification | Remove 3 agents | Keep as-is | Agents aren't the problem |
| Category changes | Make flexible | No changes | Categories are fine |
| INDEX.md cleanup | Simplify | No changes needed | Was a solution looking for a problem |
