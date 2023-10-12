import { Fields, Modifier } from '../../types';

import { Types } from '../..';

const compound =
  <
    T extends Exclude<
      Types.Fields.Compound,
      '@@allow' | '@@deny' | '@@prisma.passthrough'
    >,
  >(
    type: T,
  ) =>
  (
    values: T extends '@@map' ? string : string[],
    ...modifiers: Modifier<T>[]
  ): Fields.Field<T> => ({
    type,
    modifiers: [{ type: 'values', value: values as any }, ...modifiers],
  });

const accessCompound =
  <
    T extends Extract<
      Types.Fields.Compound,
      '@@allow' | '@@deny' | '@@prisma.passthrough'
    >,
  >(
    type: T,
  ) =>
  (...modifiers: Modifier<T>[]): Fields.Field<T> => ({ type, modifiers });

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
