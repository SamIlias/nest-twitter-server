import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { cookieExtractor } from '../lib/cookieExtractor';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  id: number;
  email?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    if (!payload || !payload.id) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
