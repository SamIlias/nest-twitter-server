import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Tweet } from '../entities/tweet.entity';
import { TweetLike } from '../entities/tweet-like.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ilya',
  password: 'ilya_password',
  database: 'twitter_clone',
  entities: [User, Tweet, TweetLike],
  synchronize: true,
};
