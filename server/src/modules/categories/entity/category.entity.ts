import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions, HasMany,
} from 'sequelize-typescript';
import { ProductCategories } from './product-categories.entity';

@Table({
  tableName: 'categories',
  timestamps: false,
} as TableOptions)
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column({ type: DataType.TEXT })
  description?: string;

  @HasMany(() => ProductCategories)
  productCategories: ProductCategories[];
}
