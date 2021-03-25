import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { In } from "typeorm";
import { CardService } from "../../card/card.service";
import { ColumnService } from "../../column/column.service";

// REVU: Здесь, судя по названию, кажется должна проходить проверка на владение юзером коммента
@Injectable()
export class CommentOwnerGuard implements CanActivate {
    constructor(
        @Inject('ColumnService') private readonly columnService:ColumnService,
        @Inject('CardService') private readonly cardService: CardService
        ) { }
    async canActivate(
        context: ExecutionContext,
    ) {
        const request = context.switchToHttp().getRequest();
        
        // REVU: пробелы
        const {columnId,cardId} = request.body
        const {userId} = request.user

        // REVU: Можно вынести в отдельный гуард. Например ColumnExistsGuard.
        const column = await this.columnService.findOne(userId, columnId)
        if (!column) {
            return false;
        }

        // REVU: То же что и выше.
        const card = await this.cardService.findOne(columnId,cardId)
        if(!card){
            return false;
        }
        request.column = column
        request.card = card
        return true
        
    }
}