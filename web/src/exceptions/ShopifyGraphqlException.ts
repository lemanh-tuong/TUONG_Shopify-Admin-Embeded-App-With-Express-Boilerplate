/**
 * CONVENTION:
    - Comment rõ tác dụng của expception
 */

/** @description */
export class ShopifyGraphqlException extends Error {
  constructor() {
    super();
    this.name = 'ShopifyGraphqlException';
  }
}
