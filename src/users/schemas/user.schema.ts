import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ unique: true, minlength: 3, maxlength: 20 })
  login: string;
  @ApiProperty()
  @Prop({ unique: true })
  email: string;
  @ApiProperty({ required: false })
  @Prop({ required: false })
  fullName?: string;
  @ApiProperty()
  @Prop()
  billingAddress: string;
  @ApiProperty()
  @Prop()
  shippingAddress: string;
  @ApiProperty()
  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
