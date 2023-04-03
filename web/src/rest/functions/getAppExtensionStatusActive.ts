import axios from 'axios';
import { appEmbedExtensionUuid } from 'configs';
import { ShopifyRestException } from 'exceptions';
import { BaseParams } from 'rest/@types/Session';
import { reportService } from 'services/ReportService';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment mô tả các biến cần truyền nếu có thể 
    3. Chỉ export type của Response (Type Output), Variables (Type Input) và function chính (Main Function)
    4. Try catch để report lỗi request + custom error code
    5. Link tài liệu nếu có 
    6. Testing nếu có thể
 */

interface GetSettingsData {
  asset: {
    checksum: string;
    content_type: string;
    created_at: string;
    key: 'config/settings_data.json';
    public_url: null;
    size: number;
    theme_id: number;
    updated_at: string;
    value: string;
    warnings: [];
  };
}
interface Block {
  type: string;
  disabled: boolean;
  settings: Record<string, any>;
}
type Blocks = undefined | null | Record<string, Block>;

export interface GetAppExtensionStatusActive extends BaseParams {
  /** id của theme mà shop đang active (tức role="main") */
  themeId: number | undefined;
}

/**
 * @description
 * Function chịu trách nhiệm trả về cờ trạng thái xem theme app extension được bật hay chưa
 * Bằng cách check file "settings_data.json" tại folder "Config" tại theme đang active của shop
 * Bằng cách active, deactive và xóa app có thể thấy được quy luật đặt tên => Sẽ không giải thích chi tiết => Chi tiết tự tìm hiểu
 */
export const getAppExtensionStatusActive = async ({
  session,
  themeId,
}: GetAppExtensionStatusActive): Promise<boolean> => {
  if (appEmbedExtensionUuid === undefined || themeId === undefined) {
    return false;
  }
  const appEmbedExtensionUuid_ = appEmbedExtensionUuid as string;
  try {
    const { accessToken, apiVersion, shopDomain } = session;
    const settings_data = await axios.request<GetSettingsData>({
      url: `https://${shopDomain}/admin/api/${apiVersion}/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });

    const json_parse = JSON.parse(settings_data.data.asset.value);
    const blocks = json_parse.current.blocks as Blocks;
    if (typeof blocks === 'object' && blocks !== null) {
      const disabled = Object.values(blocks).find(block => {
        return block.type.includes(appEmbedExtensionUuid_);
      })?.disabled;
      return typeof disabled === 'boolean' ? !disabled : false;
    }
    return false;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: __filename,
      additionalData: JSON.stringify(session),
    });
    throw new ShopifyRestException(error_);
  }
};
