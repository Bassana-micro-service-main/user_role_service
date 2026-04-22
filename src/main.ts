import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { BusinessErrorFilter } from './infrastructure/external-service/audit/business-error.filter';
import { AuditInterceptor } from './infrastructure/external-service/audit/audit.interceptor';
import { AuditClient } from './infrastructure/external-service/audit/audit.client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validation automatique des DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new BusinessErrorFilter());
  app.useGlobalInterceptors(new AuditInterceptor(new AuditClient()));

  // ✅ Préfixe global API
  app.setGlobalPrefix('api');

  // ✅ Port depuis l'env
  const port = Number(process.env.PORT) || 3000;
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  await app.listen(port);

  console.log(`🚀 API running on http://localhost:${port}/api`);
}

bootstrap();
