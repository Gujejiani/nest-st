import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Redirect, Req, Scope, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Cat } from 'src/interfaces/cats.interface';

import { CatsService } from 'src/cats/services/cats.service';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/log.interceptor';

@Controller({
  path: 'cats',
  // scope: Scope.REQUEST

})
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {

    constructor(private catsService: CatsService){
      
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles(['admin'])
    createCat(@Body()  createCatDto: CreateCatDto) {
     return this.catsService.create(createCatDto);
    }

  @Get()
  findAll(@Req() _request: Request): Cat[] {
    // console.log(request);
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return  this.catsService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
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

