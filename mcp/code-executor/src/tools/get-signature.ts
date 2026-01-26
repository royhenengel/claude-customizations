import type { ServerPool } from "../bridge/server-pool.js";
import type { GetToolSignatureInput } from "../types/index.js";

/**
 * Convert JSON Schema to TypeScript interface string
 */
function jsonSchemaToTypeScript(
  schema: Record<string, unknown>,
  indent = ""
): string {
  if (!schema || typeof schema !== "object") {
    return "unknown";
  }

  const type = schema.type as string;
  const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
  const required = (schema.required as string[]) || [];
  const items = schema.items as Record<string, unknown> | undefined;
  const enumValues = schema.enum as unknown[] | undefined;
  const anyOf = schema.anyOf as Record<string, unknown>[] | undefined;
  const oneOf = schema.oneOf as Record<string, unknown>[] | undefined;

  // Handle enum
  if (enumValues) {
    return enumValues
      .map(v => typeof v === "string" ? `"${v}"` : String(v))
      .join(" | ");
  }

  // Handle anyOf/oneOf
  if (anyOf || oneOf) {
    const variants = anyOf || oneOf || [];
    return variants
      .map(v => jsonSchemaToTypeScript(v, indent))
      .join(" | ");
  }

  // Handle by type
  switch (type) {
    case "string":
      return "string";

    case "number":
    case "integer":
      return "number";

    case "boolean":
      return "boolean";

    case "null":
      return "null";

    case "array":
      if (items) {
        return `Array<${jsonSchemaToTypeScript(items, indent)}>`;
      }
      return "unknown[]";

    case "object":
      if (!properties || Object.keys(properties).length === 0) {
        return "Record<string, unknown>";
      }

      const lines: string[] = ["{"];
      for (const [key, prop] of Object.entries(properties)) {
        const optional = required.includes(key) ? "" : "?";
        const description = prop.description as string | undefined;
        const propType = jsonSchemaToTypeScript(prop, indent + "  ");

        if (description) {
          lines.push(`${indent}  /** ${description} */`);
        }
        lines.push(`${indent}  ${key}${optional}: ${propType};`);
      }
      lines.push(`${indent}}`);
      return lines.join("\n");

    default:
      // No type specified but has properties
      if (properties) {
        return jsonSchemaToTypeScript({ ...schema, type: "object" }, indent);
      }
      return "unknown";
  }
}

/**
 * Get the signature of a specific tool
 */
export async function getToolSignature(
  pool: ServerPool,
  input: GetToolSignatureInput
): Promise<{
  server: string;
  tool: string;
  signature: string;
  description: string;
  annotations?: Record<string, unknown>;
}> {
  const schema = await pool.getToolSchema(input.server, input.tool);

  if (!schema) {
    throw new Error(`Tool not found: ${input.server}/${input.tool}`);
  }

  // Generate TypeScript interface
  const inputType = jsonSchemaToTypeScript(schema.inputSchema);
  const signature = `interface ${input.tool}Input ${inputType}`;

  return {
    server: input.server,
    tool: input.tool,
    signature,
    description: schema.description,
    annotations: schema.annotations as Record<string, unknown> | undefined
  };
}
