import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CardService } from '../../card/card.service';
import { ColumnService } from '../../column/column.service';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    @Inject('ColumnService') private readonly columnService: ColumnService,
    @Inject('CardService') private readonly cardService: CardService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { columnId, cardId } = request.body;
    const { userId } = request.user;

    const column = await this.columnService.findOne(userId, columnId);
    if (!column) {
      return false;
    }
    const card = await this.cardService.findOne(columnId, cardId);
    if (!card) {
      return false;
    }
    return true;
  }
}
