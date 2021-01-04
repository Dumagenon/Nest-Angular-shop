import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  HasMany,
} from 'sequelize-typescript';
import { Product } from '../../products/entity/product.entity';

@Table({
  tableName: 'brands',
  timestamps: false,
} as TableOptions)
export class Brand extends Model<Brand> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
