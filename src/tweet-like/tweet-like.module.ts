import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetLike } from '../entities/tweet-like.entity';
import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';
import { TweetLikeController } from './tweet-like.controller';
import { TweetLikeService } from './tweet-like.service';

@Module({
  imports: [TypeOrmModule.forFeature([TweetLike, Tweet, User])],
  controllers: [TweetLikeController],
  providers: [TweetLikeService],
  exports: [TweetLikeService],
})
export class TweetLikeModule {}
