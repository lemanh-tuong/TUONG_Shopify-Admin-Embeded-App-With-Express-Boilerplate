import { AxiosError, AxiosResponse } from 'axios';

/**
 * CONVENTION:
    - Comment rõ tác dụng của expception
 */

/** @description */
export class ShopifyRestException extends Error {
  isAuthenticationError: boolean;
  shopifyResponse: AxiosResponse<any> | undefined;

  constructor(error: Error | AxiosError) {
    const error_ = error as AxiosError;
    super();
    this.name = 'ShopifyRestException';
    this.message = error_.isAxiosError ? error_.message : error.message;
    this.shopifyResponse = error_.isAxiosError ? error_.response?.data : undefined;
    this.isAuthenticationError = !!error_.isAxiosError && !!error_.code && ['401', '403'].includes(error_.code);
  }
}
