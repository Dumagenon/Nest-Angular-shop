import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  type: string;
  @ApiPropertyOptional()
  phone?: string;
  @ApiPropertyOptional()
  password?: string;
}
