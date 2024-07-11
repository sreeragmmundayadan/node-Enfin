import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { AllExceptionsFilter } from '@shared/exception-filters/all-exception.filter';
import { LoggingInterceptor } from '@shared/interceptors/logging-interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: { useDefaults: true },
      crossOriginResourcePolicy: false,
      frameguard: { action: 'deny' },
      ieNoOpen: true,
      noSniff: true,
      xPoweredBy: false,
      xssFilter: true,
    }),
  );
  app.use(compression({ level: 9 }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: { target: false },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(app.get(WINSTON_MODULE_PROVIDER)),
  );

  await app.listen(3000);
}
bootstrap();
