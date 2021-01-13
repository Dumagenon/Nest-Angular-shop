import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as sinon from 'sinon';
import { CustomerDto } from '../customers/dto/customer.dto';

describe('AuthController', () => {
  let authController: AuthController;
  const authService: AuthService = sinon.createStubInstance(AuthService);

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

  beforeEach(() => {
    authController = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return user: any, token: string', async () => {
      const result = { user: null, token: '' };
      jest.spyOn(authService, 'login').mockImplementation(async () => result);

      expect(await authController.login(mockLoginData)).toBe(result);
    });
  });

  describe('signup', () => {
    it('should return user: any, token: string', async () => {
      const result = { user: null, token: '' };
      jest.spyOn(authService, 'create').mockImplementation(async () => result);

      expect(await authController.signUp(mockSignUpData)).toBe(result);
    });
  });
});
