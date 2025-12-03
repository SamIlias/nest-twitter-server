import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { User } from '../entities/user.entity';
import { Tweet } from '../entities/tweet.entity';
import { TweetLike } from '../entities/tweet-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet, TweetLike])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
