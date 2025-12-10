import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [MinioModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
