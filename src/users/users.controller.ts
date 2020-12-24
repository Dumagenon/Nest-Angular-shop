import { Body } from '@nestjs/common';
import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductsResponse } from '../interfaces/product.interface';
import { ApiErrorResponse } from '../utils/constants';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get users',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  getBrands(): Promise<User[]> {
    return this.usersService.get();
  }

  @Post('join')
  @ApiResponse({
    status: 200,
    description: 'Create user',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  createBrands(@Body() body: User): Promise<User> {
    return this.usersService.create(body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete user',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  deleteBrands(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
