import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ResponseOnly {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;
}
