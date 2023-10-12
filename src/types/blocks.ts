import { Column } from './columns';

// A Prisma block level element
export type BlockType = 'abstract-model' | 'model' | 'enum';
export type Block<T extends BlockType = BlockType> = {
  name: string;
  type: T;
  extends?: Model[];
  columns: T extends 'enum' ? Column<'EnumKey' | 'Comment'>[] : Column[];
};

export type Model = Block<'abstract-model' | 'model'>;
export type Enum = Block<'enum'>;

export function isEnum(block: Block): block is Block<'enum'> {
  return block.type == 'enum';
}

export function isModel(block: Block): block is Block<'model'> {
  return block.type == 'abstract-model' || block.type == 'model';
}
