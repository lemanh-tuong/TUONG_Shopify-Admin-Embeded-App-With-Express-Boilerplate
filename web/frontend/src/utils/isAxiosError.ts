import { AxiosError } from 'axios';

export const isAxiosError = <Response>(error: unknown): error is AxiosError<Response> => {
  return error instanceof Error && (error as AxiosError).isAxiosError;
};
