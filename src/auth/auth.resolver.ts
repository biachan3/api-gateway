import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello() {
    return 'Hello GraphQL';
  }

  @Mutation(() => String)
  login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('clinic') clinic: string,
  ) {
    return this.authService.login({ username, password, clinic });
  }
}
