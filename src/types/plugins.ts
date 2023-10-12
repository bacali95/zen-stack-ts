type BasePlugin = {
  name: string;
  output?: string;
};

export type CorePlugin = BasePlugin & {
  provider: '@core/prisma';
  generateClient?: boolean;
  format?: boolean;
};

export type ModelMetaPlugin = BasePlugin & {
  provider: '@core/model-meta';
  compile?: boolean;
  preserveTsFiles?: boolean;
};

export type AccessPolicyPlugin = BasePlugin & {
  provider: '@core/access-policy';
  compile?: boolean;
  preserveTsFiles?: boolean;
};

export type ZodPlugin = BasePlugin & {
  provider: '@core/zod';
  modelOnly?: boolean;
  compile?: boolean;
  preserveTsFiles?: boolean;
  noUncheckedInput?: boolean;
};

export type SwrPlugin = BasePlugin & {
  provider: '@zenstackhq/swr';
  output: string;
  useSuperJson?: boolean;
};

export type TanStackQueryPlugin = BasePlugin & {
  provider: '@zenstackhq/tanstack-query';
  output: string;
  target: 'react' | 'svelte';
  useSuperJson?: boolean;
};

export type TrpcPlugin = BasePlugin & {
  provider: '@zenstackhq/trpc';
  output: string;
  generateModelActions?: string | string[];
  generateClientHelpers?: 'react' | 'next' | ('react' | 'next')[];
  zodSchemasImport?: string;
};

type Flow = {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
};

export type OpenApiPlugin = BasePlugin & {
  provider: '@zenstackhq/openapi';
  output: string;
  flavor?: 'rpc' | 'rest';
  specVersion?: string;
  title?: string;
  version?: string;
  prefix?: string;
  description?: string;
  summary?: string;
  securitySchemes?: {
    [name: string]:
      | { type: 'http'; scheme: 'basic' }
      | { type: 'http'; scheme: 'bearer'; bearerFormat?: string }
      | { type: 'http'; scheme: string; [option: string]: any }
      | { type: 'apiKey'; in: 'header' | 'query' | 'cookie'; name: string }
      | {
          type: 'oauth2';
          description: string;
          flows: {
            authorizationCode?: Flow;
            implicit?: Omit<Flow, 'tokenUrl'>;
            password?: Omit<Flow, 'authorizationUrl'>;
            clientCredentials?: Omit<Flow, 'authorizationUrl'>;
          };
        }
      | { type: 'openIdConnect'; openIdConnectUrl: string };
  };
};

export type Plugin =
  | CorePlugin
  | ModelMetaPlugin
  | AccessPolicyPlugin
  | ZodPlugin
  | SwrPlugin
  | TanStackQueryPlugin
  | TrpcPlugin
  | OpenApiPlugin;
