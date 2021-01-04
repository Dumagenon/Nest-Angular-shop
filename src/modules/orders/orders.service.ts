import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { OrderDetails } from './entity/order-details.entity';
import { OrderDetailsDto } from './dto/order-details.dto';
import { Sequelize } from 'sequelize-typescript';
import { Order } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private dataBase: Sequelize,
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderDetails) private orderDetailsModel: typeof OrderDetails,
  ) {}

  async get(): Promise<any> {
    const [results, metadata] = await this.dataBase.query(
      'SELECT oi.*, c.phone, c.login FROM orders o INNER JOIN order_info oi ON oi.id = o.order_info_id INNER JOIN customers c ON c.id=o.customer_id;',
    );
    return results;
  }

  async create(body: OrderDto): Promise<any> {
    return this.orderModel.create(body);
  }

  async createDetails(body: OrderDetailsDto): Promise<any> {
    return this.orderDetailsModel.create(body);
  }

  async update(id, body: OrderDto): Promise<any> {
    return this.orderModel.update(body, { where: { id } });
  }

  async delete(id): Promise<any> {
    return this.orderModel.destroy({ where: { id } });
  }
}
