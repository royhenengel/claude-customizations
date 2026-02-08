# /fix Command Research

## Existing Related Components

### /debug command
- **What it does**: Systematic debugging workflow with hypothesis testing
- **Gap**: Doesn't consult git history, doesn't check project conventions, no convention-change detection
- **Relationship to /fix**: /debug focuses on finding bugs; /fix ensures complete solutions that don't regress

### debugging-practices skill
- **What it does**: Deep analysis mode with evidence gathering, hypothesis testing, verification
- **Gap**: Doesn't search past fixes, doesn't map affected areas systematically, no backlog integration
- **Relationship to /fix**: /fix can leverage debugging-practices thinking but adds project-context awareness

## Approach

Create `/fix` as a standalone command that:
1. Is explicitly invoked (not auto-triggered initially)
2. Follows an 8-step thorough process
3. Integrates with existing project structure (CLAUDE.md, BACKLOG.md)
4. Uses git history as knowledge base
5. Produces regression checklists for manual verification

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Extend /debug command | Reuse existing infrastructure | Bloats /debug purpose, conflates debugging with fixing | Rejected |
| Create /fix as skill | Auto-activates on context | Might trigger when not wanted, harder to control | Rejected (future backlog) |
| Create /fix as command | Explicit control, clear invocation | Requires user to remember to use it | **Selected** |

## Implementation Approach

Single command file at `commands/fix.md` that:
- Uses YAML frontmatter with optional `issue` argument
- Defines the 8-step process inline
- References CLAUDE.md and BACKLOG.md paths dynamically
- Includes output format template

## Dependencies

- Existing git infrastructure (for history search)
- Project structure with CLAUDE.md (for conventions)
- planning/BACKLOG.md (for convention-change entries)
