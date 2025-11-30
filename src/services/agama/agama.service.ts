import { Injectable } from '@nestjs/common';
import { AgamaEntity } from './agama.entity';
import { MultiConnectionService } from '../../database/multi_connection.service';
import { GqlError } from '../../common/helpers/gql-error.helper';
import { PgErrorHandler } from '../../common/helpers/pg-error.helper';
import * as ExcelJS from 'exceljs';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
// import { AgamaType } from './dto/agama_type';
import { AgamaFieldsInput } from './dto/agama_fields_type';

@Injectable()
export class AgamaService {
  constructor(private multi: MultiConnectionService) {}

  async semua(clinic: string): Promise<AgamaEntity[]> {
    const db = await this.multi.getConnection(clinic);
    return db.query(
      `SELECT * FROM agama WHERE deleted_at IS NULL order by id asc `,
    );
  }

  async buat(clinic: string, nama_agama: string) {
    try {
      const db = await this.multi.getConnection(clinic);
      const repo = db.getRepository(AgamaEntity);

      const agama = repo.create({ nama_agama });
      return await repo.save(agama);
    } catch (err: unknown) {
      // fallback error lain
      throw PgErrorHandler.handle(err);
    }
  }

  async ubah(clinic: string, id: number, nama_agama: string) {
    try {
      const db = await this.multi.getConnection(clinic);
      const repo = db.getRepository(AgamaEntity);
      const agama = await repo.findOneBy({ id });
      if (agama) {
        agama.nama_agama = nama_agama;
        await repo
          .save(agama)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            throw PgErrorHandler.handle(err);
          });
      } else {
        throw new Error(`Agama dengan id ${id} tidak ditemukan`);
      }
      return repo.findOneBy({ id });
    } catch (err: unknown) {
      console.log(err);
      throw PgErrorHandler.handle(err);
    }
  }
  async hapus(clinic: string, id: number) {
    const db = await this.multi.getConnection(clinic);
    const repo = db.getRepository(AgamaEntity);
    const agama = await repo.findOneBy({ id });
    if (!agama) {
      throw GqlError.notFound(`Agama dengan id ${id} tidak ditemukan`);
    }
    await repo.softDelete(id);
    const response = {
      message: `Agama dengan id ${id} berhasil dihapus secara soft delete`,
    };
    return response;
  }
  async export_excel(
    clinic: string,
    selectedFields: AgamaFieldsInput,
  ): Promise<string> {
    const state: { responses?: string } = {};
    let list: AgamaEntity[] = [];
    if (!state.responses) {
      list = await this.semua(clinic);
    }
    // Field yang bisa diexport
    const allowedFields = [
      'id',
      'nama_agama',
      'created_at',
      'updated_at',
      'deleted_at',
    ] as const;

    type AgamaField = (typeof allowedFields)[number];

    // Convert input {id: true, nama_agama: false, ...} → ["id"]
    const finalFields = Object.entries(selectedFields)
      .filter(([, value]) => value === true)
      .map(([key]) => key as AgamaField)
      .filter((key) => allowedFields.includes(key));

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Master Agama');
    if (finalFields.length === 0) {
      throw GqlError.custom(
        `Internal Server Error`,
        500,
        'Tidak ada field yang dipilih untuk diexport',
      );
    }
    // Header Excel
    console.log(finalFields.length);
    sheet.addRow(finalFields);

    // Isi data
    list.forEach((row) => {
      const values = finalFields.map((field) => row[field]);
      sheet.addRow(values);
    });

    // Folder storage
    const folder = join(process.cwd(), 'storage');
    if (!existsSync(folder)) mkdirSync(folder);

    const filename = `master_agama_${Date.now()}.xlsx`;
    const filepath = join(folder, filename);

    await workbook.xlsx.writeFile(filepath);

    return `${process.env.BASE_URL}/storage/${filename}`;
  }
}
