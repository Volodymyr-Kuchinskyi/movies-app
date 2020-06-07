import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(login: string, password: string): Promise<User> {
    return this.usersRepository.save({ login, password });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(login: string): Promise<User> {
    return this.usersRepository.findOne({ login });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
