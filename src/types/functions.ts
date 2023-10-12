export type Functions = {
  uuid: [[], 'String'];
  cuid: [[], 'String'];
  now: [[], 'DateTime'];
  autoincrement: [[], 'Int'];
  dbgenerated: [['String'], 'Any'];
  auth: [[], 'User'];
  future: [[], 'Any'];
  contains: [['String', 'String', 'Boolean' | 'undefined'], 'Boolean'];
  search: [['String', 'String'], 'Boolean'];
  startsWith: [['String', 'String'], 'Boolean'];
  endsWith: [['String', 'String'], 'Boolean'];
  has: [['Array-Any', 'Any'], 'Boolean'];
  hasEvery: [['Array-Any', 'Array-Any'], 'Boolean'];
  hasSome: [['Array-Any', 'Array-Any'], 'Boolean'];
  isEmpty: [['Array-Any'], 'Boolean'];
};
