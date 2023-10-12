import { Properties, transform } from './transform';
import { Scalars, Type } from '../types/types';

import { Modifier } from '../types/modifiers';
import { expression } from './expressions';
import { nonNullable } from '../types/utils';

// TODO: less shitty way of doing this
export const modifier = <T extends Type>(type: T, modifier: Modifier<T>): string => {
  // @db.TinyInt etc. modifiers
  if ((modifier.type as string).startsWith('@')) {
    // this is rapidly deteriorating lmao
    const type = (modifier.type as string).split('.').pop();
    return `@db.${type}${
      Array.isArray(modifier.value)
        ? !modifier.value.length || modifier.value.every(item => item == undefined)
          ? ''
          : `(${modifier.value.join(', ')})`
        : (modifier.value as any) == undefined
        ? ''
        : `(${modifier.value})`
    }`;
  }

  const stringifyModifier = (modifier: Modifier<T>, transformer: (value: any) => object = value => value) => {
    const args = Object.entries(transformer(modifier.value) ?? {})
      .map(([key, value]) => (!!value ? `${key}: ${typeof value === 'string' ? `"${value}"` : value}` : undefined))
      .filter(nonNullable)
      .join(', ');

    return args.length ? `@${modifier.type as string}(${args})` : `@${modifier.type as string}`;
  };

  let args: string;

  // Non @db modifiers
  switch (modifier.type) {
    case 'default':
      return `@default(${type == 'Enum' ? modifier.value : transform(modifier.value as Properties[string])})`;
    case 'id':
      return `@id`;
    case 'unique':
      return '@unique';
    case 'updatedAt':
      return '@updatedAt';
    case 'ignore':
      return '@ignore';
    case 'map':
      return `@map("${modifier.value}")`;
    case 'unsupported':
      return `("${modifier.value}")`;
    case 'raw':
      return modifier.value as unknown as string;
    case 'omit':
    case 'length':
    case 'password':
    case 'startsWith':
    case 'endsWith':
    case 'contains':
    case 'regex':
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
      return stringifyModifier(modifier);
    case 'email':
    case 'url':
    case 'datetime':
      return stringifyModifier(modifier, value => ({ message: value }));
    case 'prisma.passthrough':
      return stringifyModifier(modifier, value => ({ text: value }));
    case 'allow':
    case 'deny':
      const { operation, condition } = modifier.value as Scalars['String']['allow' | 'deny'];
      const conditionStr = typeof condition === 'string' ? condition : expression(condition);

      return `@${modifier.type as string}(${[
        `"${Array.isArray(operation) ? operation.join(',') : operation}"`,
        conditionStr,
      ].join(', ')})`;
  }
};
