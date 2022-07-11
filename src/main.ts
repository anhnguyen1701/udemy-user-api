// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(AuthMiddleware(config.JWT_SECRET));
  // const token = AuthMiddleware(config.JWT_SECRET);

  // console.log(token)

  const options = new DocumentBuilder()
    .setTitle('udemy-user-api')
    .setDescription('User Api Service')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
