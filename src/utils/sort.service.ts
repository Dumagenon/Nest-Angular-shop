import { Product } from 'src/interfaces/product.interface';

export class Sort {
  static apply(array: Product[], order: 'desc' | 'asc') {
    return array.sort((a, b) => this.sortByPrice(a, b, order));
  }

  private static sortByPrice(a: Product, b: Product, order) {
    const priceA = a.price.newPrice ? a.price.newPrice : a.price.oldPrice;
    const priceB = b.price.newPrice ? b.price.newPrice : b.price.oldPrice;
    return order === 'desc' ? priceB - priceA : priceA - priceB;
  }
}
