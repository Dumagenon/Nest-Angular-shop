import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BrandDocument = Brand & Document;

@Schema()
export class Brand {
  @ApiProperty()
  @Prop({ unique: true })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
