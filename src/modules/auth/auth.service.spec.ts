import { AuthService } from './auth.service';
import * as sinon from 'sinon';
import { CustomerDto } from '../customers/dto/customer.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entity/customer.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  const jwtService: JwtService = sinon.createStubInstance(JwtService);
  const userService: CustomersService = sinon.createStubInstance(
    CustomersService,
  );

  const mockLoginData = {
    username: 'dumagenon',
    password: 'Zxasqw12',
  };

  beforeEach(() => {
    authService = new AuthService(userService, jwtService);
  });

  it('Service should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Method login', () => {
    it('should return user: any, token: string', async () => {
      const result = { user: mockLoginData, token: '' };
      const spyLogin = jest
        .spyOn(jwtService, 'signAsync')
        .mockImplementation(async () => result.token);
      const authLogin = await authService.login(mockLoginData);
      expect(spyLogin).toHaveBeenCalledWith(mockLoginData);
      expect(authLogin).toStrictEqual(result);
    });
  });

  describe('Method signup', () => {
    it('should return user: any, token: string', async () => {
      const result = {
        user: {
          login: 'dumagenon',
          email: 'v@mail.ru',
          type: 'local',
        },
        token: '',
      };
      const mockData: CustomerDto = {
        login: 'dumagenon',
        email: 'v@mail.ru',
        type: 'local',
        password: 'Zxasqw12',
      };
      const spyBcrypt = jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(async () => mockData.password);
      const spyCreate = jest
        .spyOn(userService, 'create')
        .mockImplementation(async () => ({ dataValues: mockData }));
      const authCreate = await authService.create(mockData);

      expect(spyBcrypt).toHaveBeenCalledWith(mockData.password, 10);
      expect(spyCreate).toHaveBeenCalledWith(mockData);
      expect(authCreate).toStrictEqual(result);
    });
  });

  describe('Method validateUser', () => {
    const resultFindOne = {
      login: 'dumagenon',
      type: 'local',
    };
    const password = 'somePassword';

    it('should return user: any', async () => {
      const spyFindOne = jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => ({
          dataValues: { ...resultFindOne, password },
        }));
      const spyCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(async () => true);
      const authValidate = await authService.validateUser(
        mockLoginData.username,
        mockLoginData.password,
      );
      expect(spyFindOne).toHaveBeenCalledWith('login', mockLoginData.username);
      expect(spyCompare).toHaveBeenCalledWith(mockLoginData.password, password);
      expect(authValidate).toStrictEqual(resultFindOne);
    });

    it('should return null', async () => {
      const spyFindOne = jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => null);
      const authValidateUser = await authService.validateUser(
        'unknown',
        'strongPassword',
      );

      expect(spyFindOne).toHaveBeenCalledWith('login', 'unknown');
      expect(authValidateUser).toBe(null);
    });
  });
});
