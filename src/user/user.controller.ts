import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';
import { User } from '../entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request & { user: User }) {
    return this.userService.getById(req.user.id);
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(
    @Req() req: Request & { user: User },
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async updatePassword(
    @Req() req: Request & { user: User },
    @Body() dto: UpdateUserPasswordDto,
  ) {
    const userId = req.user.id;

    return this.userService.updatePassword(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('follow/:id')
  async follow(
    @Req() req: Request & { user: User },
    @Param('id', ParseIntPipe) targetUserId: number,
  ) {
    return this.userService.follow(req.user.id, targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfollow/:id')
  async unfollow(
    @Req() req: Request & { user: User },
    @Param('id', ParseIntPipe) targetUserId: number,
  ) {
    return this.userService.unfollow(req.user.id, targetUserId);
  }
}
