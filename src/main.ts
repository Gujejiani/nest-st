import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByTenantContextIdStrategy } from './global/contextIdStrategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global middlware 
 // app.use(middlWare)

   // Starts listening for shutdown hooks
    app.enableShutdownHooks();
 ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  await app.listen(4000);
}
bootstrap();
