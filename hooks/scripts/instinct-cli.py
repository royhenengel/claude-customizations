#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["pyyaml"]
# ///
"""
Instinct CLI - Manage learned behavioral patterns for Claude Code.

Commands:
    status      Show all instincts with confidence scores
    import      Import instincts from file or URL
    export      Export instincts to file
    evolve      Analyze patterns and suggest evolutions
    bootstrap   Generate initial instincts from AI Chat Prefs

Integrates with claude-mem for observation data.
"""

import argparse
import json
import os
import sqlite3
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

import yaml

# Configuration paths
LEARNING_DIR = Path(os.path.expanduser("~/.claude/learning"))
CONFIG_PATH = LEARNING_DIR / "config.json"
IDENTITY_PATH = LEARNING_DIR / "identity.json"
PERSONAL_INSTINCTS_DIR = LEARNING_DIR / "instincts" / "personal"
INHERITED_INSTINCTS_DIR = LEARNING_DIR / "instincts" / "inherited"
EVOLVED_DIR = LEARNING_DIR / "evolved"

# Claude-mem database path
CLAUDE_MEM_DB = Path(os.path.expanduser("~/.claude-mem/claude-mem.db"))


def load_config() -> dict:
    """Load configuration from config.json."""
    if CONFIG_PATH.exists():
        return json.loads(CONFIG_PATH.read_text())
    return {
        "instincts": {
            "min_confidence": 0.3,
            "auto_approve_threshold": 0.7,
        }
    }


def load_instincts(directory: Path) -> list[dict]:
    """Load all instincts from a directory."""
    instincts = []
    if not directory.exists():
        return instincts

    for file in directory.glob("*.yaml"):
        try:
            content = file.read_text()
            # Parse YAML with frontmatter
            if content.startswith("---"):
                parts = content.split("---", 2)
                if len(parts) >= 3:
                    metadata = yaml.safe_load(parts[1])
                    body = parts[2].strip()
                    metadata["body"] = body
                    metadata["source_file"] = str(file)
                    instincts.append(metadata)
        except Exception as e:
            print(f"Warning: Could not parse {file}: {e}", file=sys.stderr)

    return instincts


def get_observations_from_claude_mem(limit: int = 1000) -> list[dict]:
    """Query recent observations from claude-mem's SQLite database."""
    if not CLAUDE_MEM_DB.exists():
        return []

    try:
        conn = sqlite3.connect(str(CLAUDE_MEM_DB))
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            """
            SELECT id, type, title, subtitle, narrative, facts, concepts,
                   files_read, files_modified, created_at, created_at_epoch
            FROM observations
            ORDER BY created_at_epoch DESC
            LIMIT ?
            """,
            (limit,),
        )
        observations = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return observations
    except Exception as e:
        print(f"Warning: Could not query claude-mem: {e}", file=sys.stderr)
        return []


def format_confidence_bar(confidence: float, width: int = 20) -> str:
    """Create a visual confidence bar."""
    filled = int(confidence * width)
    empty = width - filled
    return f"[{'#' * filled}{'-' * empty}] {confidence:.0%}"


def cmd_status(args):
    """Show all instincts with confidence scores."""
    personal = load_instincts(PERSONAL_INSTINCTS_DIR)
    inherited = load_instincts(INHERITED_INSTINCTS_DIR)

    all_instincts = personal + inherited

    if not all_instincts:
        print("No instincts found.")
        print("\nTo get started:")
        print("  - Run 'instinct-cli.py bootstrap' to generate from AI Chat Prefs")
        print("  - Run 'instinct-cli.py import <file>' to import from file")
        return

    # Group by domain
    by_domain = {}
    for inst in all_instincts:
        domain = inst.get("domain", "general")
        if domain not in by_domain:
            by_domain[domain] = []
        by_domain[domain].append(inst)

    print(f"\n{'='*60}")
    print("LEARNED INSTINCTS")
    print(f"{'='*60}\n")

    for domain, instincts in sorted(by_domain.items()):
        print(f"\n## {domain.upper()}\n")
        for inst in sorted(instincts, key=lambda x: x.get("confidence", 0), reverse=True):
            conf = inst.get("confidence", 0)
            print(f"  {inst.get('id', 'unknown'):30} {format_confidence_bar(conf)}")
            if inst.get("trigger"):
                print(f"    Trigger: {inst['trigger']}")

    print(f"\n{'='*60}")
    print(f"Total: {len(all_instincts)} instincts")
    print(f"  Personal: {len(personal)}")
    print(f"  Inherited: {len(inherited)}")

    # Show claude-mem status
    obs = get_observations_from_claude_mem(limit=1)
    if obs:
        print(f"\nClaude-mem: Connected ({len(get_observations_from_claude_mem())} observations)")
    else:
        print("\nClaude-mem: No observations yet")


def cmd_export(args):
    """Export instincts to file."""
    personal = load_instincts(PERSONAL_INSTINCTS_DIR)
    inherited = load_instincts(INHERITED_INSTINCTS_DIR)

    all_instincts = personal + inherited

    # Apply filters
    if args.domain:
        all_instincts = [i for i in all_instincts if i.get("domain") == args.domain]

    if args.min_confidence:
        min_conf = float(args.min_confidence)
        all_instincts = [i for i in all_instincts if i.get("confidence", 0) >= min_conf]

    if not all_instincts:
        print("No instincts match the criteria.", file=sys.stderr)
        return 1

    # Format output
    output = yaml.dump(all_instincts, default_flow_style=False, allow_unicode=True)

    if args.output:
        Path(args.output).write_text(output)
        print(f"Exported {len(all_instincts)} instincts to {args.output}")
    else:
        print(output)

    return 0


def cmd_import(args):
    """Import instincts from file or URL."""
    source = args.source

    # Read source
    if source.startswith("http://") or source.startswith("https://"):
        try:
            import urllib.request
            with urllib.request.urlopen(source) as response:
                content = response.read().decode("utf-8")
        except Exception as e:
            print(f"Error fetching URL: {e}", file=sys.stderr)
            return 1
    else:
        path = Path(source)
        if not path.exists():
            print(f"File not found: {source}", file=sys.stderr)
            return 1
        content = path.read_text()

    # Parse YAML
    try:
        instincts = yaml.safe_load(content)
        if not isinstance(instincts, list):
            instincts = [instincts]
    except Exception as e:
        print(f"Error parsing YAML: {e}", file=sys.stderr)
        return 1

    # Apply confidence filter
    if args.min_confidence:
        min_conf = float(args.min_confidence)
        instincts = [i for i in instincts if i.get("confidence", 0) >= min_conf]

    if args.dry_run:
        print(f"Would import {len(instincts)} instincts:")
        for inst in instincts:
            print(f"  - {inst.get('id', 'unknown')} ({inst.get('confidence', 0):.0%})")
        return 0

    # Write to inherited directory
    INHERITED_INSTINCTS_DIR.mkdir(parents=True, exist_ok=True)

    imported = 0
    for inst in instincts:
        inst_id = inst.get("id", f"imported-{datetime.now().strftime('%Y%m%d%H%M%S')}")
        filepath = INHERITED_INSTINCTS_DIR / f"{inst_id}.yaml"

        # Format as YAML with frontmatter
        body = inst.pop("body", "")
        frontmatter = yaml.dump(inst, default_flow_style=False)
        content = f"---\n{frontmatter}---\n\n{body}"

        filepath.write_text(content)
        imported += 1

    print(f"Imported {imported} instincts to {INHERITED_INSTINCTS_DIR}")
    return 0


def cmd_evolve(args):
    """Analyze instincts and suggest evolutions."""
    personal = load_instincts(PERSONAL_INSTINCTS_DIR)
    inherited = load_instincts(INHERITED_INSTINCTS_DIR)
    all_instincts = personal + inherited

    config = load_config()
    cluster_threshold = config.get("evolution", {}).get("cluster_threshold", 3)

    if len(all_instincts) < cluster_threshold:
        print(f"Need at least {cluster_threshold} instincts to analyze patterns.")
        print(f"Currently have: {len(all_instincts)}")
        return 1

    # Group by domain for analysis
    by_domain = {}
    for inst in all_instincts:
        domain = inst.get("domain", "general")
        if domain not in by_domain:
            by_domain[domain] = []
        by_domain[domain].append(inst)

    print(f"\n{'='*60}")
    print("EVOLUTION ANALYSIS")
    print(f"{'='*60}\n")

    skill_candidates = []
    command_candidates = []
    agent_candidates = []

    for domain, instincts in by_domain.items():
        if len(instincts) >= cluster_threshold:
            avg_confidence = sum(i.get("confidence", 0) for i in instincts) / len(instincts)
            skill_candidates.append({
                "domain": domain,
                "instinct_count": len(instincts),
                "avg_confidence": avg_confidence,
            })

    # High-confidence workflow instincts -> command candidates
    for inst in all_instincts:
        if inst.get("confidence", 0) >= 0.8 and "workflow" in inst.get("domain", ""):
            command_candidates.append(inst)

    print("## SKILL CANDIDATES (domain clusters)")
    if skill_candidates:
        for cand in skill_candidates:
            print(f"  - {cand['domain']}: {cand['instinct_count']} instincts, {cand['avg_confidence']:.0%} avg confidence")
    else:
        print("  (none detected)")

    print("\n## COMMAND CANDIDATES (high-confidence workflows)")
    if command_candidates:
        for cand in command_candidates:
            print(f"  - {cand.get('id')}: {cand.get('trigger')}")
    else:
        print("  (none detected)")

    print("\n## AGENT CANDIDATES (complex patterns)")
    if agent_candidates:
        for cand in agent_candidates:
            print(f"  - {cand}")
    else:
        print("  (none detected)")

    if args.generate:
        print("\n## GENERATING EVOLVED STRUCTURES")
        EVOLVED_DIR.mkdir(parents=True, exist_ok=True)

        for cand in skill_candidates:
            skill_path = EVOLVED_DIR / "skills" / f"{cand['domain']}-skill.md"
            skill_path.parent.mkdir(parents=True, exist_ok=True)
            skill_path.write_text(f"# {cand['domain'].title()} Skill\n\nEvolved from {cand['instinct_count']} instincts.\n")
            print(f"  Created: {skill_path}")

        print("\nGenerated files can be reviewed and moved to active directories.")

    return 0


def cmd_bootstrap(args):
    """Bootstrap instincts from AI Chat Prefs."""
    # AI Chat Prefs key preferences to convert
    bootstrap_instincts = [
        {
            "id": "direct-communication",
            "trigger": "when writing responses",
            "confidence": 0.9,
            "domain": "communication",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Direct Communication\n\n## Action\nUse direct, professional tone without hedging or softening language.\n\n## Evidence\nExplicitly documented in AI Chat Prefs as user preference.",
        },
        {
            "id": "visual-representations",
            "trigger": "when explaining concepts",
            "confidence": 0.9,
            "domain": "communication",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Visual Representations\n\n## Action\nPrefer diagrams, tables, and structured visual formats over purely textual explanations.\n\n## Evidence\nUser learns best from visual representations per AI Chat Prefs.",
        },
        {
            "id": "why-not-just-how",
            "trigger": "when explaining solutions",
            "confidence": 0.9,
            "domain": "reasoning",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Why Not Just How\n\n## Action\nAlways explain the reasoning (why) behind solutions, not just the implementation (how).\n\n## Evidence\n'How without why is insufficient' - AI Chat Prefs.",
        },
        {
            "id": "short-sentences",
            "trigger": "when writing",
            "confidence": 0.9,
            "domain": "style",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Short Sentences\n\n## Action\nUse short sentences and paragraphs. Concise, information-dense writing.\n\n## Evidence\nExplicitly documented in AI Chat Prefs writing style.",
        },
        {
            "id": "tables-for-comparisons",
            "trigger": "when comparing options",
            "confidence": 0.9,
            "domain": "style",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Tables for Comparisons\n\n## Action\nUse tables when comparing multiple items or options. Required, not optional.\n\n## Evidence\n'Tables are required for comparisons' - AI Chat Prefs.",
        },
        {
            "id": "no-marketing-language",
            "trigger": "when writing",
            "confidence": 0.9,
            "domain": "style",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# No Marketing Language\n\n## Action\nAvoid marketing language, hype, or cliches. Use factual, technical language.\n\n## Evidence\nExplicitly prohibited in AI Chat Prefs language rules.",
        },
        {
            "id": "metric-units",
            "trigger": "when specifying measurements",
            "confidence": 0.9,
            "domain": "style",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Metric Units\n\n## Action\nUse metric units by default unless context requires otherwise.\n\n## Evidence\nDocumented as default in AI Chat Prefs.",
        },
        {
            "id": "state-uncertainty",
            "trigger": "when uncertain about facts",
            "confidence": 0.9,
            "domain": "reasoning",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# State Uncertainty\n\n## Action\nExplicitly state when uncertain. Never present guesses as facts.\n\n## Evidence\n'State uncertainty explicitly' - AI Chat Prefs.",
        },
        {
            "id": "diagnose-before-fixing",
            "trigger": "when asked what went wrong",
            "confidence": 0.9,
            "domain": "workflow",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Diagnose Before Fixing\n\n## Action\n1. Diagnose the problem first\n2. Identify root cause\n3. Then propose fixes\n\nNo solution-jumping before diagnosis.\n\n## Evidence\nAccountability protocol in AI Chat Prefs.",
        },
        {
            "id": "accountability-not-apologies",
            "trigger": "when errors occur",
            "confidence": 0.9,
            "domain": "communication",
            "source": "ai-chat-prefs-bootstrap",
            "body": "# Accountability Not Apologies\n\n## Action\nNo apologies. Show accountability through analysis and correction, not empty words.\n\n## Evidence\n'No apologies (accountability through analysis)' - AI Chat Prefs.",
        },
    ]

    PERSONAL_INSTINCTS_DIR.mkdir(parents=True, exist_ok=True)

    created = 0
    for inst in bootstrap_instincts:
        inst_id = inst["id"]
        filepath = PERSONAL_INSTINCTS_DIR / f"{inst_id}.yaml"

        if filepath.exists() and not args.force:
            print(f"  Skipped (exists): {inst_id}")
            continue

        body = inst.pop("body")
        frontmatter = yaml.dump(inst, default_flow_style=False)
        content = f"---\n{frontmatter}---\n\n{body}"

        filepath.write_text(content)
        print(f"  Created: {inst_id}")
        created += 1

    print(f"\nBootstrapped {created} instincts from AI Chat Prefs")
    print(f"Location: {PERSONAL_INSTINCTS_DIR}")
    return 0


def main():
    parser = argparse.ArgumentParser(
        description="Manage learned behavioral patterns for Claude Code",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # status
    status_parser = subparsers.add_parser("status", help="Show all instincts")
    status_parser.set_defaults(func=cmd_status)

    # export
    export_parser = subparsers.add_parser("export", help="Export instincts")
    export_parser.add_argument("--output", "-o", help="Output file path")
    export_parser.add_argument("--domain", help="Filter by domain")
    export_parser.add_argument("--min-confidence", help="Minimum confidence threshold")
    export_parser.set_defaults(func=cmd_export)

    # import
    import_parser = subparsers.add_parser("import", help="Import instincts")
    import_parser.add_argument("source", help="File path or URL")
    import_parser.add_argument("--dry-run", action="store_true", help="Preview without importing")
    import_parser.add_argument("--min-confidence", help="Minimum confidence threshold")
    import_parser.set_defaults(func=cmd_import)

    # evolve
    evolve_parser = subparsers.add_parser("evolve", help="Analyze and suggest evolutions")
    evolve_parser.add_argument("--generate", action="store_true", help="Generate evolved structures")
    evolve_parser.set_defaults(func=cmd_evolve)

    # bootstrap
    bootstrap_parser = subparsers.add_parser("bootstrap", help="Bootstrap from AI Chat Prefs")
    bootstrap_parser.add_argument("--force", action="store_true", help="Overwrite existing instincts")
    bootstrap_parser.set_defaults(func=cmd_bootstrap)

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return 0

    return args.func(args)


if __name__ == "__main__":
    sys.exit(main() or 0)
