import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ColumnService } from '../column.service';

@Injectable()
export class ColumnExsistGuard implements CanActivate {
  constructor(
    @Inject('ColumnService') private readonly columnService: ColumnService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { columnId } = request.body;
    const { userId } = request.user;

    const column = await this.columnService.findOne(userId, columnId);
    if (!column) {
        throw new HttpException("Column not found",HttpStatus.NOT_FOUND)
    }
    return true;
  }
}
