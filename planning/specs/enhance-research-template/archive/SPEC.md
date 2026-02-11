# Enhance RESEARCH.md Template Specification

## Goal

Update the RESEARCH.md template in the /plan workflow to require deeper analysis, structured comparisons, and learning from external sources. Research documents should capture comprehensive problem understanding and leverage existing solutions rather than reinventing wheels.

## User Stories

- As a developer planning a feature, I want the RESEARCH.md template to guide me through thorough problem analysis so that I understand the domain before jumping to solutions
- As a developer, I want to capture what others have learned so that I can avoid known pitfalls and adopt proven patterns
- As a future reader, I want structured comparison tables so that I can quickly understand why decisions were made

## Requirements

### Functional

- [ ] Add Problem Analysis section (problem domain deep-dive, current state)
- [ ] Add External Inspirations section (sources reviewed, patterns, problems/solutions, insights)
- [ ] Expand External Research with ecosystem overview and structured option comparison
- [ ] Add Tradeoff Analysis section with explicit reasoning and risks
- [ ] Add Architectural Implications section (boundaries, dependencies, integration points)
- [ ] Add Sources section for traceability

### Non-Functional

- [ ] Template should be comprehensive but not overwhelming
- [ ] Sections should be skippable when not applicable (simple features)

## Constraints

- Single file change: skills/my-workflow/workflows/plan.md
- Maintain backwards compatibility with existing RESEARCH.md files (new sections are additive)

## Success Criteria

- [ ] plan.md contains updated RESEARCH.md template with all new sections
- [ ] Template guides thorough research without being bureaucratic
