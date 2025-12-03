import { Tweet } from 'src/entities/tweet.entity';
import { User } from 'src/entities/user.entity';
import { TweetLike } from 'src/entities/tweet-like.entity';

export const tweetLikesData: Partial<TweetLike>[] = [
  {
    user: { id: 1 } as User,
    tweet: { id: 1 } as Tweet,
  },
  {
    user: { id: 2 } as User,
    tweet: { id: 1 } as Tweet,
  },
  {
    user: { id: 3 } as User,
    tweet: { id: 2 } as Tweet,
  },
  {
    user: { id: 1 } as User,
    tweet: { id: 3 } as Tweet,
  },
  {
    user: { id: 4 } as User,
    tweet: { id: 3 } as Tweet,
  },
  {
    user: { id: 2 } as User,
    tweet: { id: 4 } as Tweet,
  },
  {
    user: { id: 5 } as User,
    tweet: { id: 5 } as Tweet,
  },
  {
    user: { id: 3 } as User,
    tweet: { id: 5 } as Tweet,
  },
];
