/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Polyfill, browser security
 */

export const strToCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
