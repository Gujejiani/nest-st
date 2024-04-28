import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Post, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Cat } from 'src/interfaces/cats.interface';

import { CatsService } from 'src/cats/services/cats.service';

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService){
      
    }

    @Post('create')
     createCat(@Body() createCatDto: CreateCatDto) {
     return this.catsService.create(createCatDto);
    }

  @Get()
  findAll(@Req() _request: Request): Cat[] {
    // console.log(request);

    return  this.catsService.findAll();
  }

  @Post('add')
  @HttpCode(204) // adding status codex
  create() {
    return 'This action adds a new cat';
  }


    @Post()
    @Header('Cache-Control', 'none') // set headers
    list() {
      return 'This action adds a new cat';
    }

    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    redirect(){
      return 'This action redirects to nestjs.com';
    }

    // more about controllers https://docs.nestjs.com/controllers
}

