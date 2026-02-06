---
description: Analyze codebase, file, or pattern
arguments:
  - name: target
    description: File path, directory, pattern, or 'codebase' for full analysis
    required: false
---

Analyze code to understand structure, patterns, and potential issues.

## Analysis Modes

### 1. File Analysis (specific file path)

```bash
cat {{target}}
wc -l {{target}}
```

Analyze:
- **Purpose**: What does this file do?
- **Dependencies**: What does it import/require?
- **Exports**: What does it expose?
- **Patterns**: What patterns are used?
- **Complexity**: Cyclomatic complexity, nesting depth
- **Issues**: Potential problems or code smells

Output:
```markdown
# Analysis: [filename]

## Purpose
[What this file does]

## Structure
- Lines: [X]
- Functions: [Y]
- Classes: [Z]

## Dependencies
- Internal: [list]
- External: [list]

## Exports
- [list of exports]

## Patterns Used
- [Pattern 1]: [where/how]
- [Pattern 2]: [where/how]

## Potential Issues
- [Issue 1]
- [Issue 2]

## Suggestions
- [Improvement 1]
- [Improvement 2]
```

### 2. Directory Analysis (directory path)

```bash
find {{target}} -type f -name "*.ts" -o -name "*.js" | head -50
wc -l {{target}}/**/*
```

Analyze:
- **Structure**: How is code organized?
- **Entry points**: Main files
- **Dependencies**: Internal/external
- **Patterns**: Consistent patterns used

### 3. Pattern Analysis (grep pattern)

```bash
grep -r "{{target}}" --include="*.ts" --include="*.js" -l
grep -r "{{target}}" --include="*.ts" --include="*.js" -c
```

Analyze:
- **Usage count**: How often is pattern used?
- **Locations**: Where is it used?
- **Consistency**: Is usage consistent?
- **Alternatives**: Better approaches?

### 4. Codebase Analysis (target = 'codebase' or empty)

```bash
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.tsx" -o -name "*.jsx" \) | grep -v node_modules | head -100
cat package.json 2>/dev/null
cat tsconfig.json 2>/dev/null
ls -la src/ 2>/dev/null
```

Analyze:
- **Technology stack**: Languages, frameworks
- **Architecture**: How is code organized?
- **Entry points**: Main files, exports
- **Patterns**: Common patterns used
- **Dependencies**: Key external deps
- **Testing**: Test structure and coverage
- **Build**: Build and deployment setup

Output:
```markdown
# Codebase Analysis: [project name]

## Technology Stack
- **Language**: TypeScript/JavaScript
- **Framework**: [React/Vue/Node/etc.]
- **Build**: [Vite/Webpack/etc.]
- **Testing**: [Jest/Vitest/etc.]

## Architecture

### Directory Structure
```
src/
├── components/   # UI components
├── hooks/        # Custom hooks
├── services/     # API/business logic
├── utils/        # Utilities
└── types/        # TypeScript types
```

### Key Patterns
- **State Management**: [pattern]
- **API Layer**: [pattern]
- **Component Structure**: [pattern]

## Entry Points
- `src/index.ts` - Main entry
- `src/App.tsx` - App component

## Dependencies
### Core
- [dep 1]: [purpose]
- [dep 2]: [purpose]

### Dev
- [dep 1]: [purpose]

## Code Quality

### Strengths
- [strength 1]
- [strength 2]

### Areas for Improvement
- [area 1]
- [area 2]

## Recommendations
1. [recommendation 1]
2. [recommendation 2]
```

## Analysis Depth

**Quick** (default): Structure, main patterns, obvious issues
**Deep** (ask if needed): Full complexity analysis, all files, detailed recommendations

Ask user if they want deep analysis for large codebases:
```
Codebase has [X] files. Run quick or deep analysis?
1. Quick (structure and patterns)
2. Deep (full analysis, may take longer)
```

## Integration with Planning

If `.planning/` exists, incorporate:
- OVERVIEW.md context
- ROADMAP.md for understanding project direction
- Recent SUMMARY.md files for recent changes
