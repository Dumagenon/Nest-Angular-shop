import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CustomersModule } from '../customers/customers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from '../../utils/constants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from '../brands/entity/brand.entity';
import { Product } from '../products/entity/product.entity';
import { Category } from '../categories/entity/category.entity';
import { ProductCategories } from '../categories/entity/product-categories.entity';
import { Customer } from '../customers/entity/customer.entity';
import { Order } from '../orders/entity/order.entity';
import { OrderInfo } from '../orders/entity/order-info.entity';
import { OrderDetails } from '../orders/entity/order-details.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;

  const mockedUser = {
    username: 'КозийРог',
    password: 'Zxasqw12',
  };

  const mockRes = {
    user: {
      login: 'КозийРог',
      email: 'v3@mail.com',
      phone: null,
      type: null,
    },
    token: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CustomersModule,
        PassportModule,
        JwtModule.register({
          secret: JWT_KEY,
          signOptions: { expiresIn: '1h' },
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'Zxasqw12',
          database: 'powertoolsstore',
          models: [
            Brand,
            Product,
            Category,
            ProductCategories,
            Customer,
            Order,
            OrderInfo,
            OrderDetails,
          ],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/auth/login', () => {
    it('handles the login of an existing user', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(mockedUser)
        .expect(201)
        .expect(mockRes);
    });
  });
});
