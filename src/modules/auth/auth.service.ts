import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from '../customers/customers.service';
import * as bcrypt from 'bcrypt';

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
    const user = await this.userService.findOne(username);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }

  public async login(user) {
    const token = await this.jwtService.signAsync(user);
    return { user, token };
  }

  public async create(user) {
    const isUser = await this.userService.findOne(user.login);
    if (isUser) {
      throw new ConflictException(null, 'User exist');
    }

    const pass = await bcrypt.hash(user.password, 10);;
    const newUser = await this.userService.create({ ...user, password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.jwtService.signAsync(result);

    return { user: result, token };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
