import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // swagger documentation configs
  const config = new DocumentBuilder()
    .setTitle('FORUM FREAK API')
    .setDescription('Forum Freak api documentation')
    .addBearerAuth()
    .build();
  app.getHttpAdapter().getInstance().set('etag', false);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
}
bootstrap();
