import { Injectable, NotFoundException } from '@nestjs/common';
import * as DB from '../products.json';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import * as fs from 'fs';
import { Sort } from 'src/utils/sort.service';

@Injectable()
export class ProductsService {
  getProducts(query: any): ProductsResponse {
    const items = Sort.apply(DB, query.order);
    return { items: items.slice(0, query.pageSize), total: DB.length };
  }

  getProductBySku(sku: string): Product {
    const [prod] = this.findProduct(sku);
    return prod;
  }

  addProduct(body): void {
    body.sku = `el${DB.length + 1}`;
    DB.push(body);
    this.updateDB();
  }

  updateProduct(sku: string, body): void {
    const [product, prodIndex] = this.findProduct(sku);
    DB[prodIndex] = { ...product, ...body };
    this.updateDB();
  }

  deleteProduct(sku: string): void {
    const prodIndex = this.findProduct(sku)[1];
    DB.splice(prodIndex, 1);
    this.updateDB();
  }

  private findProduct(sku: string): [Product, number] {
    const productIndex = DB.findIndex((el) => sku === el.sku);
    if (productIndex === -1)
      throw new NotFoundException('Could not find product!');
    return [DB[productIndex], productIndex];
  }

  private updateDB(): void {
    fs.writeFileSync('./src/products.json', JSON.stringify(DB, null, 2), null);
  }
}
