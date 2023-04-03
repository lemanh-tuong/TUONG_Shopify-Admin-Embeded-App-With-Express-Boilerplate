/** 
 * CONVENTION: Yêu cầu
    1. Comment rõ ràng các properties 
 */

export interface Session {
  /** @description Domain của shop */
  shopDomain: string;
  /** @description Online token hoặc offline token */
  accessToken: string;
  /** @description API Version - Thường là lấy luôn biến môi trường của app */
  apiVersion: string;
}

export interface BaseParams {
  session: Session;
}
