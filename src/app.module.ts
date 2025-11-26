import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver } from '@nestjs/apollo';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';

// import { GraphQLISODateTime } from '@nestjs/graphql';

import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { GraphQLFormattedError } from 'graphql';
import { Request } from 'express';
// import { CustomAuthError } from './auth/errors/custom-auth.error';

interface GraphQLRequestBody {
  variables?: Record<string, unknown>;
  query?: string;
  operationName?: string | null;
}

// interface RpcErrorPayload {
//   statusCode?: number;
//   message?: string;
//   error?: string;
//   [key: string]: unknown;
// }
// interface NestGraphQLError extends GraphQLFormattedError {
//   originalError?: unknown;
// }

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
      // playground: false,
      // csrfPrevention: false,
      introspection: true,
      graphiql: {
        subscriptionsProtocol: 'GRAPHQL_SSE',
      },
      debug: false,
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
      // formatError: (error: GraphQLFormattedError) => {
      //   // 🚀 Introspection request → biarkan default Apollo
      //   if (!error.path && !error.locations) {
      //     return error;
      //   }

      //   // 🚀 Query kosong
      //   if (error.message.includes('non-empty `query`')) {
      //     return {
      //       statusCode: 400,
      //       message: 'Query cannot be empty.',
      //       error: 'BAD_REQUEST',
      //     };
      //   }

      //   // 🚀 Custom errors
      //   const ext: unknown = error.extensions;
      //   let statusCode: number = 500;

      //   if (
      //     ext &&
      //     typeof ext === 'object' &&
      //     'statusCode' in ext &&
      //     typeof ext.statusCode === 'number'
      //   ) {
      //     statusCode = ext.statusCode;
      //   }

      //   return {
      //     statusCode,
      //     message: error.message,
      //     error: error.extensions?.code ?? 'INTERNAL_SERVER_ERROR',
      //   };
      // },
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
