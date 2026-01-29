import Fuse from "fuse.js";
/**
 * Searchable index of tools across all connected MCP servers
 */
export class ToolSearchIndex {
    fuse = null;
    tools = [];
    indexedServers = new Set();
    /**
     * Build the search index from the server pool
     */
    buildIndex(pool) {
        this.tools = pool.getAllTools();
        // Track which servers are indexed
        this.indexedServers.clear();
        for (const tool of this.tools) {
            this.indexedServers.add(tool.server);
        }
        this.rebuildFuseIndex();
        console.error(`[search-index] Built index with ${this.tools.length} tools from ${this.indexedServers.size} servers`);
    }
    /**
     * Add tools from a newly-connected server to the index
     */
    addServerTools(serverName, tools) {
        if (this.indexedServers.has(serverName)) {
            return; // Already indexed
        }
        this.tools.push(...tools);
        this.indexedServers.add(serverName);
        this.rebuildFuseIndex();
        console.error(`[search-index] Added ${tools.length} tools from ${serverName}, total: ${this.tools.length}`);
    }
    /**
     * Check if a server is already indexed
     */
    isServerIndexed(serverName) {
        return this.indexedServers.has(serverName);
    }
    /**
     * Rebuild the Fuse.js index
     */
    rebuildFuseIndex() {
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