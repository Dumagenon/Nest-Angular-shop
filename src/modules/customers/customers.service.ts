import { Injectable } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer) private customerModel: typeof Customer) {}

  async get(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async findOne(login) {
    return this.customerModel.findOne({ where: { login } });
  }

  async findOneById(id) {
    return this.customerModel.findOne({ where: { id } });
  }

  async create(body: CustomerDto): Promise<any> {
    return this.customerModel.create(body);
  }

  async update(id, body: CustomerDto): Promise<any> {
    return this.customerModel.update(body, { where: { id } });
  }

  async delete(id): Promise<any> {
    return this.customerModel.destroy({ where: { id } });
  }
}
