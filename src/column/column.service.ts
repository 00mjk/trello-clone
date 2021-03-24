import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/users.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnTrello } from './entity/column.entity';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnTrello)
        private columnRepository: Repository<ColumnTrello>){}
    

}
