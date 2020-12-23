import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductPrice } from '../../interfaces/product.interface';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Brand } from 'src/brands/schemas/brands.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ unique: true })
  sku: string;
  @Prop()
  title: string;
  @Prop()
  price: ProductPrice;
  @Prop()
  image: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;
  @Prop()
  amount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
