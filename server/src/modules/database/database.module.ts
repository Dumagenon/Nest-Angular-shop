import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from '../brands/entity/brand.entity';
import { Product } from '../products/entity/product.entity';
import { Category } from '../categories/entity/category.entity';
import { ProductCategories } from '../categories/entity/product-categories.entity';
import { Customer } from '../customers/entity/customer.entity';
import { Order } from '../orders/entity/order.entity';
import { OrderInfo } from '../orders/entity/order-info.entity';
import { OrderDetails } from '../orders/entity/order-details.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Zxasqw12',
      database: 'powertoolsstore',
      models: [
        Brand,
        Product,
        Category,
        ProductCategories,
        Customer,
        Order,
        OrderInfo,
        OrderDetails,
      ],
    }),
  ],
})
export class DatabaseModule {}
