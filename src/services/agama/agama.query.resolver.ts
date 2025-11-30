import { Resolver, Query, Args } from '@nestjs/graphql';
import { AgamaService } from './agama.service';
import { AgamaType } from './dto/agama_type';
import * as graphql from 'graphql';
import { AgamaFieldsInput } from './dto/agama_fields_type';
function isFieldNode(node: graphql.SelectionNode): node is graphql.FieldNode {
  return node.kind === graphql.Kind.FIELD;
}

export function getSelectedFields(info: graphql.GraphQLResolveInfo): string[] {
  const fieldNode = info.fieldNodes[0];
  if (!fieldNode.selectionSet) return [];
  const selections = fieldNode.selectionSet.selections;
  const fieldSelections = selections.filter((node): node is graphql.FieldNode =>
    isFieldNode(node),
  );
  return fieldSelections.map((f) => f.name.value);
}

@Resolver(() => AgamaType)
export class AgamaQueryResolver {
  constructor(private readonly service: AgamaService) {}
  @Query(() => [AgamaType], {
    description: 'Menampilkan daftar agama',
  })
  master_agama_daftar(@Args('clinic') clinic: string) {
    return this.service.semua(clinic);
  }

  @Query(() => String, {
    description:
      'Export data master agama ke file Excel dan mengembalikan URL download',
  })
  async master_agama_export(
    @Args('clinic') clinic: string,
    @Args('fields', { type: () => AgamaFieldsInput }) fields: AgamaFieldsInput,
  ) {
    return this.service.export_excel(clinic, fields);
  }
}
