import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🚀 Middleware untuk memperbaiki Apollo Sandbox “empty query error”
  app.use('/graphql', (req: Request, _res: Response, next: NextFunction) => {
    const rawBody: unknown = req.body;
    let body: Record<string, unknown> = {};

    if (rawBody && typeof rawBody === 'object') {
      body = rawBody as Record<string, unknown>;
    }
    const rawQuery = body.query;

    const isMissingQuery =
      typeof rawQuery !== 'string' || rawQuery.trim().length === 0;

    if (isMissingQuery) {
      req.body = { query: '{ __typename }' };
    }

    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
