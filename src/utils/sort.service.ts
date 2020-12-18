import { Product } from 'src/interfaces/product.interface';

export class Sort {
  static apply(array: Product[], order: 'desc' | 'asc') {
    return array.sort((a, b) => this.sortByPrice(a, b, order));
  }

  private static sortByPrice(a: Product, b: Product, order) {
    const priceA = typeof a.price === 'object' ? a.price.newPrice : a.price;
    const priceB = typeof b.price === 'object' ? b.price.newPrice : b.price;
    return order === 'desc' ? priceB - priceA : priceA - priceB;
  }
}
