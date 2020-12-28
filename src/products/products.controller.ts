import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common';

import { ProductsResponse } from '../interfaces/product.interface';
import { ProductsService } from './products.service';

import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
} from './products.dto';
import { Product } from './schemas/products.schema';
import { ApiErrorResponse } from '../utils/constants';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({ type: GetProductsDto })
  @ApiResponse({
    status: 200,
    description: 'Get product by query params',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  getProducts(@Query() query: GetProductsDto): Promise<ProductsResponse> {
    return this.productsService.getProducts(query);
  }

  @Get(':sku')
  @ApiResponse({
    status: 200,
    description: 'Get product by sku code',
    type: Product,
  })
  @ApiResponse(ApiErrorResponse)
  getProductBySku(@Param('sku') sku: string): Promise<Product> {
    return this.productsService.getProductBySku(sku);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Create new product',
  })
  @ApiResponse(ApiErrorResponse)
  addProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.productsService.addProduct(body);
  }

  @Put(':sku')
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Create new product',
  })
  @ApiResponse(ApiErrorResponse)
  updateProduct(
    @Param('sku') sku: string,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(sku, body);
  }

  @Delete(':sku')
  @ApiResponse({
    status: 200,
    description: 'Delete new product',
  })
  @ApiResponse(ApiErrorResponse)
  deleteProduct(@Param('sku') sku: string): Promise<Product> {
    return this.productsService.deleteProduct(sku);
  }
}
