import { Controller, Get, Header, HttpCode, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {




  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
  }

  @Post()
  @HttpCode(204) // adding status codex
  create() {
    return 'This action adds a new cat';
  }


    @Post()
    @Header('Cache-Control', 'none') // set headers
    list() {
      return 'This action adds a new cat';
    }
}

