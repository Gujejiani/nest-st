import { Injectable,Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { Cat } from './interfaces/cats.interface';

//covered https://docs.nestjs.com/fundamentals/custom-providers
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  @OnEvent('cat_created')
  handleOrderCreatedEvent(payload: Cat) {
    console.log('EventEmitted ', payload)
    // handle and process "OrderCreatedEvent" event
  }

  @Cron('10 * * * * *')
  handleCron() {
    console.log('am called')
    this.logger.debug('Called when the current second is 45');
  }
}
