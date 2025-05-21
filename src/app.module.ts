import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.modile';
import { LogsModule } from './common/logger/logs.module';
import { PrismaModule } from './database/prisma/prisma.module';
@Module({
  imports: [ConfigModule, LogsModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
