import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entity/order.entity';
import { OrderInfo } from './entity/order-info.entity';
import { OrderDetails } from './entity/order-details.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderInfo, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
