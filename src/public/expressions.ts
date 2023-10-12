import {
  ArrayExpression,
  BinaryExpression,
  CollectionPredicateExpression,
  LiteralExpression,
  MemberAccessExpression,
  Modifier,
  Modifiers,
  NullOrThisExpression,
  PolicyFunction,
  ReferenceExpression,
  Type,
  UnaryExpression,
} from '../types';
import { FunctionExpression, PolicyBinaryOperator, PolicyExpression, PolicyPredicate } from '../types/expression';

export const Expression = {
  This: { type: 'this' } as NullOrThisExpression,
  Null: { type: 'null' } as NullOrThisExpression,
  Function: <Name extends keyof PolicyFunction>(name: Name, ...args: PolicyFunction[Name]): FunctionExpression => ({
    type: 'function',
    name,
    args,
  }),
  Literal: (value: string | number | boolean): LiteralExpression => ({
    type: 'literal',
    value,
  }),
  Array: (...values: PolicyExpression[]): ArrayExpression => ({
    type: 'array',
    values,
  }),
  Reference: (identifier: string): ReferenceExpression => ({
    type: 'reference',
    identifier,
  }),
  MemberAccess: (expression: PolicyExpression, identifier: string): MemberAccessExpression => ({
    type: 'member-access',
    expression,
    identifier,
  }),
  Binary: (
    leftOperand: PolicyExpression,
    operator: PolicyBinaryOperator,
    rightOperand: PolicyExpression,
  ): BinaryExpression => ({
    type: 'binary',
    leftOperand,
    operator,
    rightOperand,
  }),
  Unary: (expression: PolicyExpression): UnaryExpression => ({
    type: 'unary',
    expression,
  }),
  CollectionPredicate: (
    expression: PolicyExpression,
    predicate: PolicyPredicate,
    childExpression: PolicyExpression,
  ): CollectionPredicateExpression => ({
    type: 'collection-predicate',
    expression,
    predicate,
    childExpression,
  }),
};
