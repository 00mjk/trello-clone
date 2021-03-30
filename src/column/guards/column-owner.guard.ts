import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ColumnService } from '../column.service';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  constructor(@Inject('ColumnService') private readonly columnService: ColumnService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException()
    }
    const { id } = request.user
    const  columnId  = request.params.id
    if(columnId){
      const column = await this.columnService.findOne(id,columnId)
      if(!column){
        throw new HttpException("Columns not found", HttpStatus.NOT_FOUND)
      }
      return id === column.user.id
    }
    return true;
  }
}
