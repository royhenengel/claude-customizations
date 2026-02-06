---
name: evolve
description: Analyze instinct patterns and suggest evolved capabilities
---

---
description: Analyze instinct patterns and suggest evolved capabilities
---

Analyze clusters of related instincts and observations to suggest evolved capabilities (skills, commands, agents).

## Process

1. **Run instinct CLI:**
   ```bash
   ~/.claude/hooks/scripts/instinct-cli.py evolve
   ```

2. **Display analysis and suggestions**

## Output Format

```
# Evolution Analysis

## Observation Clusters

### Cluster 1: Communication Style (5 observations)
Related instincts:
- direct-communication (95%)
- brevity-first (88%)
- active-voice-only (82%)

Suggested evolution: **communication-enforcer** (agent)
Description: Validates output against communication style preferences

### Cluster 2: Visual Learning (3 observations)
Related instincts:
- visual-representations (85%)
- diagram-first (78%)

Suggested evolution: **auto-diagram** (skill)
Description: Automatically generate diagrams for complex explanations

## Recommendations

1. **High confidence**: communication-enforcer agent
   - 3+ clustered observations
   - Related instincts above 80%

2. **Developing**: auto-diagram skill
   - Pattern emerging, needs more observations

## Actions

- Run `/create-subagent communication-enforcer` to create suggested agent
- Continue building observations to strengthen clusters
```

## No Clusters

If insufficient data:

```
# Evolution Analysis

Insufficient data for evolution analysis.

Requirements:
- At least 3 related observations per cluster
- Related instincts above minimum confidence (30%)

Current state:
- Observations: 2
- High-confidence instincts: 1

Continue using Claude to build more observations.
```

## Configuration

Evolution thresholds from `~/.claude/learning/config.json`:
- `cluster_threshold`: Minimum observations per cluster (default: 3)
- `min_confidence`: Minimum instinct confidence to include (default: 0.3)
