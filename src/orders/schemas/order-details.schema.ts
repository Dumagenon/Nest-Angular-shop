import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../products/schemas/products.schema';
import { Order } from './order.schema';
import { ProductPrice } from '../../interfaces/product.interface';

export type OrderDetailsDocument = OrderDetails & Document;

@Schema()
export class OrderDetails {
  @ApiProperty()
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Product' })
  product: Product;
  @ApiProperty()
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Order' })
  order: Order;
  @ApiProperty()
  @Prop()
  quantity: number;
  @ApiProperty()
  @Prop()
  price: number;
  @ApiProperty()
  @Prop()
  sku: string;
}

export const OrderDetailsSchema = SchemaFactory.createForClass(OrderDetails);
