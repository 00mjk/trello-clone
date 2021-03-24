import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtStrategy } from "../../auth/strategies";

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization.split(" ")[1])

    console.log(request.params)
    return true;
  }
}