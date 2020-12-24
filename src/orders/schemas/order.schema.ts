import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @ApiProperty()
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  customer: User;
  @ApiProperty()
  @Prop()
  amount: number;
  @ApiProperty()
  @Prop()
  shippingAddress: string;
  @ApiProperty()
  @Prop()
  orderStatus: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
