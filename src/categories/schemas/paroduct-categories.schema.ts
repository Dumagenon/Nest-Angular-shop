import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Product } from 'src/products/schemas/products.schema';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @ApiProperty()
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Product' })
  product: Product;
  @ApiProperty()
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Category' })
  categories: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
