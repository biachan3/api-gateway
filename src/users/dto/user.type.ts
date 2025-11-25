import { Field, ObjectType, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  full_name: string;

  @Field(() => GraphQLISODateTime, { name: 'created_at' })
  created_at: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated_at: Date;
}
