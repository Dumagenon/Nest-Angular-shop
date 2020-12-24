import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductsResponse } from '../interfaces/product.interface';
import { ApiErrorResponse } from 'src/utils/constants';
import { BrandsService } from './brands.service';
import { Brand } from './schemas/brands.schema';

@Controller('api/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get brands',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  getBrands(): Promise<Brand[]> {
    return this.brandsService.get();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create brand',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  createBrands(@Body() body: Brand): Promise<Brand> {
    return this.brandsService.create(body);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update brand',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  updateBrands(@Param('id') id: string, @Body() body: Brand): Promise<Brand> {
    return this.brandsService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete brand',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  deleteBrands(@Param('id') id: string): Promise<Brand> {
    return this.brandsService.delete(id);
  }
}
