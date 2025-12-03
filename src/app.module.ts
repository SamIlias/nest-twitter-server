import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { typeormConfig } from './config/ormconfig';
import { SeederModule } from './seed/seeder.module';
import { ConfigModule } from '@nestjs/config';
import { TweetLikeModule } from './tweet-like/tweet-like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    TweetModule,
    TweetLikeModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
