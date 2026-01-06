import type { SearchToolsInput } from "../types/index.js";
import type { ToolSearchIndex } from "../discovery/search-index.js";
/**
 * Search for tools across connected MCP servers
 */
export declare function searchTools(searchIndex: ToolSearchIndex, input: SearchToolsInput): Promise<{
    tools: Array<{
        server: string;
        tool: string;
        description: string;
        score?: number;
        inputSchema?: Record<string, unknown>;
    }>;
    total: number;
    query: string;
}>;
//# sourceMappingURL=search-tools.d.ts.map