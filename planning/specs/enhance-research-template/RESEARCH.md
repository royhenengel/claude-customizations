# Enhance RESEARCH.md Template Research

## Problem Analysis

### Problem Domain

The RESEARCH.md template in /plan workflow provides minimal structure for documenting research. When planning features, especially complex ones that others have implemented, the template doesn't guide users to:
- Deeply analyze the problem before solutioning
- Learn from existing implementations and discussions
- Structure comparisons systematically
- Document architectural implications

### Current State

Current template sections:
- Information Gathered (Codebase + External Research)
- Approach
- Alternatives Considered (basic table)
- Dependencies
- Open Questions

Missing:
- Problem domain analysis
- External inspirations (learning from others)
- Tradeoff analysis with explicit reasoning
- Architectural implications
- Source traceability

## Information Gathered

### Codebase Analysis

- Template defined in: skills/my-workflow/workflows/plan.md (lines 253-293)
- Existing RESEARCH.md files: 7 feature specs
- reddit-mcp-server/RESEARCH.md demonstrates richer research than template requires

### External Research

Not applicable - this is an internal template improvement based on user feedback during conversation.

## External Inspirations

### Sources Reviewed

| Source | Type | Key Insight |
|--------|------|-------------|
| reddit-mcp-server/RESEARCH.md | impl | Shows what comprehensive research looks like in practice |
| User feedback | discussion | Need to capture learnings from others, not just our own analysis |

### Patterns & Approaches

- Structured comparison tables with consistent columns (Type, Maturity, Complexity, Maintenance, Fit)
- Explicit "why this choice" reasoning
- Risk identification with mitigation strategies

### Insights to Apply

- Template should guide depth, not just provide headings
- "External Inspirations" captures broader insight sources (not just implementations)
- Traceability via Sources section prevents "where did this come from?" questions

## Tradeoff Analysis

| Factor | Choice Made | Alternative | Why This Choice |
|--------|-------------|-------------|-----------------|
| Comprehensiveness vs Simplicity | Comprehensive template | Minimal template | Users can skip sections; better to guide depth than assume it |
| Prescriptive vs Flexible | Prescriptive columns | Freeform | Consistent structure aids comparison and review |

### Risks

- Template bloat: Mitigation - sections clearly optional for simple features
- Overhead perception: Mitigation - each section has clear purpose

## Architectural Implications

### System Boundaries

Change is isolated to plan.md template. No runtime behavior changes.

### Dependencies

- None (template only)

### Integration Points

- All future RESEARCH.md files will use new template
- Existing RESEARCH.md files remain valid (additive changes)

## Approach

Update the RESEARCH.md template in plan.md with:
1. Problem Analysis section
2. External Inspirations section
3. Enhanced External Research structure
4. Tradeoff Analysis section
5. Architectural Implications section
6. Sources section

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Update template in plan.md | Single file, immediate effect | None | SELECTED |
| Create separate research guide | More detailed guidance | Indirection, may not be read | Rejected: YAGNI |

## Open Questions

None - approach defined through conversation.

## Sources

- User conversation (this session)
- Existing RESEARCH.md examples in planning/specs/
