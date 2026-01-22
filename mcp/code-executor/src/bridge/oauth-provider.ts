import { createServer, type Server } from "http";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { randomBytes } from "crypto";
import type { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js";
import type { OAuthClientMetadata, OAuthClientInformationMixed, OAuthTokens } from "@modelcontextprotocol/sdk/shared/auth.js";

const TOKEN_DIR = resolve(process.env.HOME || "~", ".claude", "mcp-tokens");
const CALLBACK_PORT = 8976;

/**
 * Simple OAuth client provider for CLI usage.
 * Stores tokens in ~/.claude/mcp-tokens/<server-name>.json
 * Uses a local HTTP server to receive OAuth callbacks.
 */
export class CLIOAuthProvider implements OAuthClientProvider {
  private serverName: string;
  private tokenPath: string;
  private _codeVerifier: string | null = null;
  private _state: string | null = null;
  private callbackServer: Server | null = null;
  private authorizationPromise: Promise<string> | null = null;
  private authorizationResolve: ((code: string) => void) | null = null;

  constructor(serverName: string) {
    this.serverName = serverName;
    this.tokenPath = resolve(TOKEN_DIR, `${serverName}.json`);

    // Ensure token directory exists
    if (!existsSync(TOKEN_DIR)) {
      mkdirSync(TOKEN_DIR, { recursive: true });
    }
  }

  get redirectUrl(): string {
    return `http://localhost:${CALLBACK_PORT}/callback`;
  }

  get clientMetadata(): OAuthClientMetadata {
    return {
      client_name: `Code Executor MCP Client (${this.serverName})`,
      redirect_uris: [this.redirectUrl],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none" // Public client
    };
  }

  state(): string {
    if (!this._state) {
      this._state = randomBytes(32).toString("hex");
    }
    return this._state;
  }

  async clientInformation(): Promise<OAuthClientInformationMixed | undefined> {
    const data = this.loadStoredData();
    return data?.clientInfo;
  }

  async saveClientInformation(clientInformation: OAuthClientInformationMixed): Promise<void> {
    const data = this.loadStoredData() || {};
    data.clientInfo = clientInformation;
    this.saveStoredData(data);
  }

  async tokens(): Promise<OAuthTokens | undefined> {
    const data = this.loadStoredData();
    return data?.tokens;
  }

  async saveTokens(tokens: OAuthTokens): Promise<void> {
    const data = this.loadStoredData() || {};
    data.tokens = tokens;
    this.saveStoredData(data);
    console.error(`[oauth] Tokens saved for ${this.serverName}`);
  }

  async redirectToAuthorization(authorizationUrl: URL): Promise<void> {
    console.error(`[oauth] Starting authorization flow for ${this.serverName}`);
    console.error(`[oauth] Please open this URL in your browser:`);
    console.error(authorizationUrl.toString());

    // Start callback server
    await this.startCallbackServer();

    // Try to open browser automatically
    try {
      const { exec } = await import("child_process");
      const platform = process.platform;
      const cmd = platform === "darwin" ? "open" :
                  platform === "win32" ? "start" : "xdg-open";
      exec(`${cmd} "${authorizationUrl.toString()}"`);
    } catch {
      // Ignore - user can open URL manually
    }
  }

  async saveCodeVerifier(codeVerifier: string): Promise<void> {
    this._codeVerifier = codeVerifier;
  }

  async codeVerifier(): Promise<string> {
    if (!this._codeVerifier) {
      throw new Error("No code verifier available");
    }
    return this._codeVerifier;
  }

  /**
   * Wait for the authorization callback
   */
  async waitForAuthorizationCode(timeoutMs: number = 120000): Promise<string> {
    if (!this.authorizationPromise) {
      throw new Error("No authorization in progress");
    }

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Authorization timeout")), timeoutMs);
    });

    try {
      return await Promise.race([this.authorizationPromise, timeout]);
    } finally {
      this.stopCallbackServer();
    }
  }

  private async startCallbackServer(): Promise<void> {
    if (this.callbackServer) {
      return;
    }

    this.authorizationPromise = new Promise((resolve) => {
      this.authorizationResolve = resolve;
    });

    this.callbackServer = createServer((req, res) => {
      const url = new URL(req.url || "", `http://localhost:${CALLBACK_PORT}`);

      if (url.pathname === "/callback") {
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const error = url.searchParams.get("error");

        if (error) {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end(`<html><body><h1>Authorization Failed</h1><p>${error}</p></body></html>`);
          return;
        }

        if (code && state === this._state) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`<html><body><h1>Authorization Successful</h1><p>You can close this window.</p></body></html>`);

          if (this.authorizationResolve) {
            this.authorizationResolve(code);
          }
        } else {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end(`<html><body><h1>Invalid Callback</h1></body></html>`);
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    return new Promise((resolve, reject) => {
      this.callbackServer!.listen(CALLBACK_PORT, () => {
        console.error(`[oauth] Callback server listening on port ${CALLBACK_PORT}`);
        resolve();
      });
      this.callbackServer!.on("error", reject);
    });
  }

  private stopCallbackServer(): void {
    if (this.callbackServer) {
      this.callbackServer.close();
      this.callbackServer = null;
    }
  }

  private loadStoredData(): { tokens?: OAuthTokens; clientInfo?: OAuthClientInformationMixed } | null {
    try {
      if (existsSync(this.tokenPath)) {
        return JSON.parse(readFileSync(this.tokenPath, "utf-8"));
      }
    } catch (error) {
      console.error(`[oauth] Failed to load stored data:`, error);
    }
    return null;
  }

  private saveStoredData(data: { tokens?: OAuthTokens; clientInfo?: OAuthClientInformationMixed }): void {
    try {
      writeFileSync(this.tokenPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`[oauth] Failed to save data:`, error);
    }
  }

  /**
   * Clear stored tokens and client info
   */
  clearTokens(): void {
    try {
      if (existsSync(this.tokenPath)) {
        writeFileSync(this.tokenPath, "{}");
      }
    } catch {
      // Ignore
    }
  }
}
