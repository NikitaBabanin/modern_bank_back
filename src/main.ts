import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  const corsOptions = {
    origin: 'http://localhost:9000',
    credentials: true,
    optionSuccessStatus: 200,
  };

  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // deserialize
  await app.listen(9229);
}
bootstrap().then((r) => r);
