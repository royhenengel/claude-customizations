import Fuse from "fuse.js";
/**
 * Searchable index of tools across all connected MCP servers
 */
export class ToolSearchIndex {
    fuse = null;
    tools = [];
    /**
     * Build the search index from the server pool
     */
    buildIndex(pool) {
        this.tools = pool.getAllTools();
        this.fuse = new Fuse(this.tools, {
            keys: [
                { name: "tool", weight: 0.4 },
                { name: "description", weight: 0.3 },
                { name: "server", weight: 0.2 }
            ],
            threshold: 0.4, // 0 = exact match, 1 = match anything
            includeScore: true,
            ignoreLocation: true,
            minMatchCharLength: 2
        });
        console.error(`[search-index] Built index with ${this.tools.length} tools`);
    }
    /**
     * Search for tools matching a query
     */
    search(query, options = {}) {
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
    listAll(server) {
        if (server) {
            return this.tools.filter(t => t.server === server);
        }
        return this.tools;
    }
    /**
     * Get total number of indexed tools
     */
    get count() {
        return this.tools.length;
    }
}
//# sourceMappingURL=search-index.js.map