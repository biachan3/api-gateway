import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConnectionEntity } from './connection.entity';
import { GqlError } from '../common/helpers/gql-error.helper';

const connections: Record<string, DataSource> = {};

// const entitiesByVersion = {
//   2: [__dirname + '/entities/v2/*.entity{.ts,.js}'],
//   3: [__dirname + '/entities/v3/*.entity{.ts,.js}'],
// };

const entitiesByVersion: Record<string, string[]> = {
  '2.1.1': [__dirname + '../../entities/v2.1.1/*.entity{.ts,.js}'],
  '2.2.0': [__dirname + '../../entities/v2.2.0/*.entity{.ts,.js}'],
  '3.0.0': [__dirname + '../../entities/v3.0.0/*.entity{.ts,.js}'],
};

@Injectable()
export class MultiConnectionService {
  constructor(
    @InjectRepository(ConnectionEntity)
    private connRepo: Repository<ConnectionEntity>,
  ) {}

  async getConnection(name: string): Promise<DataSource> {
    if (connections[name]?.isInitialized) {
      return connections[name];
    }

    const conf = await this.connRepo.findOne({ where: { name } });

    if (!conf) {
      throw GqlError.notFound(`Clinic ${name} tidak ditemukan`);
    }
    const entities = entitiesByVersion[conf.version];
    const db = new DataSource({
      type: 'postgres',
      host: conf.host,
      port: conf.port,
      username: conf.username,
      password: conf.password,
      database: conf.database_name,
      entities,
      synchronize: false,
    });

    await db.initialize();
    connections[name] = db;

    return db;
  }
}
