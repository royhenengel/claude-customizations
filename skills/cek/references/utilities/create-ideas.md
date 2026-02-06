# Generate Ideas

Generate ideas in one shot using creative sampling from distribution tails.

## Overview

Generate diverse set of possible responses by sampling from full distribution, ensuring each has probability less than 0.10.

## Usage

`/create-ideas [topic or problem] [optional: number of ideas]`

## Process

For each query, generate a set of five possible responses:
- Each as separate list item
- Each includes text description and numeric probability
- Sample at random from full distribution / tails of distribution
- Probability of each response should be less than 0.10

This ensures creative, non-obvious ideas rather than the most likely/common responses.

## Example Output

```
Topic: How to improve developer onboarding

1. **Pair Programming Rotation** (p=0.08)
   New developers rotate through different team pairs each week,
   learning codebase from multiple perspectives and building relationships.

2. **Codebase Scavenger Hunt** (p=0.06)
   Gamified exploration where new developers find specific patterns,
   understand architectural decisions, and document discoveries.

3. **Reverse Engineering Sessions** (p=0.04)
   Start from production bugs and trace backward through the code,
   learning system behavior through real problem-solving.

4. **Documentation Sprint Challenge** (p=0.03)
   New developers identify and document unclear areas,
   improving docs while learning and contributing immediately.

5. **Shadow On-Call Week** (p=0.05)
   Observe on-call rotation early, seeing real issues and how
   team responds, building context for system behavior.
```

## Notes

- Low probability sampling surfaces non-obvious ideas
- Useful before brainstorming sessions
- Can request more than 5 ideas if needed
- Combine with brainstorm command for deeper exploration
