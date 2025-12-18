import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    console.log('Hello AppService');
  }
}
