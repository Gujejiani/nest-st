import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Redirect, Req, Res, Scope, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Cat } from 'src/interfaces/cats.interface';

import { CatsService } from 'src/cats/services/cats.service';
import { ZodValidationPipe } from 'src/pipes/validation.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/log.interceptor';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';
import { Role } from 'src/enums/role.enum';
import { MetadataRoles } from '../decorators/newRoles.decorator';

@Controller({
  path: 'cats',
  // scope: Scope.REQUEST

})
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {

    constructor(private catsService: CatsService){
      
    }
    @MetadataRoles(Role.Admin)
    @Public()
    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles(['admin'])
    createCat(@Body()  createCatDto: CreateCatDto) {
     return this.catsService.create(createCatDto);
    }

  @Public()
  @Get()
  @CacheKey('custom_key')
  @CacheTTL(20)
  findAll(@Res({ passthrough: true }) response: Response): Cat[] {
    // console.log(request);
    response.cookie('test', 'test');
    // set content length 
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

    // example of lazy loading
    // @Get('admin')
    // async getAdminPanel() {
    //   const { AdminModule } = await import('./admin/admin.module');
    //   // Now you can use AdminModule to handle the request
    // }
    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    redirect(){
      return 'This action redirects to nestjs.com';
    }

    // more about controllers https://docs.nestjs.com/controllers
}

