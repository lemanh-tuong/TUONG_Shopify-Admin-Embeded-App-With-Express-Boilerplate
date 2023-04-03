import { AxiosError } from 'axios';

/**
 * CONVENTION:
  1. Cần comment rõ ràng những thứ liên quan đến interface của class service - method, đầu ra đầu vào, ... 
 */

export interface CreateReportError_BEExpectParams {
  error: Error | AxiosError;
  positionError: string;
  additionalData?: string;
}

export interface ReportService {
  createReportError: (params: CreateReportError_BEExpectParams) => Promise<boolean>;
}
