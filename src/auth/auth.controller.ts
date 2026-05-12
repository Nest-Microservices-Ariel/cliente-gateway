import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guard/auth.guard';
import { Token, User } from './decorators';
import type { CurrentUser } from './intefaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
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
  async register(@Body() userDto: RegisterUserDto) {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.register.user', userDto)
      );

      return result;
    } catch (error) {
      throw new RpcException(error as string | object);
    }
  }

  @UseGuards( AuthGuard )
  @Get('verify')
  async verify(@User() user: CurrentUser, @Token() token: string ) {

    return this.client.send('auth.verify.user', { user, token }).pipe(
      catchError((err) => {
        throw new RpcException(err as string | object);
      })
    );
  }
}
