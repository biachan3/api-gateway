import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth-guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MY_SECRET_KEY',
    }),
  ],
  providers: [AuthResolver, AuthService, AuthGuard], // 👈 HANYA PROVIDERS
  exports: [AuthGuard, JwtModule], // JwtModule di-export, BUKAN provider
})
export class AuthModule {}
