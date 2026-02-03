# Design: Fun Project Intro

Full design questionnaire with all options and selections.

## Visual Format Design

### Initial Direction

**User brief:** Make the new project intro more fun, visually decorated.

**User preferences:**
- Polished and professional
- Notification-like feel
- Not too plain
- Practical (not "happy happy joy joy")
- Craftsman vibe (but not artsy like "fresh canvas")

### Visual Style Exploration

**Round 1: Basic styles**

| Option | Style |
|--------|-------|
| A | Icon prefix: `🔍 [text]` |
| B | Box with rounded corners |
| C | Bullet: `▸ [text]` |
| D | Plain text |
| E | Line separator: `── [text] ──` |

**Feedback:** Try icon with box

**Round 2: Icon + Box combinations**

| Option | Style |
|--------|-------|
| A | Icon inside box |
| B | Icon outside box |
| C | Icon as box header |
| D | Icon in corner |

**Feedback:** Try text followed by icons

**Round 3: Text followed by icon**

| Option | Style |
|--------|-------|
| A | Inside box, icon trailing |
| B | Text then icon outside box |
| C | Plain line, icon at end |
| D | Box with icon in corner |

**Feedback:** Lose the icon, give me 10 more box-like options

**Round 4: More box styles**

| # | Style |
|---|-------|
| 1 | Double-line box (╔══╗) |
| 2 | Rounded corners (╭──╮) |
| 3 | Square corners (┌──┐) |
| 4 | Simple underline |
| 5 | Bracketed |
| 6 | Pipes |
| 7 | Block indent (▌) |
| 8 | Dotted frame |
| 9 | Arrow prefix (▶) |
| 10 | Minimal line accent |

**Feedback:** Maybe more towards a table?

**Round 5: Table styles**

| # | Style |
|---|-------|
| 1 | Simple table row |
| 2 | Header table |
| 3 | Key-value style |
| 4 | Status row |
| 5 | Multi-row table |
| 6 | Minimal columns |
| 7 | Grid style (╔═╦═╗) |
| 8 | ASCII table (+--+) |

**Feedback:** Still not liking what I see

**Round 6: Clarification**

Asked user to describe:
- Feeling wanted: Polished and professional
- Reminds of: Notification
- What's wrong: Too plain

**Round 7: Notification-inspired**

| # | Style |
|---|-------|
| 1 | Status banner (━━━ with ●) |
| 2 | Alert card (┏━━━┓ with ◉) |
| 3 | System notification (╔═══╗ with ■) |
| 4 | Status toast (▄▄▄ / ▀▀▀) |
| 5 | Minimal badge (━━━ ◆) |
| 6 | Clean header block (═══) |

**Question:** What would warmer or colder look like?

**Round 8: Temperature spectrum**

**Colder** (clinical, technical, minimal):
- `[STATUS] Checking project state`
- `> project.check()`
- `────── STATUS: checking ──────`

**Warmer** (inviting, softer, more presence):
- Status banner with ● and thick lines
- Box with padding and casual text

**Middle ground** (polished but not soft):
- Thick-line box with PROJECT STATUS header

**Selection:** Between warmer (first option) and middle ground

**Round 9: Final refinement**

| # | Style |
|---|-------|
| 1 | Thick box with ● Welcome header |
| 2 | Open-sided with pipes |
| 3 | Square corners with ● |
| 4 | Rounded corners with ● |
| 5 | Status banner with PROJECT header |

**Final selection:** User provided reference:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 TASKS 2, 4, 5 (PARALLEL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Final Format Specification

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{icon} {text}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Rules:**
- Minimum line length: 50 `━` characters
- Text never exceeds line length
- Line extends if text is longer
- Icon changes per action type
- Applies to all workflows (start, build, plan)

---

## Message Design (start.md)

### Message 1: Welcome/Scanning

**Icon options:**
- 🔍 searching/checking
- 👀 looking
- 📋 reviewing
- ⚙️ processing

**Text options:**
- A. `Welcome, checking project state...`
- B. `Checking project state...`
- C. `Let's see what we're working with.`
- D. `Scanning project...`

**Selection:** 🔍 Scanning project...

---

### Message 2: Resume/State Loaded

**Icon options:**
- 📋 clipboard/state
- 🔄 resuming
- 📂 project found
- ✅ ready

**Text options:**
- A. `Session context found`
- B. `Resuming previous session`
- C. `Found previous state`
- D. `Project state loaded`

**Selection:** ✅ Project state loaded

---

### Message 3: New Project

**Icon options:**
- 🆕 new
- 🚀 launching
- 📁 creating folder
- ⚡ starting fresh

**Text options:**
- A. `New project — setting up`
- B. `Fresh project, initializing...`
- C. `New project detected, setting up workspace`
- D. `Setting up new project`

**Initial selection:** 🚀 Setting up new project

**Revised selection:** 🔧 Setting up new project

---

### Message 4: Brownfield Detected

**Icon options:**
- 📦 existing package
- 🗂️ files
- 🔍 scanning
- 🏗️ existing structure

**Text options:**
- A. `Existing codebase detected, mapping...`
- B. `Found existing code, analyzing...`
- C. `Mapping existing codebase`
- D. `Codebase detected, scanning structure`

**Selection:** 🔍 Codebase detected, analyzing...

---

### Message 5: Structure Created

**Icon options:**
- ✅ done/complete
- 📁 folders created
- 🏗️ built
- ✨ ready/fresh

**Text options:**
- A. `Project structure created`
- B. `Workspace ready`
- C. `Structure initialized`
- D. `Planning structure ready`

**Selection:** 📁 Planning Workspace Ready

---

### Message 6: Overview Guidance

**Icon options:**
- 📝 writing/defining
- 💬 conversation
- 🎯 targeting/focus
- 📋 checklist

**Text options:**
- A. `Let's define this project`
- B. `Project overview needed`
- C. `Defining project overview`
- D. `Time to outline the project`

**Selection:** 🎯 Let's define this project

---

### Message 7: Project Initialized

**Icon options:**
- ✅ complete
- 🚀 ready to go
- ✨ fresh/ready
- 🎉 celebration

**Text options:**
- A. `Project initialized`
- B. `Ready to build`
- C. `Project ready`
- D. `All set`

**Selection:** 🚀 Project initialized

---

## Final Message Catalog (start.md)

| # | Action | Icon | Text |
|---|--------|------|------|
| 1 | Scanning project | 🔍 | Scanning project... |
| 2 | Resume/state loaded | ✅ | Project state loaded |
| 3 | New project | 🔧 | Setting up new project |
| 4 | Brownfield detected | 🔍 | Codebase detected, analyzing... |
| 5 | Structure created | 📁 | Planning Workspace Ready |
| 6 | Overview guidance | 🎯 | Let's define this project |
| 7 | Project initialized | 🚀 | Project initialized |

---

## Implementation

### Task 4: Update start.md

**Files modified:** `skills/my-workflow/workflows/start.md`

**Changes made:**
1. Line 16: Welcome message → `🔍 Scanning project...`
2. Line 37: Multi-feature resume → `✅ Project state loaded`
3. Line 61: Simple session resume → `✅ Project state loaded`
4. Line 76: New project → `🔧 Setting up new project`
5. Line 240: Brownfield detected → `🔍 Codebase detected, analyzing...`
6. Line 258: Greenfield structure created → `📁 Planning Workspace Ready`
7. Line 276: Brownfield structure created → `📁 Planning Workspace Ready`
8. Line 295: Overview guidance → `🎯 Let's define this project`
9. Line 372: Project initialized → `🚀 Project initialized`

**Status:** Complete

### Task 5: Update build.md

**Files modified:** `skills/my-workflow/workflows/build.md`

**Messages updated:**

| # | Action | Icon | Text |
|---|--------|------|------|
| 1 | Architectural decision | ⛔ | Architectural Decision Required |
| 2 | Gap detected | ⚠️ | Gap Detected |
| 3 | Gap resolved | ✅ | Gap Resolved |
| 4 | User addition | 📝 | User Addition |
| 5 | Context health | 💾 | Context Health |
| 6 | Build complete | ✅ | Build Complete |

**Status:** Complete

### Task 6: Update plan.md

**Files modified:** `skills/my-workflow/workflows/plan.md`

**Messages updated:**

| # | Action | Icon | Text |
|---|--------|------|------|
| 1 | Active feature exists | ⚠️ | Active Feature Exists |
| 2 | Backlog display | 📋 | Backlog |
| 3 | What to plan (empty backlog) | 📋 | What to Plan |
| 4 | Plan complete | ✅ | Plan Complete |

**Status:** Complete
