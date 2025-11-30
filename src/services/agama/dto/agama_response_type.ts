import { Field, ObjectType } from '@nestjs/graphql';
import { AgamaType } from './agama_type';

@ObjectType()
export class AgamaListResponse {
  @Field(() => [AgamaType])
  data: AgamaType[];

  @Field()
  status: number;

  @Field()
  message: string;
}
