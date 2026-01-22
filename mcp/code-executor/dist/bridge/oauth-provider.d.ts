import type { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js";
import type { OAuthClientMetadata, OAuthClientInformationMixed, OAuthTokens } from "@modelcontextprotocol/sdk/shared/auth.js";
/**
 * Simple OAuth client provider for CLI usage.
 * Stores tokens in ~/.claude/mcp-tokens/<server-name>.json
 * Uses a local HTTP server to receive OAuth callbacks.
 */
export declare class CLIOAuthProvider implements OAuthClientProvider {
    private serverName;
    private tokenPath;
    private _codeVerifier;
    private _state;
    private callbackServer;
    private authorizationPromise;
    private authorizationResolve;
    constructor(serverName: string);
    get redirectUrl(): string;
    get clientMetadata(): OAuthClientMetadata;
    state(): string;
    clientInformation(): Promise<OAuthClientInformationMixed | undefined>;
    saveClientInformation(clientInformation: OAuthClientInformationMixed): Promise<void>;
    tokens(): Promise<OAuthTokens | undefined>;
    saveTokens(tokens: OAuthTokens): Promise<void>;
    redirectToAuthorization(authorizationUrl: URL): Promise<void>;
    saveCodeVerifier(codeVerifier: string): Promise<void>;
    codeVerifier(): Promise<string>;
    /**
     * Wait for the authorization callback
     */
    waitForAuthorizationCode(timeoutMs?: number): Promise<string>;
    private startCallbackServer;
    private stopCallbackServer;
    private loadStoredData;
    private saveStoredData;
    /**
     * Clear stored tokens and client info
     */
    clearTokens(): void;
}
//# sourceMappingURL=oauth-provider.d.ts.map