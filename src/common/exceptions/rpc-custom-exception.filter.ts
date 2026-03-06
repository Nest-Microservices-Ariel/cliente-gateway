import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { stat } from 'fs';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;

    const rpcError = exception.getError();

    if(rpcError.toString().includes('Empty response')) {
      return response .status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }


    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(rpcError.status as HttpStatus)
        ? HttpStatus.BAD_REQUEST
        : (rpcError.status as HttpStatus);

      return response.status(status).json(rpcError);
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: rpcError,
    });
  }
}
