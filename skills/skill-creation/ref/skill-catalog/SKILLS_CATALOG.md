# Claude Skills Catalog

Source: https://github.com/ComposioHQ/awesome-claude-skills

## Document Processing

| Skill | Description | Source |
|-------|-------------|--------|
| docx | Create and edit Word documents with tracked changes and comments | anthropics/skills/document-skills/docx |
| pdf | Extract text, tables, metadata; merge and annotate PDFs | anthropics/skills/document-skills/pdf |
| pptx | Read, generate, and adjust presentation slides | anthropics/skills/document-skills/pptx |
| xlsx | Spreadsheet manipulation with formulas and charts | anthropics/skills/document-skills/xlsx |
| markdown-to-epub | Convert markdown documents into EPUB ebook files | smerchek/claude-epub-skill |

## Development & Code Tools

| Skill | Description | Source |
|-------|-------------|--------|
| artifacts-builder | Create multi-component HTML artifacts using React and Tailwind CSS | composio/awesome-claude-skills |
| aws-skills | AWS development with CDK and serverless patterns | composio/awesome-claude-skills |
| changelog-generator | Transform git commits into customer-friendly release notes | composio/awesome-claude-skills |
| claude-code-terminal-title | Dynamic terminal titles describing active work | composio/awesome-claude-skills |
| d3-visualization | Produce D3 charts and interactive data visualizations | composio/awesome-claude-skills |
| ffuf-web-fuzzing | Run web fuzzing tasks and analyze vulnerability results | composio/awesome-claude-skills |
| ios-simulator | Interact with iOS Simulator for app testing | composio/awesome-claude-skills |
| mcp-builder | Guidance for creating MCP servers using Python or TypeScript | composio/awesome-claude-skills |
| move-code-quality | Analyze Move language packages against official checklists | composio/awesome-claude-skills |
| playwright-automation | Model-invoked Playwright testing for web applications | composio/awesome-claude-skills |
| skill-creator | Guidance for creating effective Claude Skills | composio/awesome-claude-skills |
| software-architecture | Implements design patterns and SOLID principles | composio/awesome-claude-skills |
| subagent-development | Dispatches independent subagents with code review checkpoints | composio/awesome-claude-skills |
| test-driven-development | Feature implementation before writing code | composio/awesome-claude-skills |
| webapp-testing | Test local web applications using Playwright | composio/awesome-claude-skills |

## Data & Analysis

| Skill | Description | Source |
|-------|-------------|--------|
| csv-data-summarizer | Analyze CSV files and generate insights with visualizations | composio/awesome-claude-skills |
| root-cause-tracing | Trace errors back to original triggers | composio/awesome-claude-skills |

## Business & Marketing

| Skill | Description | Source |
|-------|-------------|--------|
| brand-guidelines | Apply official brand colors and typography to artifacts | composio/awesome-claude-skills |
| competitive-ads-extractor | Extract and analyze competitor ads from ad libraries | composio/awesome-claude-skills |
| domain-name-brainstormer | Generate creative domain ideas and check availability | composio/awesome-claude-skills |
| internal-comms | Write company newsletters, FAQs, and status reports | composio/awesome-claude-skills |
| lead-research-assistant | Identify and qualify high-quality leads | composio/awesome-claude-skills |

## Communication & Writing

| Skill | Description | Source |
|-------|-------------|--------|
| article-extractor | Extract full article text and metadata from web pages | composio/awesome-claude-skills |
| brainstorming | Transform rough ideas into fully-formed designs | composio/awesome-claude-skills |
| content-research-writer | Conduct research, add citations, improve hooks | composio/awesome-claude-skills |
| family-history-research | Assistance with genealogy research planning | composio/awesome-claude-skills |
| meeting-insights-analyzer | Analyze transcripts for behavioral patterns | composio/awesome-claude-skills |
| notebooklm-integration | Chat with NotebookLM for source-grounded answers | composio/awesome-claude-skills |

## Creative & Media

| Skill | Description | Source |
|-------|-------------|--------|
| canvas-design | Create visual art in PNG and PDF using design principles | composio/awesome-claude-skills |
| image-enhancer | Improve image quality and resolution | composio/awesome-claude-skills |
| slack-gif-creator | Create animated GIFs optimized for Slack | composio/awesome-claude-skills |
| theme-factory | Apply professional themes to artifacts (10 pre-set themes) | composio/awesome-claude-skills |
| video-downloader | Download videos from YouTube and other platforms | composio/awesome-claude-skills |
| youtube-transcript | Fetch YouTube video transcripts and summaries | composio/awesome-claude-skills |

## Productivity & Organization

| Skill | Description | Source |
|-------|-------------|--------|
| file-organizer | Intelligently organize files and folders | composio/awesome-claude-skills |
| invoice-organizer | Organize invoices and receipts for tax preparation | composio/awesome-claude-skills |
| kaizen | Apply continuous improvement methodology | composio/awesome-claude-skills |
| n8n-skills | Understand and operate n8n workflows | composio/awesome-claude-skills |
| raffle-winner-picker | Randomly select winners with cryptographically secure randomness | composio/awesome-claude-skills |
| ship-learn-next | Iterate on development priorities using feedback loops | composio/awesome-claude-skills |
| tapestry | Interlink and summarize related documents | composio/awesome-claude-skills |

## Collaboration & Project Management

| Skill | Description | Source |
|-------|-------------|--------|
| git-pushing | Automate git operations and repository interactions | composio/awesome-claude-skills |
| review-implementing | Evaluate code implementation plans | composio/awesome-claude-skills |
| test-fixing | Detect failing tests and propose fixes | composio/awesome-claude-skills |

## Security & Systems

| Skill | Description | Source |
|-------|-------------|--------|
| computer-forensics | Digital forensics analysis techniques | composio/awesome-claude-skills |
| file-deletion | Secure file deletion and data sanitization | composio/awesome-claude-skills |
| metadata-extraction | Extract and analyze file metadata | composio/awesome-claude-skills |
| threat-hunting-sigma | Hunt threats using Sigma detection rules | composio/awesome-claude-skills |

---

## Installation

To install any skill from this catalog:

```bash
# Option 1: Clone specific skill from awesome-claude-skills
git clone --depth 1 https://github.com/ComposioHQ/awesome-claude-skills.git /tmp/awesome-skills
cp -r /tmp/awesome-skills/skills/<skill-name> ~/.claude/skills/
rm -rf /tmp/awesome-skills

# Option 2: For Anthropic official skills
git clone --depth 1 https://github.com/anthropics/skills.git /tmp/anthropic-skills
cp -r /tmp/anthropic-skills/<skill-path> ~/.claude/skills/
rm -rf /tmp/anthropic-skills
```

## Keywords Index

For quick searching:

- **PDF, documents, Word, Excel, PowerPoint:** docx, pdf, pptx, xlsx
- **Testing, Playwright, automation:** playwright-automation, webapp-testing, ios-simulator
- **Git, commits, code review:** git-pushing, changelog-generator, review-implementing
- **AWS, cloud, serverless:** aws-skills
- **YouTube, video, media:** youtube-transcript, video-downloader, slack-gif-creator
- **Data, CSV, analysis:** csv-data-summarizer, root-cause-tracing
- **Writing, content, research:** content-research-writer, article-extractor, brainstorming
- **Security, forensics:** computer-forensics, threat-hunting-sigma, metadata-extraction
- **Design, themes, visuals:** canvas-design, theme-factory, brand-guidelines
- **MCP, skills, building:** mcp-builder, skill-creator
