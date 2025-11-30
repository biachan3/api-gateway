// import { CODE_RESPONSE, WORDING_RESPONSE } from './constants/constants.helper';

// export class GqlResponse {
//   // ===============================
//   // 🔵 SUCCESS RESPONSE
//   // ===============================

//   // Optional converter camelCase → snake_case
//   static snakeCase(data: any): any {
//     if (data === null || data === undefined) return data;

//     if (typeof data === 'object') {
//       if (Array.isArray(data)) {
//         return data.map((item) => this.snakeCase(item));
//       }

//       return Object.keys(data).reduce((acc: any, key: string) => {
//         const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
//         acc[newKey] = this.snakeCase(data[key]);
//         return acc;
//       }, {});
//     }
//     return data;
//   }

//   // 200 — list tanpa count
//   static successArrayNoCount(list: any[], extra?: any) {
//     return {
//       data: {
//         list,
//         ...extra,
//       },
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL,
//       },
//     };
//   }

//   // 200 — list dengan pagination
//   static successList(
//     list: any[],
//     pages: number,
//     count: number,
//     limit: number,
//     extra?: any,
//   ) {
//     return {
//       data: {
//         list,
//         ...extra,
//         meta_data: {
//           count: Number(count) || 0,
//           pages: Number(pages) || 0,
//           limit: Number(limit) || 0,
//         },
//       },
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL,
//       },
//     };
//   }

//   // 200 — single resource
//   static successResource(data: any) {
//     return {
//       data,
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL,
//       },
//     };
//   }

//   // 200 — custom message
//   static successCustom(message: string, data?: any) {
//     return {
//       data: data ?? null,
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message,
//       },
//     };
//   }

//   // 200 — array
//   static successArray(data: any[]) {
//     return {
//       data,
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL,
//       },
//     };
//   }

//   // 200 — object + extra
//   static successObject(data: any, extra?: any) {
//     return {
//       data,
//       ...extra,
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL,
//       },
//     };
//   }

//   // 200 — update
//   static successUpdate(data: any, extra?: any) {
//     return {
//       data,
//       ...extra,
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL_UPDATE,
//       },
//     };
//   }

//   // 200 — delete
//   static successDelete(data: any) {
//     return {
//       data,
//       meta_data: {
//         status: CODE_RESPONSE.BERHASIL,
//         message: WORDING_RESPONSE.BERHASIL_MENGHAPUS,
//       },
//     };
//   }

//   // 201 — created
//   static successCreate(data: any) {
//     return {
//       data,
//       meta_data: {
//         status: CODE_RESPONSE.TERBUAT,
//         message: WORDING_RESPONSE.TERBUAT,
//       },
//     };
//   }

//   // ===============================
//   // 🔴 ERROR RESPONSE
//   // ===============================

//   static errorServer(error: any) {
//     return {
//       data: error,
//       meta_data: {
//         status: CODE_RESPONSE.SYSTEM_ERROR,
//         message: WORDING_RESPONSE.SYSTEM_ERROR,
//       },
//     };
//   }

//   static error404(message: string) {
//     return {
//       data: null,
//       meta_data: {
//         status: CODE_RESPONSE.LIST_TIDAK_DITEMUKAN,
//         message,
//       },
//     };
//   }

//   static error403(message: string) {
//     return {
//       data: null,
//       meta_data: {
//         status: CODE_RESPONSE.FORBIDDEN,
//         message,
//       },
//     };
//   }

//   static error400(message: string, error?: any) {
//     return {
//       data: null,
//       meta_data: {
//         status: CODE_RESPONSE.BAD_REQUEST,
//         message,
//         error,
//       },
//     };
//   }

//   static error204(message: string, data?: any) {
//     return {
//       data: data ?? null,
//       meta_data: {
//         status: CODE_RESPONSE.DUPLIKAT,
//         message,
//       },
//     };
//   }

//   static error203(message: string, data: any) {
//     return {
//       data,
//       meta_data: {
//         status: CODE_RESPONSE.GAGAL_VALIDASI,
//         message,
//       },
//     };
//   }

//   static error202(message: string) {
//     return {
//       data: null,
//       meta_data: {
//         status: CODE_RESPONSE.DATA_TIDAK_DITEMUKAN,
//         message,
//       },
//     };
//   }

//   static error412(message: string, data?: any, label?: any) {
//     return {
//       data: {
//         validasi: data ?? null,
//         label: label ?? null,
//       },
//       meta_data: {
//         status: CODE_RESPONSE.IMPORT_DATA_VALIDASI,
//         message,
//       },
//     };
//   }

//   static requiredAction(message: string, extra?: any) {
//     return {
//       data: extra,
//       meta_data: {
//         status: CODE_RESPONSE.REQUIRED_ACTION,
//         message,
//       },
//     };
//   }
// }
