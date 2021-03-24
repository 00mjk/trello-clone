import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CardOwnerGuard implements CanActivate {
    constructor(@Inject('ColumnService') private readonly columnService) { }
    async canActivate(
        context: ExecutionContext,
    ) {
        const request = context.switchToHttp().getRequest();
        
        const column = await this.columnService.findOne(request.user.userId, request.body.columnId)
        if (column) {
            request.column = column
            return true
        }
        return false;
    }
}