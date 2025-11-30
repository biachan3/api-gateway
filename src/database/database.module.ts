import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionEntity } from './connection.entity';
import { MultiConnectionService } from './multi_connection.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionEntity])],
  providers: [MultiConnectionService],
  exports: [MultiConnectionService], // ⬅ WAJIB
})
export class DatabaseModule {}
