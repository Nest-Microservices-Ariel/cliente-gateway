import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { PaginationDto } from '../common';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, productDto).pipe(
      catchError((err) => { throw new RpcException(err) })
    )
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findProduct(@Param('id', ParseIntPipe) id: number) {
    // Alternativa a este cuerpo en el delete
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id })
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => { throw new RpcException(err) })
    );
  }
}
