import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import { config } from 'dotenv';

config();

@Injectable()
export class MinioService implements OnModuleInit {
  private client: Client;
  private readonly logger = new Logger(MinioService.name);
  private bucket = process.env.MINIO_BUCKET || 'images';

  async onModuleInit() {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: Number(process.env.MINIO_PORT) || 9000,
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });

    try {
      const exists = await this.client.bucketExists(this.bucket);

      if (!exists) {
        await this.client.makeBucket(this.bucket, 'us-east-1');
        this.logger.log(`Bucket ${this.bucket} created`);
      }
    } catch (err) {
      this.logger.error('Error checking/creating bucket', err);
    }
  }

  async uploadBuffer(objectName: string, buffer: Buffer, contentType: string) {
    const size = buffer.length;

    const metaData = {
      'Content-Type': contentType,
    };

    await this.client.putObject(
      this.bucket,
      objectName,
      buffer,
      size,
      metaData,
    );

    return { success: true };
  }

  async presignedPutUrl(objectName: string, expires = 60 * 15) {
    return await this.client.presignedPutObject(
      this.bucket,
      objectName,
      expires,
    );
  }

  publicUrl(objectName: string) {
    const endpoint =
      process.env.MINIO_EXTERNAL_URL ||
      `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`;

    return `http://${endpoint}/${this.bucket}/${objectName}`;
  }
}
