// common/interceptor/graphql-response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class GraphqlResponseInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        status: 200,
        message: 'OK',
        data: Array.isArray(data) ? data : [data ?? null],
      })),
    );
  }
}
