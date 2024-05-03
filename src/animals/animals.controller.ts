import { Controller, Get, Injectable } from "@nestjs/common";
import { CatsService } from "src/cats/services/cats.service";


// is injected service score is transient, it will create new instance of service for each request
// this controller will return empty array of cats because another controller adds it in his own instance
@Controller('animals')
export class AnimalsController {


    constructor(private catsService: CatsService){

    }


    @Get()
    getAllAnimals(){
        return this.catsService.findAll();
    }
}