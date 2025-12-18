import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TweetLike } from '../entities/tweet-like.entity';
import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TweetLikeService {
  constructor(
    @InjectRepository(TweetLike)
    private readonly likeRepo: Repository<TweetLike>,
    @InjectRepository(Tweet)
    private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async toggleLike(tweetId: number, userId: number) {
    const tweet = await this.tweetRepo.findOne({ where: { id: tweetId } });
    if (!tweet) throw new NotFoundException('Tweet not found');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.likeRepo.findOne({
      where: { tweet: { id: tweetId }, user: { id: userId } },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      return { liked: false };
    }

    const like = this.likeRepo.create({ tweet, user });
    await this.likeRepo.save(like);

    return { liked: true };
  }

  async isLiked(tweetId: number, userId: number): Promise<boolean> {
    const like = await this.likeRepo.findOne({
      where: {
        tweet: { id: tweetId },
        user: { id: userId },
      },
      select: { id: true },
    });

    return !!like;
  }

  async countLikes(tweetId: number) {
    return this.likeRepo.count({ where: { tweet: { id: tweetId } } });
  }

  async getLikedUsers(tweetId: number) {
    return this.likeRepo.find({
      where: { tweet: { id: tweetId } },
      relations: ['user'],
    });
  }
}
