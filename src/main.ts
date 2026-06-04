import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { Request, Response } from "express";
import { collectDefaultMetrics, Registry } from "prom-client";
import { AppModule } from "./app.module";
import { PrismaService } from "./infrastructure/database/prisma/prisma.service";
import { AuditClient } from "./infrastructure/external-service/audit/audit.client";
import { AuditInterceptor } from "./infrastructure/external-service/audit/audit.interceptor";
import { BusinessErrorFilter } from "./infrastructure/external-service/audit/business-error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  const metricsRegistry = new Registry();
  collectDefaultMetrics({ register: metricsRegistry, prefix: "user_role_service_" });
  const httpServer = app.getHttpAdapter().getInstance();
  httpServer.get("/api/metrics", async (_req: Request, res: Response) => {
    res.setHeader("Content-Type", metricsRegistry.contentType);
    res.send(await metricsRegistry.metrics());
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new BusinessErrorFilter());
  app.useGlobalInterceptors(new AuditInterceptor(new AuditClient()));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("User Role Service API")
    .setDescription("API documentation for manual e2e route testing")
    .setVersion("1.0")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, swaggerDocument);

  const port = Number(process.env.PORT) || 3000;
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);
  await app.listen(port);

  console.log(`API running on http://localhost:${port}/api`);
  console.log(`Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
