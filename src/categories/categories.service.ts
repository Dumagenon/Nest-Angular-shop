import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async get(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async create(body: Category): Promise<any> {
    const newCategory = new this.categoryModel(body);
    return newCategory.save();
  }

  async update(id, body: Category): Promise<any> {
    return this.categoryModel.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
  }

  async delete(id): Promise<any> {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
