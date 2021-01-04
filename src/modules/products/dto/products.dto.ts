import { ApiProperty } from '@nestjs/swagger';
import { ProductPrice } from '../../../interfaces/product.interface';
import { Brand } from '../../brands/entity/brand.entity';

export class GetProductsDto {
  @ApiProperty({ required: false })
  order?: string;
  @ApiProperty({ required: false })
  pageSize?: string | number;
  @ApiProperty({ required: false })
  page?: string | number;
}

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  img: string;
  @ApiProperty()
  price: ProductPrice;
  @ApiProperty()
  amount: number;
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  sku?: string;
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  brand?: Brand;
  @ApiProperty({ required: false })
  img?: string;
  @ApiProperty({ required: false })
  price?: ProductPrice;
  @ApiProperty({ required: false })
  amount?: number;
}

export class NotFoundResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
