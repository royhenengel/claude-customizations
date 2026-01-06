/**
 * List all connected MCP servers and their status
 */
export async function listServers(pool) {
    const servers = pool.listServers(true);
    return {
        servers: servers.map(s => ({
            name: s.name,
            status: s.status,
            toolCount: s.toolCount,
            tools: s.tools
        })),
        totalTools: pool.getTotalToolCount()
    };
}
//# sourceMappingURL=list-servers.js.map