import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AgamaFilterInput {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  nama_agama?: string;

  @Field(() => String, { nullable: true })
  created_from?: string;

  @Field(() => String, { nullable: true })
  created_to?: string;
}
