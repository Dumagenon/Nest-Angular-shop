import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Brand } from '../../brands/entity/brand.entity';
import { ProductCategories } from '../../categories/entity/product-categories.entity';

@Table({
  tableName: 'products',
  timestamps: false,
} as TableOptions)
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(8), allowNull: false, unique: true })
  sku: string;

  @Column({ type: DataType.STRING(45), allowNull: false })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING })
  image?: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER })
  brand_id: number;

  @BelongsTo(() => Brand)
  brand: Brand;

  @HasMany(() => ProductCategories)
  productCategories: ProductCategories;
}
