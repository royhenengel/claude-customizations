---
name: consider
description: Apply thinking frameworks to analyze problems, decisions, and situations from different perspectives
argument: "<framework> [topic]"
---

Apply a structured thinking framework to the current context or a specified topic.

## Frameworks

| Framework | Description | When to Use |
|-----------|-------------|-------------|
| `vital-few` | Pareto's 80/20 principle | Prioritizing, focusing effort |
| `challenge-assumptions` | First principles thinking | Questioning beliefs, innovating |
| `consequences` | Second-order thinking | Evaluating decisions, tracing effects |
| `failure-backwards` | Inversion / pre-mortem | Risk analysis, avoiding pitfalls |
| `option-cost` | Opportunity cost analysis | Comparing tradeoffs, resource allocation |
| `priority-one` | Highest-leverage action | Reducing overwhelm, finding focus |
| `simplest-explanation` | Occam's Razor | Diagnosing problems, evaluating theories |
| `simplify-by-removing` | Via negativa | Reducing complexity, eliminating waste |
| `strengths-weaknesses` | SWOT analysis | Strategic planning, position assessment |

## Usage

```
/consider vital-few           # Apply 80/20 to current discussion
/consider consequences API    # Trace consequences of API decision
/consider failure-backwards   # What would guarantee failure?
```

## Process

1. Parse the framework name from the first argument
2. Load the framework reference from `@skills/Planning/consider/frameworks/{framework}.md`
3. Apply the framework to the topic (second argument) or current conversation context
4. Follow the framework's process, output format, and success criteria exactly

## No Framework Specified

If invoked without a framework name, present the table above and ask which framework to apply.
