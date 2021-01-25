import {
  Table,
  Column,
  DataType,
  Model,
  TableOptions,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../../products/entity/product.entity';
import { Category } from './category.entity';

@Table({
  tableName: 'product_categories',
  timestamps: false,
} as TableOptions)
export class ProductCategories extends Model<ProductCategories> {
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  product_id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Category)
  category: Category;
}
