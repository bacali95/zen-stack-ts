import * as Types from '../types';

export const Default = <T extends Types.Fields.Scalar, K extends Types.TypeData[T]['default']>(
  value: K,
): Types.Modifier<T, 'default'> => ({ type: 'default', value });

export const Map = <
  T extends Types.Fields.Scalar | 'EnumKey' | '@@unique' | '@@index',
  K extends Types.TypeData[T]['map'],
>(
  value: K,
): Types.Modifier<T, 'map'> => ({ type: 'map', value });

export const Unique = {
  type: 'unique',
  value: true,
} as const;

export const UpdatedAt = {
  type: 'updatedAt',
  value: true,
} as const;

export const Nullable = {
  type: 'nullable',
  value: true,
} as const;

export const Id = {
  type: 'id',
  value: true,
} as const;

export const Ignore = {
  type: 'ignore',
  value: true,
} as const;

export const Array = {
  type: 'array',
  value: true,
} as const;

export const Omit = {
  type: 'omit',
  value: true,
} as const;

export const Raw = (value: string) => ({ type: 'raw' as const, value });

// String modifiers
export const Email = <K extends Types.TypeData['String']['email']>(value?: K): Types.Modifier<'String', 'email'> => ({
  type: 'email',
  value,
});

export const Password = <K extends Types.TypeData['String']['password']>(
  value?: K,
): Types.Modifier<'String', 'password'> => ({ type: 'password', value });

export const Limit = <K extends Types.TypeData['String']['limit']>(value: K): Types.Modifier<'String', 'limit'> => ({
  type: 'limit',
  value,
});

export const Length = <K extends Types.TypeData['String']['length']>(
  value?: K,
): Types.Modifier<'String', 'length'> => ({ type: 'length', value });

export const StartsWith = <K extends Types.TypeData['String']['startsWith']>(
  value: K,
): Types.Modifier<'String', 'startsWith'> => ({ type: 'startsWith', value });

export const EndsWith = <K extends Types.TypeData['String']['endsWith']>(
  value: K,
): Types.Modifier<'String', 'endsWith'> => ({ type: 'endsWith', value });

export const Contains = <K extends Types.TypeData['String']['contains']>(
  value: K,
): Types.Modifier<'String', 'contains'> => ({ type: 'contains', value });

export const Url = <K extends Types.TypeData['String']['url']>(value?: K): Types.Modifier<'String', 'url'> => ({
  type: 'url',
  value,
});

export const DateTimeModifier = <K extends Types.TypeData['String']['datetime']>(
  value?: K,
): Types.Modifier<'String', 'datetime'> => ({ type: 'datetime', value });

export const Regex = <K extends Types.TypeData['String']['regex']>(value: K): Types.Modifier<'String', 'regex'> => ({
  type: 'regex',
  value,
});

// Number modifiers
export const GreaterThan = <
  K extends Types.NumberValidationModifiers['gt'],
  Type extends 'Int' | 'Float' | 'BigInt' | 'Decimal' | 'Bytes',
>(
  value: K,
): Types.Modifier<Type, 'gt'> => ({
  type: 'gt',
  value,
});

export const GreaterThanOrEqual = <
  K extends Types.NumberValidationModifiers['gte'],
  Type extends 'Int' | 'Float' | 'BigInt' | 'Decimal' | 'Bytes',
>(
  value: K,
): Types.Modifier<Type, 'gte'> => ({
  type: 'gte',
  value,
});

export const LowerThan = <
  K extends Types.NumberValidationModifiers['lt'],
  Type extends 'Int' | 'Float' | 'BigInt' | 'Decimal' | 'Bytes',
>(
  value: K,
): Types.Modifier<Type, 'lt'> => ({
  type: 'lt',
  value,
});

export const LowerThanOrEqual = <
  K extends Types.NumberValidationModifiers['lte'],
  Type extends 'Int' | 'Float' | 'BigInt' | 'Decimal' | 'Bytes',
>(
  value: K,
): Types.Modifier<Type, 'lte'> => ({
  type: 'lte',
  value,
});

export const PrismaPassThrough = <K extends Types.TypeData['String']['prisma.passthrough']>(
  value: K,
): Types.Modifier<'String', 'prisma.passthrough'> => ({
  type: 'prisma.passthrough',
  value,
});

export const AllowField = <K extends Types.FieldAccessPolicy>(operation: K['operation'], condition: K['condition']) =>
  ({
    type: 'allow',
    value: { operation, condition },
  }) as const;

export const DenyField = <K extends Types.FieldAccessPolicy>(operation: K['operation'], condition: K['condition']) =>
  ({
    type: 'deny',
    value: { operation, condition },
  }) as const;
