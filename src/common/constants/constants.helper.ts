// ===============================
// STATUS EXPORT
// ===============================
export const STATUS_EXPORT = {
  BELUM_PROSES: 0,
  PROSES: 1,
  SELESAI: 2,
  ERROR: 3,
};

// ===============================
// WORDING RESPONSE
// ===============================
export const WORDING_RESPONSE = {
  BERHASIL: 'Berhasil',
  TERBUAT: 'Berhasil Membuat data',
  BERHASIL_MENGHAPUS: 'Berhasil Menghapus data',
  BERHASIL_UPDATE: 'Berhasil Mengubah data',
  SYSTEM_ERROR: 'Internal Server Error!',

  DATA_TIDAK_DITEMUKAN: (data: string) => `Data ${data} Tidak ditemukan`,
  DATA_SUDAH_DIGUNAKAN: (data: string) => `Data ${data} sudah digunakan`,
};

// ===============================
// CODE RESPONSE
// ===============================
export const CODE_RESPONSE = {
  BERHASIL: 200,
  TERBUAT: 201,
  SYSTEM_ERROR: 500,
  DUPLIKAT: 204,
  DATA_TIDAK_DITEMUKAN: 202,
  ERROR_VALIDASI: 400,
  GAGAL_VALIDASI: 203,
  LIST_TIDAK_DITEMUKAN: 404,
  BAD_REQUEST: 400,
  IMPORT_DATA_VALIDASI: 412,
  FORBIDDEN: 403,
  REQUIRED_ACTION: 214,
};

// ===============================
// CONSTANT IDS
// ===============================
export const CONSTANT_IDS = {
  REGISTRASI_ANTRIAN: {
    JENIS_LAYANAN_ID: 21,
    TYPEOFCARE_CODE: 'RJALAN',
    JENISREGISTRASI: 'ONRJ',
    KELASKUNJUNGAN_ID: 6,
    INITIAL: 'MCU',
    IS_PERJANJIAN: true,
    ISEXTERNALRM: false,
  },
};

// ===============================
// CONSTANT MCU MS LAYANAN JENIS
// ===============================
export const CONSTANT_MCU_MS_LAYANAN_JENIS_LAYANAN = {
  LAINNYA: 'lainnya',
  LABORATORIUM: 'laboratorium',
  ASSESSMENT: 'asesmen',
  RADIOLOGI: 'radiologi',
  DIAGNOSTIK_MEDIS: 'diagnostik_medis',
};

// ===============================
// STATUS DELETE
// ===============================
export const STATUS_DELETE = {
  SUDAH_DIHAPUS: 1,
  BELUM_DIHAPUS: 2,
};

// ===============================
// TYPE GUDANG
// ===============================
export const TYPE_GUDANG = {
  UTAMA: 0,
  FARMASI: 1,
  LOGISTIK: 2,
  FIXED_ASSET: 3,
  NON_CC: 4,
};

// ===============================
// STATUS PROGRES HEADER
// ===============================
export const STATUS_PROGRES_HEADER = {
  DRAFT: 1,
  PENGAJUAN: 2,
  PROSES: 3,
  SELESAI: 4,
};

// ===============================
// STATUS PROGRES DETAIL
// ===============================
export const STATUS_PROGRES_DETAIL = {
  DRAFT: 1,
  PENGAJUAN: 2,
  PROSES_INTERNAL: 3,
  PROSES_EXTERNAL: 4,
  SELESAI: 5,
  RUSAK: 99,
};

// ===============================
// STATUS PENJADWALAN MAINTENANCE
// ===============================
export const STATUS_PENJADWALAN_MAINTENANCE = {
  DRAFT: 1,
  PENGAJUAN: 2,
  PROSES: 3,
  SELESAI: 4,
  TOLAK: 5,
};

// ===============================
// TIPE TASK
// ===============================
export const TIPE_TASK = {
  REPAIR: 1,
  MAINTENANCE: 2,
  KALIBRASI: 3,
};

// ===============================
// TIPE PENGERJAAN
// ===============================
export const TIPE_PENGERJAAN = {
  INTERNAL: 1,
  EXTERNAL: 2,
};

// ===============================
// STATUS APPROVAL
// ===============================
export const STATUS_APPROVAL = {
  DRAFT: 1,
  PENGAJUAN: 2,
  TERIMA: 3,
  TOLAK: 99,
};

// ===============================
// STATUS TRANSFER
// ===============================
export const STATUS_TRANSFER = {
  DRAFT: 1,
  PROSES: 2,
  TERIMA: 3,
  VERIFIKASI: 4,
  RETUR: 99,
};

// ===============================
// JENIS PERIODE
// ===============================
export const JENIS_PERIODE = {
  MINGGUAN: 1,
  BULANAN: 2,
};

// ===============================
// STATUS PROGRES JADWAL
// ===============================
export const STATUS_PROGRES_JADWAL = {
  BELUM: 1,
  SELESAI: 2,
  TERLAMBAT: 3,
};

// ===============================
// JADWAL GENERATE
// ===============================
export const JADWAL_GENERATE = {
  LIMIT_CHUNK: 100,
};

// ===============================
// STATUS DISPOSE
// ===============================
export const STATUS_DISPOSE = {
  RUSAK: 1,
  TERJUAL: 2,
  HILANG: 3,
};

// ===============================
// STATUS PROGRES DISPOSE
// ===============================
export const STATUS_PROGRES_DISPOSE = {
  DRAFT: 1,
  KUNCI: 2,
  DITERIMA: 3,
  SELESAI: 4,
  TOLAK: 99,
};

// ===============================
// STATUS PROGRES KALIBRASI
// ===============================
export const STATUS_PROGRES_KALIBRASI = {
  DRAFT: 1,
  PROSES: 2,
  SELESAI: 3,
  CANCEL: 99,
};

// ===============================
// STATUS TRANSAKSI PO JASA
// ===============================
export const STATUS_TRANSAKSI_PO_JASA = {
  DRAFT: 0,
  PENGAJUAN_PERSETUJUAN_PO: 1,
  PENGAJUAN_PEMBELIAN: 2,
  PENGADAAN: 3,
  SELESAI: 4,
  DITOLAK: 99,
  CANCEL: 99,
  REVISI: 101,
};

// ===============================
// PAJAK
// ===============================
export const PAJAK = {
  PPH: 2,
};

// ===============================
// INISIAL MENU
// ===============================
export const INISIAL_MENU = {
  PO_JASA: {
    KODE: 'WMS_FA_PO_JASA',
    NAMA: 'Purchase Order',
  },
  PEMBELIAN_JASA: {
    KODE: 'WMS_FA_PEMBELIAN_JASA',
    NAMA: 'Pembelian Jasa',
  },
  PEMBAYARAN_JASA: {
    KODE: 'WMS_FA_TRS_PMBY_JASA',
    NAMA: 'Pembayaran Jasa',
  },
};

// ===============================
// STATUS PEMBELIAN
// ===============================
export const STATUS_PEMBELIAN = {
  PEMBELIAN_JASA: {
    DRAFT: 0,
    KUNCI: 1,
    SELESAI: 2,
  },
  JENIS_TABLE: {
    JASA: 'JASA',
    BARANG: 'BARANG',
  },
};

// ===============================
// KATEGORI FILE KALIBRASI
// ===============================
export const KATEGORI_FILE_KALIBRASI = {
  SPK: 'SPK',
  SPH: 'SPH',
  PO: 'PO',
  SURAT_TUGAS: 'SURAT_TUGAS',
  SERTIFIKAT_KALIBRASI: 'SERTIFIKAT_KALIBRASI',
};
