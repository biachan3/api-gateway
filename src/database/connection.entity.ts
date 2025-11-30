import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('connections')
export class ConnectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  host: string;

  @Column()
  port: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  database_name: string;

  @Column()
  version: string;
}
