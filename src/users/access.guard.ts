import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.params.id === request.user.userId;
  }
}
