import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AgamaFieldsInput {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  id?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  nama_agama?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  created_at?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  updated_at?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  deleted_at?: boolean;
}
