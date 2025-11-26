export class CustomAuthError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 401,
    public readonly error: string = 'UNAUTHORIZED',
  ) {
    super(message);
  }
}
