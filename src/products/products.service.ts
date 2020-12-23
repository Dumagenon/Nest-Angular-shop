import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sort } from '../utils/sort.service';
import { Product, ProductDocument } from './schemas/products.schema';
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
} from './products.dto';
import { ProductsResponse } from '../interfaces/product.interface';
import { Brand, BrandDocument } from '../brands/schemas/brands.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Brand.name) private brandsModel: Model<BrandDocument>,
  ) {}

  async getProducts(query: GetProductsDto): Promise<ProductsResponse> {
    const prods = await this.productModel.find();
    return {
      items: await this.transformProduct(prods, query),
      total: await this.productModel.countDocuments(),
    };
  }

  async getProductBySku(sku: string): Promise<Product> {
    return this.productModel.findOne({ sku });
  }

  async addProduct(body: CreateProductDto): Promise<Product> {
    const newProd = new this.productModel({
      sku: await this.generateSkuCode(),
      ...body,
    });
    return newProd.save();
  }

  async updateProduct(sku: string, body: UpdateProductDto): Promise<Product> {
    return this.productModel.findOneAndUpdate({ sku }, body);
  }

  async deleteProduct(sku: string): Promise<Product> {
    return this.productModel.findOneAndDelete({ sku });
  }

  private async generateSkuCode() {
    const productsLength = await this.productModel.countDocuments();
    return `el${productsLength + 1}`;
  }

  private async transformProduct(prods, query) {
    const res = [];
    const { order, page, pageSize } = query;
    const sortedProds = Sort.apply(prods, order).slice(
      +page || 0,
      +pageSize || 50,
    );
    for (const item of sortedProds) {
      const brand = await this.brandsModel.findById(item.brand);
      res.push({
        ...item,
        brand: { id: brand._id, name: brand },
      });
    }
    return res;
  }
}
