import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CardExsistGuard implements CanActivate {
  constructor(@Inject('ColumnService') private readonly columnService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.user;
    const { columnId } = request.body;
    const column = await this.columnService.findOne(userId, columnId);
    if (!column) {
      return false;
    }
    return true;
  }
}
