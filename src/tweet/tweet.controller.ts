import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TweetService } from './tweet.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { User } from '../entities/user.entity';

@Controller('tweets')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  getAll() {
    return this.tweetService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.tweetService.getById(id);
  }

  @Get('user/:userId')
  getByUser(@Param('userId') userId: number) {
    return this.tweetService.getByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request & { user: User }, @Body() dto: CreateTweetDto) {
    return this.tweetService.create(req.user.id, dto);
  }
}
