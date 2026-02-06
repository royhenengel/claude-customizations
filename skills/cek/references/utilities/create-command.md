# Create Command

Interactive assistant for creating new Claude commands with proper structure, patterns, and MCP tool integration.

## Usage

`/create-command [command name or description]`

## Command Categories

1. **Planning** (Specialized)
   - Feature ideation, proposals, PRDs
   - Complex workflows with stages
   - Interactive, conversational

2. **Implementation** (Generic with Modes)
   - Technical execution tasks
   - Mode-based variations (ui, core, mcp)
   - Follow established patterns

3. **Analysis** (Specialized)
   - Review, audit, analyze
   - Generate reports
   - Provide recommendations

4. **Workflow** (Specialized)
   - Orchestrate multiple steps
   - Coordinate between areas
   - Track progress

5. **Utility** (Generic or Specialized)
   - Tools, helpers, maintenance
   - Simple operations

## Frontmatter (Required)

**Every command MUST start with YAML frontmatter:**

```yaml
---
description: Brief description of what command does
argument-hint: Description of expected arguments (optional)
---
```

- No blank lines before opening `---`
- One blank line after closing `---`
- `description` is REQUIRED
- `argument-hint` is OPTIONAL

## Interview Process

### Phase 1: Understanding Purpose

1. What problem does this command solve?
2. Who will use it and when?
3. What's the expected output?
4. Is it interactive or batch?

### Phase 2: Category Classification

Based on responses and similar existing commands:
- Like planning commands?
- Like implementation commands?
- Needs mode variations?
- Analysis pattern?

### Phase 3: Pattern Selection

Study similar commands first:
- Task description style
- Argument handling
- MCP tool usage
- Documentation references
- Human review sections

### Phase 4: Command Location

**Project Command** (`/.claude/commands/`):
- Specific to this project
- Uses project conventions
- References project docs

**User Command** (`~/.claude/commands/`):
- General-purpose utility
- Reusable across projects
- Personal productivity

### Phase 5: Resource Planning

Check existing resources:
- Templates
- Mode guides
- Documentation

## Generation Patterns

### MCP Tool Usage

```markdown
# Use MCP tools (not CLI)
Use tool: mcp__scopecraft-cmd__task_create
Use tool: mcp__scopecraft-cmd__task_update
Use tool: mcp__scopecraft-cmd__task_list

# NOT CLI commands
❌ Run: scopecraft task list
✅ Use tool: mcp__scopecraft-cmd__task_list
```

### Standard References

```markdown
<context>
Key Reference: @/docs/organizational-structure-guide.md
Template: @/docs/command-resources/template.md
</context>
```

### Human Review Sections

```markdown
<human_review_needed>
Flag decisions needing verification:
- [ ] Assumptions about workflows
- [ ] Technical approach choices
</human_review_needed>
```

## Creation Checklist

- [ ] Includes YAML frontmatter with description
- [ ] Frontmatter is very first content
- [ ] Studied similar commands
- [ ] Follows naming conventions
- [ ] Proper task/context structure
- [ ] Uses MCP tools (not CLI)
- [ ] Includes human review sections
- [ ] Has clear examples
- [ ] Updates task states appropriately
- [ ] Correct prefix (project: or user:)

## Implementation Steps

1. **Create Command File**
   - Determine location
   - Generate content following patterns

2. **Create Supporting Files**
   - Templates in resources
   - Mode guides if generic

3. **Update Documentation**
   - Add to command guide
   - Update workflow docs if applicable

4. **Test the Command**
   - Example usage scenarios
   - Verify argument handling
   - Check MCP integration

## Output

After creating:

1. **Command Created**:
   - Location
   - Name
   - Category
   - Pattern

2. **Resources Created**:
   - Templates
   - Documentation updates

3. **Usage Instructions**:
   - Command syntax
   - Example usage

4. **Next Steps**:
   - Test command
   - Refine based on usage
