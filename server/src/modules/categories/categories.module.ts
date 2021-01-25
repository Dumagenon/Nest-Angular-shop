import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entity/category.entity';
import { ProductCategories } from './entity/product-categories.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category, ProductCategories])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
