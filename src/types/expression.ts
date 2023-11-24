export type PolicyBinaryOperator = '==' | '!=' | '>' | '<' | '>=' | '<=' | '&&' | '||' | 'in';

export type PolicyPredicate = '?' | '!' | '^';

export type PolicyFunction = {
  auth: [];
  future: [];
  length: [ReferenceExpression, PolicyExpression] | [ReferenceExpression, PolicyExpression, PolicyExpression];
  regex: [ReferenceExpression];
  email: [ReferenceExpression];
  datetime: [ReferenceExpression];
  url: [ReferenceExpression];
  contains: [ReferenceExpression, PolicyExpression] | [ReferenceExpression, PolicyExpression, PolicyExpression];
  search: [ReferenceExpression, PolicyExpression];
  startWith: [ReferenceExpression, PolicyExpression];
  endsWith: [ReferenceExpression, PolicyExpression];
  has: [ReferenceExpression, PolicyExpression];
  hasEvery: [ReferenceExpression, PolicyExpression];
  hasSome: [ReferenceExpression, PolicyExpression];
  isEmpty: [ReferenceExpression];
};

export type NullOrThisExpression = { type: 'this' | 'null' };

export type BooleanExpression = { type: 'boolean'; value: 'true' | 'false' };

export type FunctionExpression<Name extends keyof PolicyFunction = keyof PolicyFunction> = {
  type: 'function';
  name: Name;
  args: PolicyFunction[Name];
};

export type LiteralExpression = {
  type: 'literal';
  value: string | number | boolean;
};

export type ArrayExpression = { type: 'array'; values: PolicyExpression[] };

export type ReferenceExpression = { type: 'reference'; identifier: string };

export type MemberAccessExpression = {
  type: 'member-access';
  expression: PolicyExpression;
  identifier: string;
};

export type BinaryExpression = {
  type: 'binary';
  leftOperand: PolicyExpression;
  operator: PolicyBinaryOperator;
  rightOperand: PolicyExpression;
};

export type UnaryExpression = { type: 'unary'; expression: PolicyExpression };

export type CollectionPredicateExpression = {
  type: 'collection-predicate';
  expression: PolicyExpression;
  predicate: PolicyPredicate;
  childExpression: PolicyExpression;
};

export type PolicyExpression =
  | NullOrThisExpression
  | BooleanExpression
  | FunctionExpression
  | LiteralExpression
  | ArrayExpression
  | ReferenceExpression
  | MemberAccessExpression
  | BinaryExpression
  | UnaryExpression
  | CollectionPredicateExpression;
