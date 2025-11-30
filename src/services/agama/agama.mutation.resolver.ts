import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AgamaService } from './agama.service';
import { AgamaType } from './dto/agama_type';

@Resolver(() => AgamaType)
export class AgamaMutationResolver {
  constructor(private readonly service: AgamaService) {}

  @Mutation(() => Boolean, {
    description: '[AGAMA] Membuat data agama baru',
  })
  async master_agama_buat(
    @Args('clinic') clinic: string,
    @Args('nama') nama: string,
  ) {
    await this.service.buat(clinic, nama);
    return true;
  }

  @Mutation(() => AgamaType, {
    description: '[AGAMA] Mengubah data agama',
  })
  async master_agama_ubah(
    @Args('clinic') clinic: string,
    @Args('id') id: number,
    @Args('nama_agama') nama_agama: string,
  ) {
    const res = await this.service.ubah(clinic, id, nama_agama);
    return res;
  }

  @Mutation(() => String, {
    description: '[AGAMA] Soft delete data agama',
  })
  async master_agama_hapus(
    @Args('clinic') clinic: string,
    @Args('id') id: number,
  ) {
    return await this.service.hapus(clinic, id);
  }
}
