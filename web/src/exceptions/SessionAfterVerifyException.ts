import { Session } from '@shopify/shopify-api';

/**
 * CONVENTION:
    - Comment rõ tác dụng của expception
 */

/** @description */
export class SessionAfterVerifyException extends Error {
  session: Session;
  constructor(session: Session) {
    super();
    this.name = 'SessionAfterVerifyException';
    this.session = session;
  }
}
