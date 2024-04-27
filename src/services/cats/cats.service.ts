import { Injectable } from "@nestjs/common";
import { Cat } from "src/interfaces/cats.interface";


@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
      this.cats.push(cat);
      return 'cat added'
    }
  
    findAll(): Cat[] {
      return this.cats;
    }
}