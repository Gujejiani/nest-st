import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get(Roles, context.getHandler());    console.log('roles ', roles)
    if(!roles){
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return true // matchRoles check if not throw new UnauthorizedException();
  }
}
