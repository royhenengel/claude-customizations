# Workflow: /map-codebase

## Purpose

Analyze an existing codebase to understand its structure, patterns, and conventions. Creates `planning/CODEBASE.md` with findings.

## When to Use

- Automatically during `/start` for brownfield projects
- Manually when joining an existing project
- When needing to understand unfamiliar code

## Steps

### 1. Detect Project Type

```bash
# Check for package managers and config files
ls package.json pyproject.toml Cargo.toml go.mod pom.xml build.gradle Gemfile composer.json 2>/dev/null
```

Identify primary language and framework from:
- Package manager files
- Config files (tsconfig.json, .eslintrc, etc.)
- File extensions in src/

### 2. Map Directory Structure

```bash
# Get top-level structure
ls -la

# Get source directories (common patterns)
ls -la src/ lib/ app/ packages/ 2>/dev/null
```

Identify:
- **Source directories**: Where the code lives
- **Test directories**: test/, tests/, __tests__/, spec/
- **Config directories**: .config/, config/
- **Build output**: dist/, build/, out/, target/
- **Documentation**: docs/, doc/

### 3. Identify Entry Points

Look for:
- `main` field in package.json
- `index.*` files in root or src/
- `app.*` or `main.*` files
- CLI entry points in bin/
- Server entry points (server.*, app.*)

### 4. Analyze Dependencies

```bash
# Node.js
cat package.json | jq '.dependencies, .devDependencies' 2>/dev/null

# Python
cat requirements.txt pyproject.toml 2>/dev/null | head -30

# Other ecosystems as appropriate
```

Categorize dependencies:
- **Framework**: React, Vue, Django, Rails, etc.
- **Database**: Prisma, TypeORM, SQLAlchemy, etc.
- **Testing**: Jest, Pytest, RSpec, etc.
- **Build tools**: Webpack, Vite, esbuild, etc.

### 5. Detect Patterns and Conventions

Scan for:
- **Architecture pattern**: MVC, Clean Architecture, Feature-based, etc.
- **State management**: Redux, Zustand, Pinia, etc.
- **API style**: REST, GraphQL, tRPC, etc.
- **Styling**: CSS Modules, Tailwind, Styled Components, etc.

Look at existing code structure:
```bash
# Sample a few files to understand patterns
head -50 src/index.* src/app.* src/main.* 2>/dev/null
```

### 6. Check Testing Setup

```bash
# Find test files
find . -name "*.test.*" -o -name "*.spec.*" -o -name "*_test.*" 2>/dev/null | head -10

# Check test config
ls jest.config.* vitest.config.* pytest.ini .rspec 2>/dev/null
```

Note:
- Test framework in use
- Test file naming convention
- Test directory structure
- Coverage configuration

### 7. Check Build/Deploy Configuration

Look for:
- **CI/CD**: .github/workflows/, .gitlab-ci.yml, Jenkinsfile
- **Docker**: Dockerfile, docker-compose.yml
- **Deploy**: vercel.json, netlify.toml, fly.toml
- **Build scripts**: in package.json scripts or Makefile

### 8. Generate CODEBASE.md

Create `planning/CODEBASE.md`:

```markdown
# Codebase Map

**Generated**: {timestamp}
**Project Type**: {language/framework}

## Structure

```text
{directory tree of key folders}
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | {language + version if detectable} |
| Framework | {main framework} |
| Database | {database/ORM if present} |
| Testing | {test framework} |
| Build | {build tools} |
| Deploy | {deployment target} |

## Entry Points

- **Main**: {primary entry point}
- **API**: {API entry if different}
- **CLI**: {CLI entry if present}

## Key Directories

| Directory | Purpose |
|-----------|---------|
| src/ | {description} |
| {other key dirs} | {description} |

## Patterns Observed

- **Architecture**: {pattern identified}
- **State Management**: {if applicable}
- **API Style**: {REST/GraphQL/etc}
- **Styling**: {CSS approach}

## Testing

- **Framework**: {test framework}
- **Location**: {test directory}
- **Naming**: {*.test.ts, *.spec.js, etc}
- **Coverage**: {coverage tool if configured}

## Build & Deploy

- **Build Command**: {npm run build, etc}
- **Dev Command**: {npm run dev, etc}
- **CI/CD**: {GitHub Actions, etc}
- **Deploy Target**: {Vercel, AWS, etc}

## Notes

{Any unusual patterns, legacy code areas, or things to be aware of}
```

### 9. Update CLAUDE.md Reference

If `planning/CLAUDE.md` exists, ensure it references CODEBASE.md:

```markdown
## Codebase Context

@planning/CODEBASE.md
```

## Output

- `planning/CODEBASE.md` - Complete codebase map
- Updated `planning/CLAUDE.md` - References codebase map

## Tips

- Focus on what's useful for planning, not exhaustive documentation
- Note any inconsistencies or technical debt observed
- Highlight patterns that should be followed in new code
- Keep it concise - this is context, not documentation
