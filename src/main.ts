import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './global/contextIdStrategy';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn', 'log'],
  
  });
  // global middlware 
 // app.use(middlWare)
 app.use(cookieParser());
   // Starts listening for shutdown hooks
    app.enableShutdownHooks();
 ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  await app.listen(4000);
}
bootstrap();
