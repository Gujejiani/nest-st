import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './global/contextIdStrategy';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn', 'log'],
  });

  // Apply middleware
  app.use(cookieParser());
  app.use(compression());

  // Enable shutdown hooks
  app.enableShutdownHooks();

  // Apply custom context ID strategy
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

  // Start the server
  await app.listen(4000);
  console.log('Application is running on: http://localhost:4000');
}

bootstrap();
