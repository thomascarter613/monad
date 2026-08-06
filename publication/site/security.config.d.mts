export declare const securityContractVersion: string;
export declare function booleanEnvironment(value: unknown, fallback?: boolean): boolean;
export declare function contentSecurityPolicy(options?: {
  development?: boolean;
  httpsOnly?: boolean;
}): string;
export declare function securityHeaders(options?: {
  development?: boolean;
  hsts?: boolean;
}): Array<{ key: string; value: string }>;
