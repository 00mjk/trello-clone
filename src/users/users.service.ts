import {
  BadRequestException,
  Get,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  async save(email: string, password: string, username: string): Promise<User> {
    return await this.userRepository.save({ email, password, username });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ id });
  }
}
