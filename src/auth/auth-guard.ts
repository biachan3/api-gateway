import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthenticationError } from 'apollo-server-errors';
// import { CustomAuthError } from './errors/custom-auth.error';
// import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

interface GqlContext {
  token?: string;
  user?: any;
}
interface UserJwtPayloadType {
  userId: number;
  clinic: string;
  username: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {} // <-- DI AMAN

  canActivate(context: ExecutionContext): boolean {
    const gql = GqlExecutionContext.create(context);
    const ctx = gql.getContext<GqlContext>(); // <-- TYPE AMAN
    // console.log(`ini ctx`);
    // console.error('🚀 ~ AuthGuard ~ canActivate ~ ctx:', ctx);
    const token = ctx.token;
    console.log(token);
    if (!token) {
      throw new GraphQLError('Invalid token', {
        extensions: {
          code: 'UNAUTHORIZED',
          statusCode: 401,
        },
      });
    }

    let decoded: unknown;

    try {
      // ✔ lint aman karena verify dipanggil dalam try/catch
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      decoded = this.jwt.verify(token);
    } catch {
      throw new GraphQLError('Invalid token', {
        extensions: {
          code: 'UNAUTHORIZED',
          statusCode: 401,
        },
      });
    }

    // SAFE TYPE CHECK
    if (!decoded || typeof decoded !== 'object') {
      throw new GraphQLError('Invalid token Payload', {
        extensions: {
          code: 'UNAUTHORIZED',
          statusCode: 401,
        },
      });
    }

    ctx.user = decoded as UserJwtPayloadType;

    return true;
  }
}
