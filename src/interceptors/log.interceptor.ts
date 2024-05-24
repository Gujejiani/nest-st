import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
     // log response 
     this.logger.log('Hi from interceptor')

    return next
      .handle()
      .pipe(
        tap((data) => console.log(`Log InterceptorAfter... ${Date.now() - now}ms`, data)),
      );
  }
}