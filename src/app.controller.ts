import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';
import { Public } from './cats/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Public()
  @Sse('sse')
  sse(): Observable<{data: {hello: string}}> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
