import { Fields, ModelAccessPolicy, Modifier, PolicyExpression, TypeData } from '../../types';

import { Types } from '../..';

const compound =
  <T extends Exclude<Types.Fields.Compound, '@@allow' | '@@deny' | '@@prisma.passthrough' | '@@validate'>>(type: T) =>
  (values: T extends '@@map' ? string : string[], ...modifiers: Modifier<T>[]): Fields.Field<T> => ({
    type,
    modifiers: [{ type: 'values', value: values as any }, ...modifiers],
  });

const accessCompound =
  <T extends '@@allow' | '@@deny'>(type: T) =>
  (operation: ModelAccessPolicy['operation'], condition: ModelAccessPolicy['condition']): Fields.Field<T> => ({
    type,
    modifiers: [
      { type: 'operation', value: operation },
      { type: 'condition', value: condition },
    ] as any,
  });

export const Id = compound('@@id');
export const Map = compound('@@map');
export const Index = compound('@@index');
export const Unique = compound('@@unique');
export const Fulltext = compound('@@fulltext');
export const Ignore: Fields.Field<'@@ignore'> = {
  type: '@@ignore',
  modifiers: [],
};

export const Allow = accessCompound('@@allow');
export const Deny = accessCompound('@@deny');

export const PrismaPassThrough = (text: string): Fields.Field<'@@prisma.passthrough'> => ({
  type: '@@prisma.passthrough',
  modifiers: [{ type: 'text', value: text }],
});

export const Validate = (value: string | PolicyExpression, message?: string): Fields.Field<'@@validate'> => ({
  type: '@@validate',
  modifiers: [
    { type: 'value', value },
    { type: 'message', value: message },
  ],
});
