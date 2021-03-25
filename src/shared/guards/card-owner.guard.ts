import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

// REVU: Guard'ы размещай в модулях связанных сущностей
@Injectable()
export class CardOwnerGuard implements CanActivate {
    constructor(@Inject('ColumnService') private readonly columnService) { }
    async canActivate(
        context: ExecutionContext,
    ) {
        const request = context.switchToHttp().getRequest();
        
        // REVU: по правилам кодстайла тут должны быть пробелы.
        // Правельнее будет писать: const { propertyName } = object;
        const {userId} = request.user
        const {columnId} = request.body
        // REVU: добаляй пробелы в аргументах функции
        const column = await this.columnService.findOne(userId,columnId)

        // REVU: перед блоками if {} по кодстайлу нужно добавлять вертикальный отступ
        if (!column) {
            return false;
        }

        // REVU: в Guard'ах так делать не надо. В Guard'e должна находиться только проверка прав доступа.
        // В целом в этом нет необходимости, т.к. далее ты используешь только id. Будет лучше, если ты будешь
        // получать это в контроллер через @Body(). Это касается всех Guard'ов.
        request.column = column
        return true
        
    }
}