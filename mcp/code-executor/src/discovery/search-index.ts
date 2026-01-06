import Fuse from "fuse.js";
import type { ToolIndex } from "../types/index.js";
import type { ServerPool } from "../bridge/server-pool.js";

/**
 * Searchable index of tools across all connected MCP servers
 */
export class ToolSearchIndex {
  private fuse: Fuse<ToolIndex> | null = null;
  private tools: ToolIndex[] = [];

  /**
   * Build the search index from the server pool
   */
  buildIndex(pool: ServerPool): void {
    this.tools = pool.getAllTools();

    this.fuse = new Fuse(this.tools, {
      keys: [
        { name: "tool", weight: 0.4 },
        { name: "description", weight: 0.3 },
        { name: "server", weight: 0.2 }
      ],
      threshold: 0.4,  // 0 = exact match, 1 = match anything
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2
    });

    console.error(`[search-index] Built index with ${this.tools.length} tools`);
  }

  /**
   * Search for tools matching a query
   */
  search(
    query: string,
    options: {
      server?: string;
      limit?: number;
      includeSchema?: boolean;
    } = {}
  ): {
    tools: Array<{
      server: string;
      tool: string;
      description: string;
      score?: number;
      inputSchema?: Record<string, unknown>;
    }>;
    total: number;
  } {
    const { server, limit = 10, includeSchema = false } = options;

    if (!this.fuse) {
      return { tools: [], total: 0 };
    }

    // Perform fuzzy search
    let results = this.fuse.search(query);

    // Filter by server if specified
    if (server) {
      results = results.filter(r => r.item.server === server);
    }

    // Limit results
    const limited = results.slice(0, limit);

    return {
      tools: limited.map(r => ({
        server: r.item.server,
        tool: r.item.tool,
        description: r.item.description,
        score: r.score ? Math.round((1 - r.score) * 100) / 100 : undefined,
        inputSchema: includeSchema ? r.item.inputSchema : undefined
      })),
      total: results.length
    };
  }

  /**
   * Get all tools (optionally filtered by server)
   */
  listAll(server?: string): ToolIndex[] {
    if (server) {
      return this.tools.filter(t => t.server === server);
    }
    return this.tools;
  }

  /**
   * Get total number of indexed tools
   */
  get count(): number {
    return this.tools.length;
  }
}
