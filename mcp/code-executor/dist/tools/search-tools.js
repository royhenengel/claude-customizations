/**
 * Search for tools across connected MCP servers
 */
export async function searchTools(searchIndex, input) {
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
//# sourceMappingURL=search-tools.js.map