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
  data: AppModels.Setting;
}

type ResponseError = BaseResponseError;

export interface SaveSetting extends BaseParams {
  setting: AppModels.Setting;
}
export const saveSetting = async ({ appBridge, setting }: SaveSetting) => {
  try {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      method: 'POST',
      url: `${appBridge.localOrigin}/api/setting`,
      data: {
        max: setting.max,
        min: setting.min,
      },
    });
    return response.data.data;
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
