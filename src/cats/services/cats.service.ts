import { HttpException, HttpStatus, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { Cat } from "src/interfaces/cats.interface";


@Injectable({
  scope: Scope.REQUEST,
  durable: true
})
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
      this.cats.push(cat);
      return 'cat added'
    }
  
    findAll(): Cat[] {
      return this.cats;
    }
    findOne(id: number): Cat {
      if(this.cats[id] === undefined){
        throw new HttpException('not found', HttpStatus.NOT_FOUND)
      }
      return this.cats[id];
    }
}