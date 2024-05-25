import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/dtos/loginDto';
import { AuthGuard } from 'src/cats/guards/auth.guard';
import { Public } from 'src/cats/decorators/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Public()
@HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }



//   @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user ?? 'No user found';
  }
}