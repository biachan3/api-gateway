// import { ApolloServerPlugin } from '@apollo/server';

// export const GraphqlMetadataPlugin: ApolloServerPlugin = {
//    requestDidStart() {
//     return {
//        willSendResponse({ response }): {
//         // Hanya jika TIDAK ada error
//         if ('body' in response && response.body.kind === 'single') {
//           const singleResult = response.body.singleResult;

//           // Tambahkan meta_data ke extensions
//           singleResult.extensions = {
//             ...singleResult.extensions,
//             meta_data: {
//               status: 200,
//               message: 'OK',
//             },
//           };
//         }
//       },
//     };
//   },
// };
