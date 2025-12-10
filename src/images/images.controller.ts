import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('images')
export class ImagesController {
  constructor(private readonly minio: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const ext = file.originalname.split('.').pop();
    const key = `images/${uuidv4()}.${ext}`;
    await this.minio.uploadBuffer(key, file.buffer, file.mimetype);
    const url = this.minio.publicUrl(key);
    return { url, key };
  }

  @Get('presign')
  async presign(@Query('filename') filename: string) {
    const ext = filename.split('.').pop();
    const key = `images/${uuidv4()}.${ext}`;
    const putUrl = await this.minio.presignedPutUrl(key, 60 * 10);
    return { key, putUrl };
  }
}
