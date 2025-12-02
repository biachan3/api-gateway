import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AgamaService } from './agama.service';
import { AgamaResponse, AgamaType } from './dto/agama_type';
import { ResponseOnly } from './dto/response.type';
// import { AgamaListResponse } from './dto/agama_response_type';

@Resolver(() => AgamaType)
export class AgamaMutationResolver {
  constructor(private readonly service: AgamaService) {}

  @Mutation(() => ResponseOnly, {
    description: '[AGAMA] Membuat data agama baru',
  })
  async master_agama_buat(
    @Args('clinic') clinic: string,
    @Args('nama') nama: string,
  ) {
    await this.service.buat(clinic, nama);
    return {
      status: 200,
      message: 'Berhasil membuat data agama',
    };
  }

  @Mutation(() => AgamaResponse, {
    description: '[AGAMA] Mengubah data agama',
  })
  async master_agama_ubah(
    @Args('clinic') clinic: string,
    @Args('id') id: number,
    @Args('nama_agama') nama_agama: string,
  ) {
    const res = await this.service.ubah(clinic, id, nama_agama);
    console.log(res);
    if (res) {
      return {
        status: 200,
        message: 'OK',
        data: [res],
      };
    } else {
      throw new Error(`Agama dengan id ${id} tidak ditemukan`);
    }
  }

  @Mutation(() => ResponseOnly, {
    description: '[AGAMA] Soft delete data agama',
  })
  async master_agama_hapus(
    @Args('clinic') clinic: string,
    @Args('id') id: number,
  ) {
    await this.service.hapus(clinic, id);
    return {
      status: 200,
      message: `Berhasil menghapus data agama dengan id ${id}`,
    };
  }
}
