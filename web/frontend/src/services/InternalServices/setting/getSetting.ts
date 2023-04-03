import { AxiosResponse } from 'axios';
import { fetchAPI } from 'utils/fetchAPI';
import { isAxiosError } from 'utils/isAxiosError';
import { BaseParams } from '../@types/BaseParams';
import { BaseResponseError } from '../@types/BaseResponseError';
import { InternalServiceException } from '../utils/InternalServiceException';

/**
 * CONVENTION:
    - link docs
    - tác dụng
    - định nghĩa và comment rõ ràng đầu vào đầu ra
    - ...
 */

// FIXME: Nên được gen ra chứ không nên viết tay
interface ResponseSuccess {
  data: InternalServices.Setting | null;
}

type ResponseError = BaseResponseError;

export type GetSetting = BaseParams;

export const getSetting = async ({ appBridge }: GetSetting): Promise<AppModels.Setting> => {
  try {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${appBridge.localOrigin}/api/setting`,
    });
    return {
      max: response.data.data?.max ?? 0,
      min: response.data.data?.min ?? 0,
      rawData: response.data.data,
    };
  } catch (error) {
    if (isAxiosError<ResponseError>(error)) {
      throw new InternalServiceException({
        request: error.request,
        response: error.response,
      });
    }
    throw error;
  }
};
