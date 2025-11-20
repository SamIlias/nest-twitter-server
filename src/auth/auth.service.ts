import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.userService.create({
      ...dto,
      password: passwordHash,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) return null;

    const passValid = await bcrypt.compare(password, user.password);
    if (!passValid) return null;

    return user;
  }

  //todo extract type
  login(user: { id: number; email: string; password: string }) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
