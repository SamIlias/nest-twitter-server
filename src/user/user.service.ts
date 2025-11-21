import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  private mapUserToDto(user: User): ResponseUserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      telegramLink: user.telegramLink,
      status: user.status,
      email: user.email,
      avaUrl: user.avaUrl,
      bannerUrl: user.bannerUrl,
      phone: user.phone ?? null,
      birthDate: user.birthDate ? new Date(user.birthDate).toISOString() : null,
      tweetsIds: user.tweets?.map((t) => t.id) ?? [],
      followingIds: user.following?.map((u) => u.id) ?? [],
      followerIds: user.followers?.map((u) => u.id) ?? [],
    };
  }

  private async loadUser(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['followers', 'following', 'tweets'],
    });

    if (!user) {
      throw new NotFoundException(`The user with id=${id} is not found`);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<ResponseUserDto> {
    const user = this.repo.create(dto);
    const saved = await this.repo.save(user);
    return this.mapUserToDto(saved);
  }

  async getAll(exceptId?: number): Promise<ResponseUserDto[]> {
    const users = await this.repo.find({
      relations: ['followers', 'following', 'tweets'],
    });

    const filtered = exceptId ? users.filter((u) => u.id !== exceptId) : users;

    return filtered.map((u) => this.mapUserToDto(u));
  }

  async getById(id: number): Promise<ResponseUserDto> {
    const user = await this.loadUser(id);
    return this.mapUserToDto(user);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async update(id: number, dto: UpdateUserDto): Promise<ResponseUserDto> {
    await this.repo.update(id, dto);
    const updated = await this.loadUser(id);
    return this.mapUserToDto(updated);
  }

  async follow(userId: number, targetUserId: number): Promise<ResponseUserDto> {
    if (userId === targetUserId) {
      throw new BadRequestException('You can not follow yourself');
    }

    const user = await this.loadUser(userId);
    const target = await this.loadUser(targetUserId);

    const alreadyFollowing = user.following.some((u) => u.id === targetUserId);

    if (alreadyFollowing) {
      throw new BadRequestException('You are already following this user');
    }

    user.following.push(target);
    await this.repo.save(user);

    const updated = await this.loadUser(userId);
    return this.mapUserToDto(updated);
  }

  async unfollow(
    userId: number,
    targetUserId: number,
  ): Promise<ResponseUserDto> {
    const user = await this.loadUser(userId);

    const isFollowing = user.following.some((u) => u.id === targetUserId);

    if (!isFollowing) {
      throw new BadRequestException('You are not following this user');
    }

    user.following = user.following.filter((u) => u.id !== targetUserId);

    await this.repo.save(user);

    const updated = await this.loadUser(userId);
    return this.mapUserToDto(updated);
  }
}
