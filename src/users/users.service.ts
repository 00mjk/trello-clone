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

      // REVU: каждый метод должен что-то возвращать. Тут можно возвращать сущность юзера.
      async save(email: string,pass: string,username: string): Promise<void> {
        await this.userRepository.save({email,pass,username})
      }

      // REVU: лучше сделай на оборот. Пусть findOne ищет по id,
      // а этот метод передела в findByEmail
      async findById(id: string): Promise<User|null> {
        return await this.userRepository.findOne({id})
      }
}