import { Injectable } from '@nestjs/common';
//covered https://docs.nestjs.com/fundamentals/custom-providers
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Kak';
  }
}
