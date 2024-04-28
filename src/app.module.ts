import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {

  
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'cats',
      method: RequestMethod.GET // to apply middleware to specific method
    
    });
   // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

    // consumer
    // .apply(LoggerMiddleware)
    // .forRoutes(CatsController); // we can pass controller class to apply middleware to all routes of that controller
    
   // consumer.apply for applying another middleware
  }
}
