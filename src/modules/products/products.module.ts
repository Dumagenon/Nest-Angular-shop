import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entity/product.entity';
import { ProductCategories } from '../categories/entity/product-categories.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductCategories])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
