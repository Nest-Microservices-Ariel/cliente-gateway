import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Token = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if(!request.token) {
      throw new InternalServerErrorException('Token not found on request! (AuthGuard)');
    }

    return request.token;
  }
);