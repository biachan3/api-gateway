import { GraphQLError } from 'graphql';

export class GqlError {
  static notFound(message: string) {
    return new GraphQLError(message, {
      extensions: {
        meta_data: {
          code: 'NOT_FOUND',
          statusCode: 404,
          message,
        },
      },
    });
  }

  static badRequest(message: string, error?: unknown) {
    return new GraphQLError(message, {
      extensions: {
        meta_data: {
          code: 'BAD_REQUEST',
          statusCode: 400,
          message,
          error,
        },
      },
    });
  }

  static forbidden(message = 'Forbidden') {
    return new GraphQLError(message, {
      extensions: {
        meta_data: {
          code: 'FORBIDDEN',
          statusCode: 403,
          message,
        },
      },
    });
  }

  static internal(message = 'Internal server error') {
    return new GraphQLError(message, {
      extensions: {
        meta_data: {
          code: 'INTERNAL_SERVER_ERROR',
          statusCode: 500,
          message,
        },
      },
    });
  }

  static custom(
    code: string,
    statusCode: number,
    message: string,
    extra?: any,
  ) {
    return new GraphQLError(message, {
      extensions: {
        meta_data: {
          code,
          statusCode,
          message,
          ...extra,
        },
      },
    });
  }
}
