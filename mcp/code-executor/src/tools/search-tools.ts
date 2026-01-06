import type { SearchToolsInput } from "../types/index.js";
import type { ToolSearchIndex } from "../discovery/search-index.js";

/**
 * Search for tools across connected MCP servers
 */
export async function searchTools(
  searchIndex: ToolSearchIndex,
  input: SearchToolsInput
): Promise<{
  tools: Array<{
    server: string;
    tool: string;
    description: string;
    score?: number;
    inputSchema?: Record<string, unknown>;
  }>;
  total: number;
  query: string;
}> {
  const includeSchema = input.detail === "full";

  const results = searchIndex.search(input.query, {
    server: input.server,
    limit: input.limit,
    includeSchema
  });

  // For "minimal" detail, strip descriptions too
  if (input.detail === "minimal") {
    return {
      tools: results.tools.map(t => ({
        server: t.server,
        tool: t.tool,
        description: t.description.slice(0, 100) + (t.description.length > 100 ? "..." : "")
      })),
      total: results.total,
      query: input.query
    };
  }

  return {
    ...results,
    query: input.query
  };
}
