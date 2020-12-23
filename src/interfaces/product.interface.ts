import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/schemas/products.schema';

export class ProductPrice {
  @ApiProperty()
  oldPrice: number;
  @ApiProperty({ required: false })
  newPrice?: number;
}

export class ProductsResponse {
  @ApiProperty()
  items: Product[];
  @ApiProperty()
  total: number;
}
