import { Module } from '@nestjs/common';
import { CatsController } from 'src/controllers/cats/cats.controller';
import { CatsService } from 'src/services/cats/cats.service';

@Module({
    imports: [],
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {

}
