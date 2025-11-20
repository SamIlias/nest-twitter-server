import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async getAll(exceptId?: number) {
    const users = await this.repo.find({
      relations: ['followers', 'following'],
    });
    if (exceptId) return users.filter((u) => u.id !== exceptId);
    return users;
  }

  async getById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['followers', 'following', 'tweets'],
    });
  }

  async getByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, dto);
    return this.getById(id);
  }

  async follow(userId: number, targetUserId: number) {
    const user = await this.getById(userId);
    const target = await this.getById(targetUserId);

    if (user && target) {
      user.following.push(target);
      return this.repo.save(user);
    }
  }
}
