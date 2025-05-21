import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 新增nest-winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configServcie = app.get(ConfigService);
  const port = configServcie.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
