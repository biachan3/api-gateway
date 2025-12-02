import { Resolver, Query, Args } from '@nestjs/graphql';
import { AgamaService } from './agama.service';
import { AgamaType } from './dto/agama_type';
import { AgamaFieldsInput } from './dto/agama_fields_type';
import { AgamaFilterInput } from './dto/agama_filter_type';
import { AgamaListResponse } from './dto/agama_response_type';
// import * as graphql from 'graphql';

// function isFieldNode(node: graphql.SelectionNode): node is graphql.FieldNode {
//   return node.kind === graphql.Kind.FIELD;
// }

// export function getSelectedFields(info: graphql.GraphQLResolveInfo): string[] {
//   const fieldNode = info.fieldNodes[0];
//   if (!fieldNode.selectionSet) return [];
//   const selections = fieldNode.selectionSet.selections;
//   const fieldSelections = selections.filter((node): node is graphql.FieldNode =>
//     isFieldNode(node),
//   );
//   return fieldSelections.map((f) => f.name.value);
// }

@Resolver(() => AgamaType)
export class AgamaQueryResolver {
  constructor(private readonly service: AgamaService) {}
  @Query(() => AgamaListResponse, {
    description: 'Menampilkan daftar agama',
  })
  async master_agama_daftar(
    @Args('clinic') clinic: string,
    @Args('page', { type: () => Number, nullable: true }) page?: number,
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
    @Args('filter', { type: () => AgamaFilterInput, nullable: true })
    filter?: AgamaFilterInput,
  ): Promise<AgamaListResponse> {
    const data = await this.service.semua(clinic, page, limit, filter);
    return {
      status: 200,
      message: 'OK',
      data: Array.isArray(data) ? data : [],
    };
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
