import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, UpdateOrderDto } from './dto';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDERS_SERVICE) private readonly ordersProxy: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersProxy.send('createOrder', { ...createOrderDto }).pipe(
      catchError((err) => { throw new RpcException(err) })
    );
  }

  @Get()
  findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {
    return this.ordersProxy.send('findAllOrders', orderPaginationDto).pipe(
      catchError((err) => { throw new RpcException(err) })
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersProxy.send('findOneOrder', { id }).pipe(
      catchError((err) => { throw new RpcException(err) })
    );
  }

  @Patch(':id')
  chaneOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersProxy.send('changeOrderStatus', { id, ...updateOrderDto }).pipe(
      catchError((err) => { throw new RpcException(err) })
    );
  }
}
