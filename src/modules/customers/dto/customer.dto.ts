import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
}
