import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AgamaType {
  @Field(() => Int)
  id: number;

  @Field()
  nama_agama: string;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;

  @Field({ nullable: true })
  deleted_at: Date;
}
