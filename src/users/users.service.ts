import { BadRequestException, Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProfileDto } from './dto/get-profile.dto';
import { User } from './users.entity';

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

  async getUserInfo(userId?: string,paramId?:string): Promise<GetProfileDto>{
    if(userId !== paramId){
      throw new UnauthorizedException("Unathorized")
    }
    const user = await this.usersRepository.findOne({id: userId})
    return new GetProfileDto(user.username,user.email,user.id)
    
  }
}