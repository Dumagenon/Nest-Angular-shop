import { Body, Controller, Param, Query } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Product, ProductsResponse } from '../interfaces/product.interface';
import { ProductsService } from './products.service';

import {
  CreateProductDto,
  GetProductsDto,
  NotFoundResponse,
  UpdateProductDto,
} from './products.dto';

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
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  getProducts(@Query() query: GetProductsDto): ProductsResponse {
    return this.productsService.getProducts(query);
  }

  @Get(':sku')
  @ApiResponse({
    status: 200,
    description: 'Get product by sku code',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  getProductBySku(@Param('sku') sku: string): Product {
    return this.productsService.getProductBySku(sku);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Create new product',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  addProduct(@Body() body: CreateProductDto) {
    this.productsService.addProduct(body);
    return { message: 'Added' };
  }

  @Put(':sku')
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Create new product',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  updateProduct(@Param('sku') sku: string, @Body() body: UpdateProductDto) {
    this.productsService.updateProduct(sku, body);
    return { message: 'Changed' };
  }

  @Delete(':sku')
  @ApiResponse({
    status: 200,
    description: 'Delete new product',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  deleteProduct(@Param('sku') sku: string) {
    this.productsService.deleteProduct(sku);
    return { message: 'Deleted' };
  }
}
