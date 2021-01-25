import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './entity/brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
