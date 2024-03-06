import { Block } from './blocks';
import { Plugin } from './plugins';
import path from 'path';

export type Provider = 'mongodb' | 'postgresql' | 'mysql' | 'sqlite' | 'sqlserver' | 'cockroachdb';

export type Datasource = {
  provider: Provider;
  url: string;
  directUrl?: string;
  shadowDatabaseUrl?: string;
  referentialIntegrity?: 'prisma' | 'foreignKeys';
};

export type Generator = {
  name: string;
  provider: string;
  output?: string;
  previewFeatures?: string[];
  engineType?: 'library' | 'binary';
  binaryTargets?: string[]; // TODO: enum
};

export type Config = {
  datasource: Datasource;
  generators: Generator[];
  plugins?: Plugin[];
  output?: string;
  schema: Block[] | Record<string, Block>;
};

export const validate = (config: Config): Config => {
  if (config.datasource.referentialIntegrity) {
    if (!config.generators.some(g => g.previewFeatures?.includes('referentialIntegrity')))
      throw new Error(
        "Must have a generator with the 'referentialIntegrity' preview feature enabled to use referential integrity in the datasource",
      );
  }

  if (config.datasource.provider == 'mysql') {
    if (
      config.generators.some(
        g => g.previewFeatures?.includes('fullTextSearch') && !g.previewFeatures?.includes('fullTextIndex'),
      )
    )
      throw new Error('MySQL Users must include both fullTextSearch & fullTextIndex in the preview features.');
  }

  return {
    ...config,
    output: config.output || path.join(process.cwd(), 'schema.prisma'),
  };
};
