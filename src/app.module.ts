import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { createConnection } from 'net';

@Module({
  imports: [CatsModule],
  controllers: [AppController, ],
  providers: [AppService,
  

    // At times, the application start should be delayed until one or more asynchronous tasks are completed. 
    // {
    //   provide: 'ASYNC_CONNECTION',
    //   useFactory: async () => {
    //     const connection = await createConnection(options);
    //     return connection;
    //   },
    // }
  ],
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
