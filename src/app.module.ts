import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './cats/guards/auth.guard';

// covered Dynamic modules
@Module({
  imports: [
   
    
    
    CacheModule.register({
    ttl: 10, // seconds

    max: 20, // maximum number of items in cache
    isGlobal: true
    
  
  }), 
  ConfigModule.forRoot(
    {
      envFilePath: '.development.env',
      isGlobal: true
    }),
    ScheduleModule.forRoot(
     
    ),
    EventEmitterModule.forRoot(),
  CatsModule,
  UsersModule,
  AuthModule
],
  controllers: [AppController ],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

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
