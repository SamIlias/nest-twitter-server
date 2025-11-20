import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private repo: Repository<Tweet>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userId: number, content: any) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const tweet = this.repo.create({ ...content, user });
    return this.repo.save(tweet);
  }

  async getAll() {
    return this.repo.find();
  }

  async getById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async getByUserId(userId: number) {
    return this.repo.find({ where: { user: { id: userId } } });
  }
}
