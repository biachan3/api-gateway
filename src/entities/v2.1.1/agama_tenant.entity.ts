import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('master_agama')
export class AgamaTenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nama: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
