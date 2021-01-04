import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
} from './dto/products.dto';
import { ProductsResponse } from '../../interfaces/product.interface';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async getProducts(query: GetProductsDto): Promise<ProductsResponse> {
    const prods = await this.productModel.findAll();
    return {
      items: prods,
      total: await this.productModel.count(),
    };
  }

  async getProductBySku(sku: string) {
    return this.productModel.findOne({ where: { sku } });
  }

  async addProduct(body: CreateProductDto): Promise<Product> {
    return this.productModel.create({
      sku: await this.generateSkuCode(),
      ...body,
    });
  }

  async updateProduct(sku: string, body: UpdateProductDto) {
    return this.productModel.update(body, { where: { sku } });
  }

  async deleteProduct(sku: string) {
    return this.productModel.destroy({ where: { sku } });
  }

  private async generateSkuCode() {
    const productsLength = await this.productModel.count();
    return `XS422${productsLength + 1}ER`;
  }
  //
  // private async transformProduct(prods, query) {
  //   const res = [];
  //   const { order, page, pageSize } = query;
  //   const sortedProds = Sort.apply(prods, order).slice(
  //     +page || 0,
  //     +pageSize || 50,
  //   );
  //   for (const item of sortedProds) {
  //     const brand = await this.brandsModel.findById(item.brand);
  //     res.push({
  //       ...item,
  //       brand: { id: brand._id, name: brand },
  //     });
  //   }
  //   return res;
  // }
}
