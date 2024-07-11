import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from '@modules/book/book.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { logConfig } from '@shared/config/config';
import { DatabaseModule } from './database/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    ConfigModule.forRoot({}),
    BookModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: logConfig.logFileLocation,
          level: 'error',
          maxsize: logConfig.maxSize,
          maxFiles: logConfig.maxLogFiles,
          format: winston.format.combine(
            winston.format.timestamp({ format: logConfig.timeFormat }),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: logConfig.combinedLogFileLocation,
          maxsize: logConfig.maxSize,
          maxFiles: logConfig.maxLogFiles,
          format: winston.format.combine(
            winston.format.timestamp({ format: logConfig.timeFormat }),
            winston.format.json(),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
