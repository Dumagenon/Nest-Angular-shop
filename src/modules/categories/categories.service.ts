import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async get(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async create(body: CategoryDto): Promise<any> {
    this.categoryModel.create(body);
  }

  async update(id, body: CategoryDto): Promise<any> {
    return this.categoryModel.update(body, { where: { id } });
  }

  async delete(id): Promise<any> {
    return this.categoryModel.destroy({ where: { id } });
  }
}
