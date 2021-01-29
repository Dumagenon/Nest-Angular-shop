import { Injectable, ConflictException } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { CustomerDto } from './dto/customer.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer) private customerModel: typeof Customer) {}

  async get(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  /**
   * Find one item from DB where fieldName: value
   * @param fieldName Column name in database
   * @param login Column value in database
   */
  async findOne(fieldName, login): Promise<any> {
    return this.customerModel.findOne({ where: { [fieldName]: login } });
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

  public async isUserExist(user) {
    const userByEmail = await this.findOne('email', user.email);
    const userByLogin = user.login
      ? await this.findOne('login', user.login)
      : null;

    if (userByEmail || userByLogin) {
      throw new ConflictException(null, 'User exist');
    }
  }
}
