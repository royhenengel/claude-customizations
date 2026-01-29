/**
 * Search for tools across connected MCP servers.
 * Supports lazy loading: if query matches a server name that isn't connected yet,
 * it will connect and index that server's tools before searching.
 */
export async function searchTools(searchIndex, serverPool, config, input) {
    const includeSchema = input.detail === "full";
    const lazyLoaded = [];
    // Check if query matches any server names that aren't indexed yet
    const queryLower = input.query.toLowerCase();
    const allServerNames = Object.keys(config.mcpServers);
    // Find servers that match the query but aren't indexed
    const matchingUnindexedServers = allServerNames.filter(serverName => {
        const matchesQuery = serverName.toLowerCase().includes(queryLower) ||
            queryLower.includes(serverName.toLowerCase());
        const notIndexed = !searchIndex.isServerIndexed(serverName);
        const serverConfig = config.mcpServers[serverName];
        // Don't try to connect to code-executor itself
        const notSelf = serverName !== "code-executor";
        return matchesQuery && notIndexed && notSelf && serverConfig;
    });
    // If user specified a server filter, only try that server
    if (input.server && !searchIndex.isServerIndexed(input.server)) {
        const serverConfig = config.mcpServers[input.server];
        if (serverConfig && input.server !== "code-executor") {
            matchingUnindexedServers.length = 0; // Clear
            matchingUnindexedServers.push(input.server);
        }
    }
    // Lazily connect to matching servers
    for (const serverName of matchingUnindexedServers) {
        try {
            console.error(`[search-tools] Lazy loading server for search: ${serverName}`);
            // Use callTool with a dummy call to trigger connection, or connect directly
            // We need to connect and get tools - let's add a method to ServerPool for this
            const connected = await lazyConnectServer(serverPool, serverName);
            if (connected) {
                // Get the server's tools and add to index
                const server = serverPool.getServer(serverName);
                if (server && server.status === "connected") {
                    const tools = server.tools.map(t => ({
                        server: serverName,
                        tool: t.name,
                        description: t.description,
                        inputSchema: t.inputSchema
                    }));
                    searchIndex.addServerTools(serverName, tools);
                    lazyLoaded.push(serverName);
                }
            }
        }
        catch (error) {
            console.error(`[search-tools] Failed to lazy load ${serverName}:`, error);
        }
    }
    // Now perform the search
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
            query: input.query,
            lazyLoaded: lazyLoaded.length > 0 ? lazyLoaded : undefined
        };
    }
    return {
        ...results,
        query: input.query,
        lazyLoaded: lazyLoaded.length > 0 ? lazyLoaded : undefined
    };
}
/**
 * Lazy connect to a server (triggers connection if not already connected)
 */
async function lazyConnectServer(serverPool, serverName) {
    // Check if already connected
    const existing = serverPool.getServer(serverName);
    if (existing && existing.status === "connected") {
        return true;
    }
    // Try to connect by calling getToolSchema which has lazy loading
    try {
        await serverPool.getToolSchema(serverName, "__dummy__");
        // Check if connection succeeded
        const server = serverPool.getServer(serverName);
        return server?.status === "connected";
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=search-tools.js.map