/**
 * CONVENTION:
    - Comment rõ tác dụng của expception
 */

/** @description */
export class AppLogicException extends Error {
  constructor() {
    super();
    this.name = 'AppLogicException';
  }
}
