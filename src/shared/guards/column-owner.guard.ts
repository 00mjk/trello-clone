import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

// REVU: Странная проверка на владение колонкой. Правельнее будет сравнивать с сущностями из базы
@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.user && request.body){
        return request.user.userId === request.body.userId
    }
    return false;
  }
}