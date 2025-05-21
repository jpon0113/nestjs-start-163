import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 取得設定檔
  const configServcie = app.get(ConfigService);
  const port = configServcie.get<number>('PORT', 3000);
  const cors = configServcie.get('CORS', false);
  const prefix = configServcie.get('PREFIX', '/api');
  const version = configServcie.get<string>('VERSION', '1');
  const errorFilterFlag = configServcie.get<string>('ERROR_FILTER');
  // 新增nest-winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix(prefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [version],
  });
  // 允許跨域
  if (cors === 'true') {
    app.enableCors();
  }
  // 允許錯誤攔截
  if (errorFilterFlag === 'true') {
    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  }

  await app.listen(port);
}
bootstrap();
