import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgamaEntity } from './agama.entity';
import { AgamaService } from './agama.service';
// import { AgamaResolver } from './agama.resolver';
import { DatabaseModule } from '../../database/database.module';
import { AgamaMutationResolver } from './agama.mutation.resolver';
import { AgamaQueryResolver } from './agama.query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AgamaEntity]), DatabaseModule],
  providers: [AgamaService, AgamaMutationResolver, AgamaQueryResolver],
})
export class AgamaModule {}
