import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
// import { GraphQLISODateTime } from '@nestjs/graphql';

import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
      debug: true,
      // resolvers: {
      //   DateTime: GraphQLISODateTime,
      // },
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
