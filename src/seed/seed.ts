import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { AppModule } from '../app.module';
import { usersData } from './seedData/usersData';
import { tweetsData } from './seedData/tweetsData';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);

  await seeder.clearDatabase();
  await seeder.seed(usersData, tweetsData);

  await app.close();
}

run();
