import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { AppModule } from '../app.module';
import { usersData } from './seedData/users-data';
import { tweetsData } from './seedData/tweets-data';
import { tweetLikesData } from './seedData/tweets-like-data';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);

  await seeder.clearDatabase();
  await seeder.seed(usersData, tweetsData, tweetLikesData);

  await app.close();
}

run();
