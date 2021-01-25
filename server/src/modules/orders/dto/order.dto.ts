import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  order_info_id: number;
  @ApiProperty()
  customer_id: number;
}
