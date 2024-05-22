import { Module, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AnimalsController } from 'src/animals/animals.controller';
import { CatsController } from 'src/cats/controllers/cats.controller';
import { CatsService } from 'src/cats/services/cats.service';
// @Global()
@Module({
    imports: [],
    controllers: [CatsController, AnimalsController],
    providers: [CatsService],
})
export class CatsModule implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown{
    static register(){
        console.log('Cats Module is registered')
        return {
            module: CatsModule,
            providers: [CatsService],
            controllers: [CatsController],
            exports: [CatsService]
        }
    }
    onModuleInit() {
        console.log('cats module initialized')
    }
    onModuleDestroy() {
        console.log('cats module destroyed')
    }
    onApplicationShutdown(signal?: string) {
        console.log('cats module shutdown', signal)
    }
}
