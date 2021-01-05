import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/modules/orders/entity/order.entity';

@Table({
  tableName: 'customers',
  timestamps: false,
} as TableOptions)
export class Customer extends Model<Customer> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING, unique: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password?: string;

  @Column({ type: DataType.STRING })
  type: string;

  @HasMany(() => Order)
  orders: Order[];
}
