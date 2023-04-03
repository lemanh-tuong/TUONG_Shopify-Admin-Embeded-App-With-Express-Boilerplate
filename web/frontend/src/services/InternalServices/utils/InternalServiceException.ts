import { AxiosError } from 'axios';

/**
 * CONVENTION:
    - Comment rõ tác dụng của expception
 */

interface CauseError {
  createdAt: string;
  response: AxiosError['response'];
  request: AxiosError['request'];
}

/** @description */
export class InternalServiceException extends Error {
  cause: CauseError;
  constructor(cause: Pick<CauseError, 'response' | 'request'>) {
    super();
    this.name = 'InternalServiceException';
    this.cause = {
      ...cause,
      createdAt: new Date().toString(),
    };
  }
}
