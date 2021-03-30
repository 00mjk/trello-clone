import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CardService } from '../card.service';

@Injectable()
export class CardExsistGuard implements CanActivate {
  constructor(
    @Inject('CardService') private readonly cardService: CardService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { columnId } = request.body;
    const { cardId } = request.body;
    const card = await this.cardService.findOne(columnId, cardId);
    if (!card) {
      throw new HttpException('Cards not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
