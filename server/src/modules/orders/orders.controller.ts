import {
  Body,
  Param,
  Controller,
  Delete,
  Post,
  Get,
  Put,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ProductsResponse } from '../../interfaces/product.interface';
import { OrderDetailsDto } from './dto/order-details.dto';
import { ApiErrorResponse } from '../../utils/constants';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get orders',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  getOrder(): Promise<Order[]> {
    return this.ordersService.get();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create order',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  createOrder(@Body() body: OrderDto): Promise<Order> {
    return this.ordersService.create(body);
  }

  @Post('details')
  @ApiResponse({
    status: 200,
    description: 'Create order',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  createOrderDetails(@Body() body: OrderDetailsDto): Promise<Order> {
    return this.ordersService.createDetails(body);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update order',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  updateOrder(@Param('id') id: string, @Body() body: OrderDto): Promise<Order> {
    return this.ordersService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete order',
    type: ProductsResponse,
  })
  @ApiResponse(ApiErrorResponse)
  deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.delete(id);
  }
}
