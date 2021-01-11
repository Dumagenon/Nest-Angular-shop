import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as sinon from 'sinon';
import { CustomerDto } from '../customers/dto/customer.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from '../customers/customers.service';

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

  const mockSignUpData: CustomerDto = {
    login: 'dumagenon',
    email: 'v@mail.ru',
    type: 'local',
    password: 'Zxasqw12',
  };

  const result = { user: null, token: '' };

  beforeEach(() => {
    authService = new AuthService(userService, jwtService);
  });

  it('Service should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Method login', () => {
    it('should return user: any, token: string', async () => {
      jest.spyOn(authService, 'login').mockImplementation(async () => result);
      expect(await authService.login(mockLoginData)).toBe(result);
    });
  });

  describe('Method signup', () => {
    it('should return user: any, token: string', async () => {
      jest.spyOn(authService, 'create').mockImplementation(async () => result);
      expect(await authService.create(mockSignUpData)).toBe(result);
    });
  });

  describe('Method validateUser', () => {
    it('should return user: any', async () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => result.user);
      expect(
        await authService.validateUser(
          mockLoginData.username,
          mockLoginData.password,
        ),
      ).toBe(result.user);
    });

    it('should return null', async () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(async () => null);
      expect(await authService.validateUser('unknown', 'strongPassword')).toBe(
        null,
      );
    });
  });
});
