import { Product } from '../modules/products/entity/product.entity';

export class Sort {
  static apply(array: Product[], order: string) {
    return array.sort((a, b) => this._sortByPrice(a, b, order));
  }

  private static _sortByPrice(a: Product, b: Product, order) {
    return order === 'desc' ? b.price - a.price : a.price - b.price;
  }
}
