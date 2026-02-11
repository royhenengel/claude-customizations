# Feature: My Workflow Visual Design

## Problem

Current workflow messages are dry and utilitarian ("Welcome, checking the current state."). They lack visual polish and personality.

## Solution

Add a consistent visual format to all workflow status messages across start.md, build.md, plan.md, and other workflows.

## Design

### Visual Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{icon} {text}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Rules

- Minimum line length: 50 `━` characters
- Text never exceeds line length
- Line extends if text is longer
- Icon changes per action type

### Message Catalog (start.md)

| Action | Icon | Text |
|--------|------|------|
| Scanning project | 🔍 | Scanning project... |
| Resume/state loaded | ✅ | Project state loaded |
| New project | 🔧 | Setting up new project |
| Brownfield detected | 🔍 | Codebase detected, analyzing... |
| Structure created | 📁 | Planning Workspace Ready |
| Overview guidance | 🎯 | Let's define this project |
| Project initialized | 🚀 | Project initialized |

### Scope

- start.md - all status messages
- build.md - all status messages
- plan.md - all status messages
- Other workflows as applicable

## Success Criteria

- All workflow status messages use the new format
- Visual consistency across all workflows
- Polished, professional feel with warmth
