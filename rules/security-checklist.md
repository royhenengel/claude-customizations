# Security Checklist

**Domain:** Security - credential handling, vulnerability prevention, and incident response.

Verify before every commit.

## Pre-Commit Checks

1. [ ] **No hardcoded credentials** - API keys, passwords, tokens in env vars only
2. [ ] **Input validation** - All external input validated (user input, API responses, file content)
3. [ ] **Injection prevention** - SQL queries parameterized, shell commands escaped
4. [ ] **XSS mitigation** - User content escaped before rendering
5. [ ] **CSRF protection** - State-changing operations require tokens
6. [ ] **Authentication verified** - Protected routes check auth
7. [ ] **Rate limiting** - Public endpoints have rate limits
8. [ ] **Secure error handling** - Errors logged, not exposed to users

## Credential Pattern

NEVER:
```javascript
const apiKey = "sk-abc123...";
```

ALWAYS:
```javascript
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error("API_KEY not configured");
```

## Incident Response

If vulnerability detected:
1. Stop current work
2. Assess severity (critical/high/medium/low)
3. Fix before continuing
4. Scan codebase for similar patterns
