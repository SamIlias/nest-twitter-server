import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Tweet } from '../entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TweetLike } from '../entities/tweet-like.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Tweet)
    private tweetRepo: Repository<Tweet>,
    @InjectRepository(TweetLike)
    private tweetLikeRepo: Repository<TweetLike>,
  ) {}

  async seed(
    usersData: CreateUserDto[],
    tweetsData: Partial<Tweet>[],
    tweetLikesData: Partial<TweetLike>[],
  ): Promise<void> {
    const users = this.userRepo.create(usersData);
    await this.userRepo.save(users);

    const tweets = this.tweetRepo.create([
      { ...tweetsData[0], user: users[0] },
      { ...tweetsData[1], user: users[0] },
      { ...tweetsData[2], user: users[1] },
      { ...tweetsData[3], user: users[1] },
      { ...tweetsData[4], user: users[2] },
      { ...tweetsData[5], user: users[2] },
      { ...tweetsData[6], user: users[3] },
      { ...tweetsData[7], user: users[3] },
      { ...tweetsData[8], user: users[4] },
      { ...tweetsData[9], user: users[4] },
      { ...tweetsData[10], user: users[5] },
      { ...tweetsData[11], user: users[5] },
      { ...tweetsData[12], user: users[6] },
      { ...tweetsData[13], user: users[6] },
      { ...tweetsData[14], user: users[7] },
      { ...tweetsData[15], user: users[7] },
      { ...tweetsData[16], user: users[8] },
      { ...tweetsData[17], user: users[8] },
      { ...tweetsData[18], user: users[9] },
      { ...tweetsData[19], user: users[9] },
    ]);

    await this.tweetRepo.save(tweets);

    const tweetLikes = tweetLikesData.map(({ user, tweet }) =>
      this.tweetLikeRepo.create({
        user: users[user!.id],
        tweet: tweets[tweet!.id],
      }),
    );

    await this.tweetLikeRepo.save(tweetLikes);

    console.log('Database seeded successfully');
  }

  async clearDatabase(): Promise<void> {
    await this.tweetRepo.query('TRUNCATE TABLE "tweet" CASCADE');
    await this.userRepo.query('TRUNCATE TABLE "user" CASCADE');

    console.log('Database cleared successfully');
  }
}
