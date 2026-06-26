# Schema Markup Analysis Report

## Detection Results

| Page | Status | Existing Markup |
|------|--------|-----------------|
| /compare/alchemyst-ai-vs-mem0 | Added Article Schema | None → Article (✅) |
| /compare/alchemyst-ai-vs-zep | Added Article Schema | None → Article (✅) |
| /compare/alchemyst-ai-vs-palantir | Added Article Schema | None → Article (✅) |
| /compare/alchemyst-ai-vs-databricks | Added Article Schema | None → Article (✅) |
| /compare/alchemyst-ai-vs-snowflake-cortex | Added Article Schema | None → Article (✅) |
| /compare/alchemyst-ai-vs-glean | Added Article Schema | None → Article (✅) |
| /compare/mem0-vs-zep-vs-letta | Added Article Schema | None → Article (✅) |
| /compare/memvid-vs-alchemyst-agent-memory | Added Article Schema | None → Article (✅) |
| /compare/supermemory-vs-alchemyst | Added Article Schema | None → Article (✅) |
| /compare/letta-vs-alchemyst-llm-memory | Added Article Schema | None → Article (✅) |
| /compare/langchain-memory-vs-alchemyst | Added Article Schema | None → Article (✅) |
| /compare/cognee-vs-alchemyst-knowledge-graph | Added Article Schema | None → Article (✅) |
| /compare/openai-memory-vs-deterministic-context | Added Article Schema | None → Article (✅) |
| /compare/claude-memory-vs-alchemyst | Added Article Schema | None → Article (✅) |

## Validation Summary

- **Total pages scanned:** 14 (including `/compare` index)
- **Schema types added:** Article (BlogPosting would also be valid)
- **Required properties present:** ✅ @context, @type, headline, description, url, datePublished, author, publisher
- **No deprecated types detected** (HowTo is deprecated but Article is active)

## Recommendations

1. **Article schema** is appropriate for comparison pages (editorial content)
2. All comparison pages now have structured data for AI engines (ChatGPT, Perplexity, Gemini)
3. BreadcrumbList is already present via Breadcrumbs component (✅)
4. Consider adding Product schema for commercial context if pages include pricing tables

## Notes

- HowTo schema is deprecated for rich results (Sept 2023) but the HowTo guide page retains it for educational context
- Article schema is active and recommended for editorial/comparative content
- All URLs are absolute (https://getalchemystai.com/...) per Google guidance
