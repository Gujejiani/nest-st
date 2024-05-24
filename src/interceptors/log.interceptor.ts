import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
     // log response 
       

    return next
      .handle()
      .pipe(
        tap((data) => console.log(`Log InterceptorAfter... ${Date.now() - now}ms`, data)),
      );
  }
}