---
name: quality-practices
description: Continuous improvement methodology with root cause analysis techniques. Use when Code implementation and refactoring, architecturing or designing systems, process and workflow improvements, error handling and validation. Provides techniques to avoid over-engineering and apply iterative improvements.
---

# Quality Practices - Continuous Improvement

## Table of Contents

1. [Overview](#overview)
2. [The Four Pillars](#the-four-pillars)
3. [Root Cause Analysis Tools](#root-cause-analysis-tools)
4. [Quick Reference](#quick-reference)

---

## Overview

Small improvements, continuously. Error-proof by design. Follow what works. Build only what's needed.

**Core principle:** Many small improvements beat one big change. Prevent errors at design time, not with fixes.

**Always applied for:**
- Code implementation and refactoring
- Architecture and design decisions
- Process and workflow improvements
- Error handling and validation

---

## The Four Pillars

### 1. Continuous Improvement

Small, frequent improvements compound into major gains.

**Incremental over revolutionary:**
- Make smallest viable change that improves quality
- One improvement at a time
- Verify each change before next
- Build momentum through small wins

**Always leave code better:**
- Fix small issues as you encounter them
- Refactor while you work (within scope)
- Update outdated comments
- Remove dead code when you see it

**Iterative refinement:**
- First version: make it work
- Second pass: make it clear
- Third pass: make it efficient
- Don't try all three at once

```typescript
// Iteration 1: Make it work
const calculateTotal = (items: Item[]) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
};

// Iteration 2: Make it clear (refactor)
const calculateTotal = (items: Item[]): number => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Iteration 3: Make it robust (add validation)
const calculateTotal = (items: Item[]): number => {
  if (!items?.length) return 0;

  return items.reduce((total, item) => {
    if (item.price < 0 || item.quantity < 0) {
      throw new Error('Price and quantity must be non-negative');
    }
    return total + (item.price * item.quantity);
  }, 0);
};
```

### 2. Error Proofing (Poka-Yoke)

Design systems that prevent errors at compile/design time, not runtime.

**Make errors impossible:**
- Type system catches mistakes
- Compiler enforces contracts
- Invalid states unrepresentable
- Errors caught early

**Type System Error Proofing:**

```typescript
// Bad: string status can be any value
type OrderBad = {
  status: string; // Can be anything!
};

// Good: Only valid states possible
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';
type Order = {
  status: OrderStatus;
};

// Better: States with associated data
type Order =
  | { status: 'pending'; createdAt: Date }
  | { status: 'processing'; startedAt: Date }
  | { status: 'shipped'; trackingNumber: string }
  | { status: 'delivered'; deliveredAt: Date };
// Now impossible to have shipped without trackingNumber
```

**Validation at Boundaries:**

```typescript
// Validate at system boundary, safe everywhere else
type PositiveNumber = number & { readonly __brand: 'PositiveNumber' };

const validatePositive = (n: number): PositiveNumber => {
  if (n <= 0) throw new Error('Must be positive');
  return n as PositiveNumber;
};

const processPayment = (amount: PositiveNumber) => {
  // amount is guaranteed positive, no need to check
  const fee = amount * 0.03;
};

// Validate once at boundary
const handleRequest = (req: Request) => {
  const amount = validatePositive(req.body.amount);
  processPayment(amount); // Safe everywhere
};
```

### 3. Standardized Work

Follow established patterns. Document what works. Make good practices easy.

**Consistency over cleverness:**
- Follow existing codebase patterns
- Don't reinvent solved problems
- New pattern only if significantly better
- Team agreement on new patterns

**Documentation lives with code:**
- README for setup and architecture
- CLAUDE.md for AI coding conventions
- Comments for "why", not "what"
- Examples for complex patterns

### 4. Just-In-Time (JIT)

Build what's needed now. No more, no less.

**YAGNI (You Aren't Gonna Need It):**
- Implement only current requirements
- No "just in case" features
- No "we might need this later" code
- Delete speculation

**Simplest thing that works:**
- Start with straightforward solution
- Add complexity only when needed
- Refactor when requirements change

```typescript
// Good: Current requirement - log errors to console
const logError = (error: Error) => {
  console.error(error.message);
};

// Bad: Over-engineered for imaginary future
class Logger {
  private transports: LogTransport[] = [];
  private queue: LogEntry[] = [];
  private rateLimiter: RateLimiter;
  // 200 lines for "maybe we'll need it"
}
```

**When to add complexity:**
- Current requirement demands it
- Pain points identified through use
- Measured performance issues
- Multiple use cases emerged (Rule of Three)

---

## Root Cause Analysis Tools

### Five Whys (`/why`)

Iteratively ask "why" to move from surface symptoms to fundamental causes.

**Usage:** `/why [issue_description]`

**Process:**
1. State the problem clearly
2. Ask "Why did this happen?" - document answer
3. For that answer, ask "Why?" again
4. Continue until root cause (usually 5 iterations)
5. Validate by working backwards
6. Propose solutions addressing root causes

**Example:**
```
Problem: Users see 500 error on checkout
Why 1: Payment service throws exception
Why 2: Request timeout after 30 seconds
Why 3: Database query takes 45 seconds
Why 4: Missing index on transactions table
Why 5: Index creation wasn't in migration scripts
Root Cause: Migration review process doesn't check query performance

Solution: Add query performance checks to migration PR template
```

**Tips:**
- Don't stop at symptoms; keep digging
- Multiple root causes may exist - explore branches
- If "human error" appears, keep digging: why was error possible?
- Root cause usually involves: missing validation, missing docs, unclear process, or missing automation

---

### Cause and Effect / Fishbone (`/cause-and-effect`)

Systematically explore causes across six categories.

**Usage:** `/cause-and-effect [problem_description]`

**Categories:**
- **People**: Skills, training, communication, team dynamics
- **Process**: Workflows, procedures, standards, reviews
- **Technology**: Tools, infrastructure, dependencies
- **Environment**: Workspace, deployment, external factors
- **Methods**: Approaches, patterns, architectures
- **Materials**: Data, dependencies, third-party services

**Example:**
```
Problem: API responses take 3+ seconds (target: <500ms)

TECHNOLOGY
├─ Database queries not optimized
│  └─ Why: No query analysis tools
├─ N+1 queries in ORM
│  └─ Why: Eager loading not configured
└─ No caching layer

PROCESS
├─ No performance testing in CI/CD
└─ No SLA defined for response times

METHODS
├─ REST API requires multiple round trips
└─ No pagination on large datasets

ROOT CAUSES:
- No performance requirements defined (Process)
- Missing performance monitoring (Technology)
- Architecture doesn't support caching (Methods)

SOLUTIONS (Priority Order):
1. Add database indexes (quick win)
2. Implement Redis caching (medium effort)
3. Define and monitor SLAs (prevents regression)
```

---

### Plan-Do-Check-Act (`/plan-do-check-act`)

Four-phase iterative cycle for systematic improvement.

**Usage:** `/plan-do-check-act [improvement_goal]`

**Phases:**

**PLAN:**
1. Define problem/goal
2. Analyze current state (baseline)
3. Identify root causes
4. Develop hypothesis: "If we change X, Y will improve"
5. Set measurable success criteria

**DO:**
1. Implement change (small scale first)
2. Document what was done
3. Record deviations from plan
4. Collect data

**CHECK:**
1. Measure results against criteria
2. Compare to baseline
3. Analyze: did hypothesis hold?
4. Document learnings

**ACT:**
- **If successful:** Standardize, document, train team
- **If unsuccessful:** Learn, adjust, start new cycle
- **If partial:** Standardize what worked, plan next cycle

**Example:**
```
CYCLE 1
───────
PLAN:
  Problem: Docker build takes 45 minutes
  Hypothesis: Caching dependencies will reduce to <10 min
  Success Criteria: Build time <10 minutes on unchanged deps

DO:
  - Restructured Dockerfile for layer caching
  - Configured CI cache for Docker layers

CHECK:
  - Unchanged dependencies: 8 min ✓ (was 45)
  - Changed dependencies: 12 min (was 45)
  Analysis: 82% reduction, hypothesis confirmed

ACT:
  ✓ Merged changes, documented in README
  New Problem: 12 min still slow → Start CYCLE 2
```

---

## Quick Reference

### Red Flags

| Pillar | Red Flag |
|--------|----------|
| Continuous Improvement | "I'll refactor later" (never happens) |
| Error Proofing | "Users should just be careful" |
| Standardized Work | "I prefer to do it my way" |
| Just-In-Time | "We might need this someday" |

### Analysis Tool Selection

| Situation | Use |
|-----------|-----|
| Single issue, need root cause | `/why` (Five Whys) |
| Complex problem, multiple factors | `/cause-and-effect` (Fishbone) |
| Iterative improvement over time | `/plan-do-check-act` (PDCA) |
| Deep analysis of specific cause | `/why` after `/cause-and-effect` |

### Mindset

**Quality practices are about:**
- Small improvements continuously
- Preventing errors by design
- Following proven patterns
- Building only what's needed

**Not about:**
- Perfection on first try
- Massive refactoring projects
- Clever abstractions
- Premature optimization

**Mantra:** Good enough today, better tomorrow. Repeat.
