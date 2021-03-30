import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CardService } from "../card.service";

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(@Inject('CardService') private readonly cardService: CardService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException()
    }
    const { id } = request.user
    const { columnId }  = request.body 
    const cardId = request.params.id
    if(cardId){
      const card = await this.cardService.findOne(columnId,cardId)
      if(!card){
        throw new HttpException("Card not found", HttpStatus.NOT_FOUND)
      }
      return id === card.userId
    }
    return true;
  }
}
