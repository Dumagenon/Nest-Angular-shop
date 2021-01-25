import { Body } from '@nestjs/common';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductsResponse } from '../../interfaces/product.interface';
import { ApiErrorResponse } from '../../utils/constants';
import { CustomersService } from './customers.service';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly usersService: CustomersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get customers',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  getCustomers(): Promise<Customer[]> {
    return this.usersService.get();
  }

  @Post('join')
  @ApiResponse({
    status: 200,
    description: 'Create user',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  createCustomer(@Body() body: CustomerDto): Promise<Customer> {
    return this.usersService.create(body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete user',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  deleteCustomer(@Param('id') id: string): Promise<Customer> {
    return this.usersService.delete(id);
  }
}
