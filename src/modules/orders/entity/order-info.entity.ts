import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { OrderDetails } from './order-details.entity';
import { Order } from './order.entity';

@Table({
  tableName: 'order_info',
  timestamps: false,
} as TableOptions)
export class OrderInfo extends Model<OrderInfo> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  amount: number;

  @Column({ type: DataType.DATE })
  order_date: Date;

  @HasOne(() => Order)
  order: Order;

  @HasMany(() => OrderDetails)
  orderDetails: OrderDetails[];
}
