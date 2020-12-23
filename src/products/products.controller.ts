import { Body, Controller, Param, Query } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsResponse } from '../interfaces/product.interface';
import { ProductsService } from './products.service';

import {
  CreateProductDto,
  GetProductsDto,
  NotFoundResponse,
  UpdateProductDto,
} from './products.dto';
import { Product } from './schemas/products.schema';

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
  getProducts(@Query() query: GetProductsDto): Promise<ProductsResponse> {
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
  getProductBySku(@Param('sku') sku: string): Promise<Product> {
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
  addProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.productsService.addProduct(body);
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
  updateProduct(@Param('sku') sku: string, @Body() body: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(sku, body);
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
  deleteProduct(@Param('sku') sku: string): Promise<Product> {
    return this.productsService.deleteProduct(sku);
  }
}
