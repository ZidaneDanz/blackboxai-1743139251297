import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;
    const userId = user?.id;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data: any) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          this.logger.log(
            `${method} ${url} ${userId ? `[User: ${userId}]` : ''} ${
              responseTime
            }ms`,
          );

          if (process.env.NODE_ENV === 'development') {
            this.logger.debug('Request Body:', JSON.stringify(body));
            this.logger.debug('Response Body:', JSON.stringify(data));
          }
        },
        error: (error) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          this.logger.error(
            `${method} ${url} ${userId ? `[User: ${userId}]` : ''} ${
              responseTime
            }ms`,
            error.stack,
          );
        },
      }),
    );
  }
}