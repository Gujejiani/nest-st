import { Injectable,Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

//covered https://docs.nestjs.com/fundamentals/custom-providers
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('10 * * * * *')
  handleCron() {
    console.log('am called')
    this.logger.debug('Called when the current second is 45');
  }
}
