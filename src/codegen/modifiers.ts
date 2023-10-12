import { Properties, transform } from './transform';
import { Scalars, Type } from '../types/types';

import { Modifier } from '../types/modifiers';
import { nonNullable } from '../types/utils';

// TODO: less shitty way of doing this
export const modifier = <T extends Type>(
  type: T,
  modifier: Modifier<T>,
): string => {
  // @db.TinyInt etc. modifiers
  if ((modifier.type as string).startsWith('@')) {
    // this is rapidly deteriorating lmao
    const type = (modifier.type as string).split('.').pop();
    return `@db.${type}${
      Array.isArray(modifier.value)
        ? !modifier.value.length ||
          modifier.value.every(item => item == undefined)
          ? ''
          : `(${modifier.value.join(', ')})`
        : (modifier.value as any) == undefined
        ? ''
        : `(${modifier.value})`
    }`;
  }

  // Non @db modifiers
  switch (modifier.type) {
    case 'default':
      return `@default(${
        type == 'Enum'
          ? modifier.value
          : transform(modifier.value as Properties[string])
      })`;
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
      return '@omit()';
    case 'prisma.passthrough':
      return `@prisma.passthrough("${modifier.value}")`;
    case 'password':
      const { saltLength, salt } =
        modifier.value as Scalars['String']['password'];

      return `@password(${[
        !!saltLength ? `saltLength: ${saltLength}` : undefined,
        !!salt ? `salt: "${salt}"` : undefined,
      ]
        .filter(nonNullable)
        .join(', ')})`;
    case 'allow':
    case 'deny':
      const { operation, condition } = modifier.value as Scalars['String'][
        | 'allow'
        | 'deny'];

      return `@${modifier.type as string}(${[
        `'${Array.isArray(operation) ? operation.join(',') : operation}'`,
        condition,
      ].join(', ')})`;
  }
};
