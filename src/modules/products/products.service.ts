import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
} from './dto/products.dto';
import { Product } from './entity/product.entity';
import { Brand } from '../brands/entity/brand.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async getProducts(query: GetProductsDto): Promise<any> {
    return {
      items: await this.transformProduct(query),
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

  private async transformProduct(query) {
    const { order, page, pageSize } = query;
    const prods = await this.productModel.findAll({
      order: [['price', order]],
      limit: +pageSize || 50,
      offset: +page * +pageSize - +pageSize || 0,
      include: [{ model: Brand }],
      attributes: ['sku', 'title', 'price', 'image', 'amount'],
    });
    return prods;
  }
}
