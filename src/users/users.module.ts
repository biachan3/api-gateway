import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // ⬅ WAJIB BANGET
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
