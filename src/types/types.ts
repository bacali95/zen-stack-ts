import { JsonValue } from '../codegen/lib/json';
import { MergeDbModifiers } from './modifiers';
import { Model } from './blocks';
import { ReferentialAction } from './fields';
import { Types } from '..';

type Append<T, K> = { [index in keyof T]: T[index] & K };

type AccessPolicy<T> = {
  operation: T;
  condition: string | Types.PolicyExpression;
};

export type FieldAccessPolicy = AccessPolicy<'all' | ('read' | 'update')[]>;

export type ModelAccessPolicy = AccessPolicy<'all' | ('create' | 'read' | 'update' | 'delete')[]>;

export type NumberValidationModifiers<T extends number | BigInt = number> = {
  gt?: {
    value: T;
    message?: string;
  };
  gte?: {
    value: T;
    message?: string;
  };
  lt?: {
    value: T;
    message?: string;
  };
  lte?: {
    value: T;
    message?: string;
  };
};

export type Scalars = Append<
  {
    String: {
      unique?: true;
      id?: true;
      default?: string | 'auto()';
      limit?: number;
      password?: {
        saltLength?: number;
        salt?: string;
      };
      email?: string;
      length?: {
        min?: number;
        max?: number;
        message?: string;
      };
      startsWith?: {
        text: string;
        message?: string;
      };
      endsWith?: {
        text: string;
        message?: string;
      };
      contains?: {
        text: string;
        message?: string;
      };
      url?: string;
      datetime?: string;
      regex?: {
        regex: string;
        message?: string;
      };
    };
    Int: {
      unique?: true;
      id?: true;
      default?: 'cuid()' | 'autoincrement()' | 'uuid()' | number;
    } & NumberValidationModifiers;
    Float: {
      unique?: true;
      default?: number;
    } & NumberValidationModifiers;
    BigInt: {
      unique?: true;
      default?: BigInt;
    } & NumberValidationModifiers<BigInt>;
    Bytes: {
      unique?: true;
      default?: never;
    } & NumberValidationModifiers;
    Decimal: {
      unique?: true;
      default?: number;
    } & NumberValidationModifiers;
    Boolean: {
      unique?: true;
      default?: boolean;
    };
    DateTime: {
      default?: 'now()';
      updatedAt?: true;
    };
    Json: { default?: JsonValue };
  },
  {
    nullable?: boolean;
    map?: string;
    ignore?: true;
    raw?: string;
    array?: true;
    comment?: string;
    omit?: true;
    'prisma.passthrough': string;
    allow: FieldAccessPolicy;
    deny: FieldAccessPolicy;
  }
>;

export type Enums = {
  Enum: {
    id?: true;
    nullable?: boolean;
    default?: string;
    ignore?: true;
    array?: true;
    comment?: string;

    // Enum of which this is from
    enum: string;

    omit?: true;
    'prisma.passthrough': string;
    allow: FieldAccessPolicy;
    deny: FieldAccessPolicy;
  };
  // An entry in the enum, e.g. Enum("name", Key("Id", Map("_id")))
  EnumKey: {
    map?: string;
    comment?: string;
  };
};

export type Reference = [reference: string, scalar?: Types.Fields.Field<'Int'> | Types.Fields.Field<'String'>];

export type Relations = Append<
  {
    OneToMany: {};
    OneToOne: {
      fields?: string[] | Reference;
      references?: string[];
      onUpdate?: ReferentialAction;
      onDelete?: ReferentialAction;
      nullable?: boolean;
    };
    ManyToOne: {
      fields: string[] | Reference;
      references: string[];
      onUpdate?: ReferentialAction;
      onDelete?: ReferentialAction;
      nullable?: boolean;
    };
  },
  { name?: string; model: Model; comment?: string }
>;

export type Compounds = Append<
  {
    '@@id': {};
    '@@unique': { map: string };
    '@@index': { map: string };
    '@@ignore': {};
    '@@map': {};
    '@@fulltext': {};
  },
  { values: string[]; comment?: string }
> & {
  '@@allow': ModelAccessPolicy;
  '@@deny': ModelAccessPolicy;
  '@@prisma.passthrough': { text: string };
  '@@validate': {
    value: string | Types.PolicyExpression;
    message?: string;
  };
};

export type TypeData = MergeDbModifiers<Scalars> &
  Compounds &
  Enums &
  Relations & {
    Comment: { value: string };
    Raw: { value: string };
    Unsupported: { unsupported: string; nullable?: boolean };
  };

// All possible column datatypes & their accepted modifiers/parameters
export type Type = keyof TypeData;
