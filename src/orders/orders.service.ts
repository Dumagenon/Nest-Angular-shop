import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderDetails, OrderDetailsDocument } from './schemas/order-details.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderDetails.name)
    private orderDetailsModel: Model<OrderDetailsDocument>,
  ) {}

  async get(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async create(body: Order): Promise<any> {
    const newOrder = new this.orderModel(body);
    return newOrder.save();
  }

  async createDetails(body: OrderDetails): Promise<any> {
    const newOrderDetails = new this.orderDetailsModel(body);
    return newOrderDetails.save();
  }

  async update(id, body: Order): Promise<any> {
    return this.orderModel.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
  }

  async delete(id): Promise<any> {
    return this.orderModel.findByIdAndDelete(id);
  }
}
