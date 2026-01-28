import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*'
  })

  // Global validation (DTO lar uchun juda muhim)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Port
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Server Link: http://localhost:${PORT}/api`);
}

bootstrap();
