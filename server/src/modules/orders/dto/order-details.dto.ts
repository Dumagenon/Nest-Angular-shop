import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailsDto {
  @ApiProperty()
  product_id: number;
  @ApiProperty()
  order_info_id: number;
  @ApiProperty()
  quantity: number;
}
