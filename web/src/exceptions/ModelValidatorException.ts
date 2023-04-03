/**
 * CONVENTION:
    - Comment rõ tác dụng của expception
 */

/** @description */
export class ModelValidatorException<T extends Record<string, any>> extends Error {
  errors: Record<keyof T, string>;
  constructor(errors: ModelValidatorException<T>['errors']) {
    super();
    this.errors = errors;
    this.name = 'ModelValidatorException';
  }
}
