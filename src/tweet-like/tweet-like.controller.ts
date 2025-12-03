import {
  Controller,
  Param,
  Post,
  Get,
  Req,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { TweetLikeService } from './tweet-like.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tweets/:tweetId/likes')
export class TweetLikeController {
  constructor(private readonly likeService: TweetLikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async toggleLike(
    @Param('tweetId', ParseIntPipe) tweetId: number,
    @Req() req: Request & { user: User },
  ) {
    return this.likeService.toggleLike(tweetId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('is-liked')
  async isLiked(
    @Param('tweetId', ParseIntPipe) tweetId: number,
    @Req() req: Request & { user: User },
  ) {
    const isLiked = await this.likeService.isLiked(tweetId, req.user.id);
    return { isLiked };
  }

  @Get('count')
  async countLikes(@Param('tweetId', ParseIntPipe) tweetId: number) {
    const count = await this.likeService.countLikes(tweetId);
    return { count };
  }

  @Get('users')
  async listUsers(@Param('tweetId', ParseIntPipe) tweetId: number) {
    return this.likeService.getLikedUsers(tweetId);
  }
}
