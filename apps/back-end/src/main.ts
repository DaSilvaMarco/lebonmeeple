import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
// import { CatchEverythingFilter } from './errors/error';
// import { CustomHttpExceptionFilter } from './errors/custom-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LeBonMeeple')
    .setDescription('API documentation for LeBonMeeple')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  app.enableCors({
    exposedHeaders: ['Content-Type'],
    origin: true, // Allow all origins during development
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  // app.useGlobalFilters(new CustomHttpExceptionFilter());
  // app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
