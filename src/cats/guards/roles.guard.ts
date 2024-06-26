import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from '../decorators/newRoles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles)
    const roles = this.reflector.get(Roles, context.getHandler());    console.log('roles ', roles)
    if(!roles){
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return true // matchRoles check if not throw new UnauthorizedException();
  }
}
