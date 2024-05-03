import { Module } from '@nestjs/common';
import { AnimalsController } from 'src/animals/animals.controller';
import { CatsController } from 'src/cats/controllers/cats.controller';
import { CatsService } from 'src/cats/services/cats.service';
// @Global()
@Module({
    imports: [],
    controllers: [CatsController, AnimalsController],
    providers: [CatsService],
})
export class CatsModule {
    static register(){
        console.log('Cats Module is registered')
        return {
            module: CatsModule,
            providers: [CatsService],
            controllers: [CatsController],
            exports: [CatsService]
        }
    }
}
