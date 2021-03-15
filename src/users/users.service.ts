import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { encryptOptions } from '../config/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string) : Promise<User> {
    return this.usersRepository.findOne({email})
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async save(email?: string,pass?: string,username?: string):Promise<void> {
    await this.usersRepository.save({email,pass,username})
  }
}