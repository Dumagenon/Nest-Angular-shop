import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Customer } from 'src/modules/customers/entity/customer.entity';
import { OrderInfo } from './order-info.entity';

@Table({
  tableName: 'orders',
  timestamps: false,
} as TableOptions)
export class Order extends Model<Order> {
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => OrderInfo)
  @Column({ type: DataType.INTEGER })
  order_info_id: number;

  @BelongsTo(() => OrderInfo)
  order_info: OrderInfo;
}
