# Demo

`refract.ts`

```ts
import Refract from '@cwqt/refract';
import schema from './schema';

Refract({
  datasource: {
    provider: 'postgresql',
    url: process.env.PG_URL,
    shadowDatabaseUrl: process.env.PG_SHADOW_URL,
    referentialIntegrity: 'prisma',
  },
  generators: [
    {
      provider: 'prisma-client-js',
      previewFeatures: ['referentialIntegrity'],
      engineType: 'library',
      binaryTargets: ['native'],
    },
  ],
  output: path.join(process.cwd(), 'myschema.prisma'),
  schema,
});

// Generate the schema with `npx ts-node refract.ts`
```

`schema.ts`

```ts
// example from: https://www.prisma.io/docs/concepts/components/prisma-schema#example

// Enums
const Role = Enum('Role', ['USER', 'ADMIN'] as const);

// Define models first for circular relations
const Post = Model('Post');
const User = Model('User');

// Mixins (think inheritance)
const Timestamps = Mixin()
  .Field('createdAt', DateTime(Default('now()')))
  .Field('updatedAt', DateTime(UpdatedAt));

// prettier-ignore
User
  .Field('id',       Int(Index, Default('autoincrement()')))
  .Field('email',    Varchar(Unique))
  .Field('name',     Varchar(Nullable))
  .Field('role',     Role('USER'))
  .Relation('posts', OneToMany(Post))
  // Use a mixin, adds createdAt & updatedAt columns to Model
  .Mixin(Timestamps);

// prettier-ignore
Post
  .Field('id',        Int(Index, Default('autoincrement()')))
  // Defaults are type-safe
  .Field('published', Boolean(Default(false)))
  .Field('title',     Varchar(Limit(255)))
  .Field('authorId',  Int(Nullable))
  // All kinds of relationships
  .Relation('author', ManyToOne(User, Pk('id').Fk('authorId'), Nullable))
  .Mixin(Timestamps)
  // Escape hatch into raw Prisma
  .Raw(`@@map("comments")`);

export default [Role, User, Post];
```