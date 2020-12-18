import { ApiProperty } from '@nestjs/swagger';
import { ProductPrice } from '../interfaces/product.interface';

export class GetProductsDto {
  @ApiProperty({ required: false })
  order?: string;
  @ApiProperty({ required: false })
  pageSize?: string;
}

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  img: string;
  @ApiProperty()
  price: ProductPrice | number;
  @ApiProperty()
  amount: number;
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  sku?: string;
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  brand?: string;
  @ApiProperty({ required: false })
  img?: string;
  @ApiProperty({ required: false })
  price?: number | ProductPrice;
  @ApiProperty({ required: false })
  amount?: number;
}

export class NotFoundResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
