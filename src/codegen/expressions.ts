import * as Types from '../types';

export const expression = (exp: Types.PolicyExpression) => {
  switch (exp.type) {
    case 'this':
    case 'null':
      return exp.type;
    case 'boolean':
      return exp.value;
    case 'function':
      return `${exp.name}(${exp.args.map(expression).join(', ')})`;
    case 'literal':
      return typeof exp.value === 'string' ? `"${exp.value}"` : exp.value;
    case 'array':
      return `[${exp.values.map(expression).join(', ')}]`;
    case 'reference':
      return exp.identifier;
    case 'member-access':
      return `${expression(exp.expression)}.${exp.identifier}`;
    case 'binary':
      return `${expression(exp.leftOperand)} ${exp.operator} ${expression(exp.rightOperand)}`;
    case 'unary':
      return `!${expression(exp.expression)}`;
    case 'parentheses':
      return `(${expression(exp.expression)})`;
    case 'collection-predicate':
      return `${expression(exp.expression)}${exp.predicate}[${expression(exp.childExpression)}]`;
    default:
      break;
  }
};
