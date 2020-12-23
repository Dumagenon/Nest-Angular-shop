import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brands.schema';
@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async get(): Promise<Brand[]> {
    return this.brandModel.find();
  }

  async create(body: Brand): Promise<any> {
    const newBrand = new this.brandModel(body);
    return newBrand.save();
  }

  async update(id, body: Brand): Promise<any> {
    return this.brandModel.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
  }

  async delete(id): Promise<any> {
    return this.brandModel.findByIdAndDelete(id);
  }
}
