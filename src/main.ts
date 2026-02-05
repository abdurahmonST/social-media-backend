import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
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
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);

  console.log(`Server Link: http://localhost:${PORT}/api`);
}

bootstrap();
