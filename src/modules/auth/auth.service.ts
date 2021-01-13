import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from '../customers/customers.service';
import * as bcrypt from 'bcrypt';
import { FACEBOOK } from '../../utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Checked if user exist, and create new if is not.
   * @param username
   * @param pass
   */
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne('login', username);

    if (!user || (!pass && user.type === FACEBOOK)) return null;

    const match = await bcrypt.compare(pass, user.dataValues.password);

    if (!match) return null;

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    const token = await this.jwtService.signAsync(user);
    return { user, token };
  }

  public async create(user) {
    const isUser = await this.userService.findOne('login', user.login);

    if (isUser) {
      throw new ConflictException(null, 'User exist');
    }

    const pass = await bcrypt.hash(user.password, 10);

    return await this.createUser({ ...user, type: 'local' }, pass);
  }

  public async findOrCreate(user) {
    if (!user.email) {
      throw new UnprocessableEntityException(null, 'Invalid auth data');
    }

    const customer = await this.userService.findOne('email', user.email);

    if (customer) return await this.login(customer.toJSON());

    return await this.createUser({ ...user, type: FACEBOOK }, null);
  }

  private async createUser(user, pass) {
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.jwtService.signAsync(result);

    return { user: result, token };
  }
}
