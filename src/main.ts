import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //cors활성화
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
