import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductsResponse } from '../../interfaces/product.interface';
import { ApiErrorResponse } from '../../utils/constants';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get categories',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  getCategory(): Promise<Category[]> {
    return this.categoriesService.get();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create category',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  createCategory(@Body() body: Category): Promise<Category> {
    return this.categoriesService.create(body);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update category',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  updateCategory(
    @Param('id') id: string,
    @Body() body: Category,
  ): Promise<Category> {
    return this.categoriesService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete category',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.delete(id);
  }
}
