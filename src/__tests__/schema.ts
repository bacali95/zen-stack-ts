import {
  AllowField,
  Boolean,
  Compound,
  Contains,
  DateTime,
  DateTimeModifier,
  Decimal,
  Default,
  DenyField,
  Email,
  EndsWith,
  Enum,
  Expression,
  Fields,
  Float,
  GreaterThan,
  GreaterThanOrEqual,
  Id,
  Int,
  Key,
  Length,
  Limit,
  LowerThan,
  LowerThanOrEqual,
  ManyToOne,
  Map,
  Model,
  Nullable,
  Omit,
  OnDelete,
  OnUpdate,
  OneToMany,
  OneToOne,
  Password,
  Raw,
  References,
  Regex,
  StartsWith,
  String,
  Unique,
  Unsupported,
  UpdatedAt,
  Url,
  MySql as db,
} from '..';

// roughly from: https://www.prisma.io/docs/concepts/components/prisma-schema#example

// with comment
const Role = Enum(
  'Role',
  'This is the Role Enum',
  Key('ADMIN', Map('admin'), 'This is the admin role'),
  Key('USER', Map('user')),
  Key('OWNER', Map('owner'), 'This is the owner role'),
);

// without comment
const Foo = Enum('Foo', Key('Bar'), Key('Baz'));

const Abstract = Model('Abstract');

const Post = Model('Post');
const User = Model('User', 'This is the User model');
const Star = Model('Star');

Abstract
  .Abstract()
  .Field('createdAt', DateTime(Default('now()')))
  .Field('updatedAt', DateTime(UpdatedAt, db.Date(6)))
  .Block(Compound.Index(["mixin", "index"]))

// prettier-ignore
User
  .Extends(Abstract)
  .Field('id',          Int(Id, Default('autoincrement()'), Map('_id'), Raw("@db.Value('foo')")))
  .Field('email',       String(Unique, db.VarChar(4), Email("This should be a valid email")))
  .Field('name',        String(Nullable, Length({min: 1, max: 10}), AllowField(["read"], "auth() != null")))
  .Field('name2',       String(StartsWith({text: 'test'}), EndsWith({text: 'test'}), Contains({text: 'test'})))
  .Field('name3',       String(Url(), DateTimeModifier(), Regex({regex: '.*'})))
  .Field('height',      Float(Default(1.80), GreaterThan({value: 1}), LowerThanOrEqual({value: 10})), "The user model")
  .Field('width',       Float(Default(2.80), GreaterThanOrEqual({value: 1}), LowerThan({value: 10})), "The user model")
  .Field('role',        Role('USER', Nullable, DenyField("all", "auth() == null")))
  .Field('foo',         Foo()) // no-default non-nullable enum
  .Field('bar',         Foo(Nullable))
  .Field('password',    String(Password({ saltLength: 10 }), Omit))
  .Relation('posts',    OneToMany(Post, "WrittenPosts"), "Relations are cool")
  .Relation('pinned',   OneToOne(Post, "PinnedPost", Nullable))
  .Block(Compound.Validate(Expression.Function('contains', Expression.Reference('email'), Expression.Literal('test'))))
  .Block(Compound.Allow("all", Expression.Binary(Expression.MemberAccess(Expression.Function('auth'), 'id'), '!=', Expression.Literal(1))))
  .Block(Compound.Deny("all", Expression.Binary(Expression.Function('auth'), '==', Expression.Null)))
  .Block(Compound.PrismaPassThrough('@@index(["id"])'));

// prettier-ignore
Post
  .Extends(Abstract)  
  .Field('id',          Int(Id, Default('autoincrement()'), db.UnsignedSmallInt))
  .Field('published',   Boolean(Default(false) ))
  .Field('title',       String(Limit(255)))
  .Relation(
    'author',
    ManyToOne(
      User,
      'WrittenPosts',
      Fields('authorId', Int(Nullable)),
      References('id'),
      OnUpdate('Restrict'),
      OnDelete('SetNull'),
      Nullable,
    ),
  )
  .Field('pinnedById', Int(Nullable))
  .Relation(
    'pinnedBy',
    OneToOne(
      User,
      'PinnedPost',
      Fields('pinnedById'),
      References('id'),
      Nullable,
    ),
  )
  .Relation('stars',    OneToMany(Star))
  .Raw(`@@map("comments")`);

// prettier-ignore
Star
  .Extends(Abstract)
  .Field('id',          Int(Id, Default('autoincrement()')))
  .Field('decimal',     Decimal(db.Decimal(10, 20)))
  .Field('postId',      Int(Nullable))
  .Relation('post',     ManyToOne(Post, Fields('postId'), References('id')))
  .Field("location",    Unsupported("polygon", Nullable))
  .Block(Compound.Unique(["A", "B"], Map("_AB_unique")))
  .Block(Compound.Index(["wow"], Map("_B_index")), "Block level comments?")
  .Block(Compound.Map("Group"))
  .Block(Compound.Fulltext(["location", "decimal"]))

export default [Abstract, Role, User, Post, Star, Foo];

// let x = OneToOne(Post, 'WrittenPosts', Fields('wow'), References('wee'));
// let a = OneToOne(Post, Fields('bestPostId'), References('id')); // good
// let b = OneToOne(Post, References('id'), Fields('bestPostId')); // bad
// let c = OneToOne(Post, Fields('bestPostId')); // bad
// let d = OneToOne(Post); // good
