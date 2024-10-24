import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ResponseSerializeInterceptor } from './shared/interceptors/response-serialize.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization', 'Cookie'], // * 사용할 헤더 추가.
  });
  app.useGlobalInterceptors(
    new ResponseSerializeInterceptor(app.get(Reflector)),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4000);
}
bootstrap();
