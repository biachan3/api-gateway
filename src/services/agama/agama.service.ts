import { Injectable } from '@nestjs/common';
// import { AgamaEntity } from '../../entities/v2.1.1/agama.entity';
import { MultiConnectionService } from '../../database/multi_connection.service';
import { GqlError } from '../../common/helpers/gql-error.helper';
import { PgErrorHandler } from '../../common/helpers/pg-error.helper';
import * as ExcelJS from 'exceljs';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
// import { AgamaType } from './dto/agama_type';
import { AgamaFieldsInput } from './dto/agama_fields_type';
import { ExcelHelper } from '../../common/helpers/excel.helper';
import { AgamaFilterInput } from './dto/agama_filter_type';
import { AgamaType } from './dto/agama_type';
// import { DataSource } from 'typeorm';
@Injectable()
export class AgamaService {
  constructor(private multi: MultiConnectionService) {}

  private async repo(clinic: string) {
    try {
      const db = await this.multi.getConnection(clinic);
      console.log(db);
      // Pastikan entity metadata ada (entity terdaftar)
      const meta = db.entityMetadatas.find((m) => m.tableName === 'agama');
      if (!meta) {
        throw new Error(
          `Entity "agama" tidak ditemukan pada versi database ${clinic}`,
        );
      }

      return db.getRepository('agama');
    } catch (e: any) {
      // Error jika tabel tidak ada
      throw PgErrorHandler.handle(e);
    }
  }

  async semua(
    clinic: string,
    page?: number,
    limit?: number,
    filter?: AgamaFilterInput,
  ): Promise<AgamaType[]> {
    const db = await this.repo(clinic);
    const state: { responses?: boolean } = {};
    let where = `WHERE deleted_at IS NULL`;
    const params: any[] = [];

    if (!state.responses) {
      let index = 1;

      if (filter) {
        if (filter.id) {
          where += ` AND id = $${index++}`;
          params.push(filter.id);
        }

        if (filter.nama_agama) {
          where += ` AND nama_agama ILIKE $${index++}`;
          params.push(`%${filter.nama_agama}%`);
        }

        if (filter.created_from) {
          where += ` AND created_at >= $${index++}`;
          params.push(filter.created_from);
        }

        if (filter.created_to) {
          where += ` AND created_at <= $${index++}`;
          params.push(filter.created_to);
        }
      }
    }

    let sql = ``;
    if (!state.responses) {
      sql = `
              SELECT * FROM agama
              ${where}
              ORDER BY id ASC
            `;
      if (limit && limit > 0) {
        const offset = ((page ?? 1) - 1) * limit;
        sql += ` LIMIT ${limit} OFFSET ${offset}`;
      }
    }
    return db.query(sql, params);
  }

  async buat(clinic: string, nama_agama: string) {
    try {
      const repo = await this.repo(clinic);
      // const repo = db.getRepository(AgamaEntity);
      const agama = repo.create({ nama_agama });
      return await repo.save(agama);
    } catch (err: unknown) {
      throw PgErrorHandler.handle(err);
    }
  }

  async ubah(clinic: string, id: number, nama_agama: string) {
    try {
      const repo = await this.repo(clinic);
      // const repo = db.getRepository(AgamaEntity);
      const agama = await repo.findOneBy({ id });
      if (agama) {
        agama.nama_agama = nama_agama;
        await repo
          .save(agama)
          .then((res) => {
            console.log(res);
          })
          .catch((err: unknown) => {
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
    const repo = await this.repo(clinic);
    // const repo = db.getRepository(AgamaEntity);
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
    const state: { responses?: boolean } = {};

    try {
      let list: AgamaType[] = [];
      if (!state.responses) {
        await this.semua(clinic)
          .then((res) => {
            list = res;
          })
          .catch((err) => {
            state.responses = true;
            throw PgErrorHandler.handle(err);
          });
      }
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Master Agama');
      if (!state.responses) {
        console.log(`masuk sini`);
        // Field yang bisa diexport
        const allowedFields = [
          'id',
          'nama_agama',
          'created_at',
          'updated_at',
          'deleted_at',
        ] as const;

        type AgamaField = (typeof allowedFields)[number];

        const finalFields = Object.entries(selectedFields)
          .filter(([, value]) => value === true)
          .map(([key]) => key as AgamaField)
          .filter((key) => allowedFields.includes(key));

        if (finalFields.length === 0) {
          state.responses = true;
          throw GqlError.forbidden();
        }
        sheet.addRow(finalFields);
        list.forEach((row) => {
          const values = finalFields.map((field) => row[field]);
          sheet.addRow(values);
        });

        ExcelHelper.autoFitColumns(sheet);
      }
      let filename = ``;
      if (!state.responses) {
        try {
          const folder = join(process.cwd(), 'storage');
          if (!existsSync(folder)) {
            mkdirSync(folder);
          }

          filename = `master_agama_${Date.now()}.xlsx`;
          const filepath = join(folder, filename);

          await workbook.xlsx.writeFile(filepath);
        } catch (err) {
          state.responses = true;
          throw GqlError.badRequest(`Gagal membuat file`, err);
        }
      }

      return `${process.env.BASE_URL}/storage/${filename}`;
    } catch (err: unknown) {
      state.responses = true;
      if (err instanceof Error) {
        throw GqlError.badRequest(err.message);
      }

      throw GqlError.badRequest('Proses generate excel gagal');
    }
  }
}
