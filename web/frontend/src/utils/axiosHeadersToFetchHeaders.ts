import { AxiosResponse } from 'axios';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Polyfill, browser security
 */

/** @description Convert axios headers to headers instance */
export function axiosHeadersToFetchHeaders(axiosHeaders: AxiosResponse['headers']) {
  const headers = new Headers();
  for (const header in axiosHeaders) {
    headers.append(header, axiosHeaders[header]);
  }
  return headers;
}
