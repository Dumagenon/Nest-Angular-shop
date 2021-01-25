import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../modules/products/entity/product.entity';

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
