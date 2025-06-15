// export const ApiResponse = ({ code, message, success, data }) => {
//   console.log(code, message, success, data)
//   return {
//     success: success || false,
//     message: message || "Internal Error",
//     code: code || 501,
//     data: data || null,
//   };
// };

export const ApiResponse = (code, message, success, data = null) => ({
  code,
  message,
  success,
  data,
});

// function createApiResponse({ message = '', code = 200, data = null, success = true }) {
//   return {
//     success,
//     message,
//     code,
//     data
//   };
// }
