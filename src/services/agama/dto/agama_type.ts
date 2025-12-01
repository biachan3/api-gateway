import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AgamaType {
  @Field(() => Int)
  id: number;

  @Field({ description: 'Nama Agama' })
  nama_agama: string;

  @Field({ description: 'Kapan data Agama ini masuk ke database' })
  created_at: Date;

  @Field({
    description: 'Kapan data Agama ini terakhir kali diupdate',
    nullable: true,
  })
  updated_at: Date;

  @Field({
    description: 'Kapan data Agama ini dihapus',
    nullable: true,
  })
  deleted_at: Date;
}

@ObjectType()
export class AgamaResponse {
  @Field(() => Int)
  code: number;

  @Field()
  message: string;

  @Field(() => [AgamaType])
  data: AgamaType[];
}
