import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../products/entity/product.entity';
import { OrderInfo } from './order-info.entity';

@Table({
  tableName: 'order-details',
  timestamps: false,
} as TableOptions)
export class OrderDetails extends Model<OrderDetails> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  product_id: number;

  @ForeignKey(() => OrderInfo)
  @Column({ type: DataType.INTEGER })
  order_info_id: number;

  @Column({ type: DataType.INTEGER })
  quantity: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => OrderInfo)
  orderInfo: OrderInfo;
}
