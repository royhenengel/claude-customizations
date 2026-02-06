# Memorize

Curate insights from reflections and critiques into CLAUDE.md using Agentic Context Engineering.

## Overview

Transform reflections, critiques, and execution feedback into durable, reusable guidance by updating CLAUDE.md. Implements the **Curation** phase of ACE framework.

## Usage

```
/memorize
/memorize --dry-run           # Preview without writing
/memorize --max=5             # Limit bullets
/memorize --section="Section" # Target specific section
/memorize --source=last|selection|chat:<id>
```

## Workflow

### Phase 1: Context Harvesting

1. **Identify Learning Sources**:
   - Conversation history and decisions
   - Reflection outputs from `/reflect`
   - Critique findings from `/critique`
   - Problem-solving patterns
   - Failed approaches and why

2. **Extract Key Insights** (Grow):
   - **Domain Knowledge**: Codebase, business logic facts
   - **Solution Patterns**: Effective reusable approaches
   - **Anti-Patterns**: What to avoid and why
   - **Context Clues**: Helps understand requirements
   - **Quality Gates**: Standards for better outcomes

   Extract format:
   - Error → one line
   - Root cause → one line
   - Correct approach → imperative rule
   - Key insight → decision rule or checklist

3. **Categorize by Impact**:
   - Critical: Prevents major issues
   - High: Consistently improves quality
   - Medium: Aids understanding
   - Low: Minor optimizations

### Phase 2: Curation Process

1. **Analyze Current CLAUDE.md**: Read and assess gaps

2. **Apply Curation Rules** (Refine):
   - Relevance: Helpful for recurring tasks
   - Non-redundancy: Don't duplicate existing
   - Atomicity: One idea per bullet
   - Verifiability: Avoid speculation
   - Safety: No secrets, tokens, PII
   - Stability: Prefer time-stable strategies

3. **Transform Insights**:
   - Raw insight → Context category → Actionable format

   Example:
   ```
   Raw: "Using Map instead of Object for lookup caused performance issues on small datasets"

   Curated: "For lookups <100 items, prefer Object over Map. Map optimal for 10K+ items."
   ```

4. **Prevent Context Collapse**:
   - Can this merge with existing knowledge?
   - Does it contradict documented content?
   - Is it specific enough to act on?

### Phase 3: Update CLAUDE.md

**Section Structure**:

1. **Project Context**
   - Domain Knowledge
   - Technical constraints
   - User behavior patterns

2. **Code Quality Standards**
   - Performance criteria
   - Security considerations
   - Maintainability patterns

3. **Architecture Decisions**
   - Patterns that worked
   - Integration approaches
   - Scalability considerations

4. **Testing Strategies**
   - Effective test patterns
   - Edge cases to consider
   - Quality gates

5. **Development Guidelines**
   - APIs for specific information
   - Formulas and calculations
   - Checklists for common tasks

6. **Strategies and Hard Rules**
   - Verification checklist
   - Patterns and playbooks
   - Anti-patterns and pitfalls

### Phase 4: Validation

**Quality Gates**:
- Coherence: Fits with existing context?
- Actionability: Agent can use immediately?
- Consolidation: No near-duplicates?
- Scoped: Names technologies when relevant?
- Evidence-backed: From reflection/tests/docs?

**Good Patterns**:
- Specific thresholds: "Use pagination for lists >50 items"
- Contextual: "When user mentions performance, measure first"
- Failure prevention: "Always validate input before DB operations"

**Anti-Patterns to Avoid**:
- Vague: "Write good code"
- Personal: "I like functional style"
- Outdated: "Use jQuery for DOM"
- Over-general: "Always use microservices"

## Output

1. Short summary of additions (counts by section)
2. Confirmation that CLAUDE.md was created/updated

## Notes

- Counterpart to `/reflect`: reflect → curate → memorize
- Follows ACE to avoid context collapse
- Do not overwrite existing context; only add high-signal bullets
- Quality over quantity: each memory should measurably improve future work
