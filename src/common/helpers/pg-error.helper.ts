import { GqlError } from './gql-error.helper';

interface PgError {
  code?: string;
  message: string;
  detail?: string;
  constraint?: string;
}

export class PgErrorHandler {
  static handle(err: unknown) {
    const error = err as PgError;

    switch (error.code) {
      // Unique constraint
      case '23505':
        return GqlError.badRequest('Data sudah digunakan');

      // Foreign key
      case '23503':
        return GqlError.badRequest('Data terhubung dan tidak dapat dihapus');

      // Not null
      case '23502':
        return GqlError.badRequest('Field wajib diisi');

      // Check
      case '23514':
        return GqlError.badRequest('Data tidak sesuai aturan');

      // Invalid format
      case '22P02':
        return GqlError.badRequest('Format data tidak valid');

      // Syntax
      case '42601':
        return GqlError.internal('Syntax SQL tidak valid');

      // Undefined column
      case '42703':
        return GqlError.internal('Kolom tidak ditemukan');

      // Undefined table
      case '42P01':
        return GqlError.internal('Tabel tidak ditemukan');

      // Permission denied
      case '42501':
        return GqlError.forbidden('Tidak memiliki izin');

      // Deadlock
      case '40P01':
        return GqlError.internal('Deadlock terdeteksi');

      // Disk full
      case '53100':
        return GqlError.internal('Ruang penyimpanan penuh');

      // Default
      default:
        return GqlError.internal(error.message);
    }
  }
}
