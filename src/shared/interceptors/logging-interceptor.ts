import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.log('info', {
            level: 'info',
            message: 'Request logged',
            url: request.url,
            requestTime: now,
            responseTime: new Date(),
            status: response.statusCode,
            requestBody: request.body,
          });
        },
        error: (err) => {
          this.logger.error('error', {
            level: 'error',
            message: 'Error logged',
            url: request.url,
            requestTime: now,
            responseTime: new Date(),
            error: err,
            requestBody: request.body,
          });
        },
      }),
    );
  }
}
