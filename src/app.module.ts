import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Request } from 'express';
import { AppResolver } from './app.resolver';
import { AgamaModule } from './services/agama/agama.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionEntity } from './database/connection.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

interface GraphQLRequestBody {
  variables?: Record<string, unknown>;
  query?: string;
  operationName?: string | null;
}

interface YogaErrorInfo {
  error: Error & {
    extensions?: {
      code?: string;
      statusCode?: number;
      originalError?: unknown;
    };
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'storage'),
      serveRoot: '/storage',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'dendy2001',
      database: process.env.DB_NAME || 'main_conn',
      synchronize: false, // ubah true jika untuk development
      autoLoadEntities: true, // ⬅ Agar entity otomatis terbaca
    }),
    AgamaModule,
    TypeOrmModule.forFeature([ConnectionEntity]),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
      maskedErrors: false,
      introspection: true,
      graphiql: {
        subscriptionsProtocol: 'GRAPHQL_SSE',
      },
      debug: true,
      context: ({ req }: { req: Request }) => {
        const rawBody: unknown = req.body;
        const body = rawBody as GraphQLRequestBody;
        const tokenFromVariables =
          typeof body.variables?.token === 'string'
            ? body.variables.token
            : undefined;

        const tokenFromInlineQuery =
          body.query?.match(/token:\s*"([^"]+)"/)?.[1];

        return {
          token: tokenFromVariables ?? tokenFromInlineQuery,
        };
      },
      // ✅ Error handling di Yoga menggunakan plugins
      plugins: [
        {
          onResponse({ response }) {
            response.headers.set('Cache-Control', 'no-cache');
            // Secara default, status HTTP adalah 200 OK jika tidak ada error GraphQL
            // Kita tidak perlu menyeleksi apapun di frontend.
            // Data akan ada di "data.master_agama_daftar" secara otomatis.
            // Jika Anda *tetap* ingin menambahkan pesan sukses kustom,
            // Anda bisa mengimplementasikan logika yang lebih kompleks di sini
            // untuk memanipulasi body JSON yang keluar, tapi itu rumit.
            // Pendekatan terbaik adalah mengandalkan standar GraphQL:
            // Jika kueri sukses, data ada di 'data'.
          },
          onError: (errorInfo: YogaErrorInfo) => {
            console.error('GraphQL Error:', errorInfo.error);

            const error = errorInfo.error;
            const originalError = error.extensions?.originalError;

            const extensions: Record<string, unknown> = {
              code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
              statusCode: error.extensions?.statusCode || 500,
            };

            if (process.env.NODE_ENV === 'development' && originalError) {
              extensions.originalError = originalError;
            }

            return {
              message: error.message,
              extensions,
            };
          },
        },
      ],
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
