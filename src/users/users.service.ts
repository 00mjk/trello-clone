import { BadRequestException, Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm'
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
      ){}

      async findOne(email: string): Promise<User|null> {
        return await this.userRepository.findOne({email})
      }

      async save(email: string,pass: string,username: string): Promise<void> {
        await this.userRepository.save({email,pass,username})
      }

      async findById(id: string): Promise<User|null> {
        return await this.userRepository.findOne({id})
      }
}