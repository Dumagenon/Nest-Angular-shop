import { Injectable } from '@nestjs/common';
import { Brand } from './entity/brand.entity';
import { BrandsDto } from './dto/brands.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private readonly brandModel: typeof Brand) {}

  async get(): Promise<Brand[]> {
    return this.brandModel.findAll();
  }

  async create(body: BrandsDto): Promise<Brand> {
    return this.brandModel.create(body);
  }

  async update(id, body: BrandsDto): Promise<any> {
    return this.brandModel.update(body, { where: { id } });
  }

  async delete(id): Promise<any> {
    return this.brandModel.destroy({ where: { id } });
  }
}
