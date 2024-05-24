import { HttpException, HttpStatus, Injectable, NotFoundException, OnModuleInit, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModuleRef } from "@nestjs/core";
import { AnimalsController } from "src/animals/animals.controller";
import { CommonService } from "src/common/common.service";
import { Cat } from "src/interfaces/cats.interface";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable({
  scope: Scope.REQUEST,
  durable: true
})
export class CatsService implements OnModuleInit {
    private readonly cats: Cat[] = [];
    private service: AnimalsController;
    constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {}
    // constructor(private moduleRef: ModuleRef) {}
    onModuleInit() {
      // doesn't fire if score is Request or transient and using durable
      console.log('cats service initialized')
      // this.service = this.moduleRef.get(AnimalsController);
      console.log(this.service)
    }
    create(cat: Cat) {
        this.eventEmitter.emit('cat_created', cat)
      this.cats.push(cat);
      return 'cat added'
    }
  
    findAll(): Cat[] {
      const dbUser = this.configService.get<string>('DATABASE_USER')
      console.log(dbUser, 'jaja')
      return this.cats;
    }
    findOne(id: number): Cat {
      if(this.cats[id] === undefined){
        throw new HttpException('not found', HttpStatus.NOT_FOUND)
      }
      return this.cats[id];
    }

    
}