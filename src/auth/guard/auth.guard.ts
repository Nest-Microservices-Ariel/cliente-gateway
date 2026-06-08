import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { firstValueFrom, Observable } from "rxjs";
import { Request } from 'express'
import { ClientProxy } from "@nestjs/microservices";
import { NATS_SERVICE } from "../../config";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token) {
      throw new UnauthorizedException('Token not found!');
    }

    try {
      const { token: newToken, user } = await firstValueFrom(
        this.client.send('auth.verify.token', token)
      );
      
      request['user'] = user;
      request['token'] = newToken;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  
}