import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnTrello } from './entity/column.entity';

@Injectable()
export class ColumnService {
    
}
