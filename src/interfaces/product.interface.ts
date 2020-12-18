import { ApiProperty } from '@nestjs/swagger';

export class ProductPrice {
  @ApiProperty()
  oldPrice: number;
  @ApiProperty()
  newPrice: number;
}

export class Product {
  @ApiProperty()
  sku: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  img: string;
  @ApiProperty()
  price: number | ProductPrice;
  @ApiProperty()
  amount: number;
}

export class ProductsResponse {
  @ApiProperty()
  items: Product[];
  @ApiProperty()
  total: number;
}