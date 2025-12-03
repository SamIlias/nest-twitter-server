import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';
import { ResponseTweetDto } from './dto/response-tweet.dto';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly repo: Repository<Tweet>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private mapTweetToDto(tweet: Tweet): ResponseTweetDto {
    return {
      id: tweet.id,
      userId: tweet.user.id,
      textContent: tweet.textContent,
      createdAt: tweet.createdAt.toISOString(),
      image: tweet.image ?? null,
    };
  }

  private async loadTweet(id: number): Promise<Tweet> {
    const tweet = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!tweet) {
      throw new NotFoundException(`Tweet with id=${id} not found`);
    }

    return tweet;
  }

  async create(
    userId: number,
    content: CreateTweetDto,
  ): Promise<ResponseTweetDto> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tweet = this.repo.create({ ...content, user });
    const saved = await this.repo.save(tweet);

    const loaded = await this.loadTweet(saved.id);
    return this.mapTweetToDto(loaded);
  }

  async getAll(): Promise<ResponseTweetDto[]> {
    const tweets = await this.repo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return tweets.map((t) => this.mapTweetToDto(t));
  }

  async getById(id: number): Promise<ResponseTweetDto> {
    const tweet = await this.loadTweet(id);
    return this.mapTweetToDto(tweet);
  }

  async getByUserId(userId: number): Promise<ResponseTweetDto[]> {
    const tweets = await this.repo.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return tweets.map((t) => this.mapTweetToDto(t));
  }
}
