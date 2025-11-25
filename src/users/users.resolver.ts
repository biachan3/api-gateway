/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/user.type';
import { lastValueFrom } from 'rxjs';
import type { ClinicUserType } from './interfaces/clinic-user.interface';

function toSafeDate(value: any): Date | null {
  if (!value || value === 'null' || value === 'undefined') return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users(@Args('clinic') clinic: string, @Args('token') token: string) {
    const users: ClinicUserType[] = await lastValueFrom(
      this.usersService.getUsers(clinic, token),
    );

    return users.map((u) => ({
      ...u,
      created_at: toSafeDate(u.created_at),
      updated_at: toSafeDate(u.updated_at),
    }));
  }
}
