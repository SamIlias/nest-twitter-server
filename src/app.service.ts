import { Injectable } from '@nestjs/common';
import { User, users } from './data/users';

@Injectable()
export class AppService {
  getHello(): User[] {
    return users;
  }
}
