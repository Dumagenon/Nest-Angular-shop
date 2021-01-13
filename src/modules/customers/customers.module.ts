import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './entity/customer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
