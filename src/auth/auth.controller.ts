import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post('login')
  async login(@Body() userDto: any) {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.login.user', userDto)
      );

      return result;
    } catch (error) {
      throw new RpcException(error as string | object);
    }
  }

  @Post('register')
  async register(@Body() userDto: any) {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.register.user', userDto)
      );

      return result;
    } catch (error) {
      throw new RpcException(error as string | object);
    }
  }

  @Post('verify')
  async verify(@Body() userDto: any) {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.verify.user', userDto)
      );

      return result;
    } catch (error) {
      throw new RpcException(error as string | object);
    }
  }
}
