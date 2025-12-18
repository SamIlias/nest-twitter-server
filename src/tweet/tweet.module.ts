import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';

import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
