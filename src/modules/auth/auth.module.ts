import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomersModule } from '../customers/customers.module';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { AuthController } from './auth.controller';
import { JWT_KEY } from '../../utils/constants';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CustomersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
