import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsResponse } from './interfaces/product.interface';

@Controller()
export class AppController {}
