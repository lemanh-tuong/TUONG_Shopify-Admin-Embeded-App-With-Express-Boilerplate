/** CONVENTION: Yêu cầu
 1. Comment mô tả tác dụng của các biến môi trường được định nghĩa 
 2. Sử dụng các tag WARNING:, DANGER: cho những thứ cần lưu ý 
 */

/** @description Port mà server node sẽ chạy */
export const port = parseInt(process.env.BACKEND_PORT || process.env.PORT || '8080', 10);

/**
 * @description Đường dẫn đến directory frontend
 * WARNING: Update nếu có sự thay đổi cấu trúc thư mục
 */
export const staticPath =
  process.env.NODE_ENV === 'production' ? `${process.cwd()}/web/frontend/dist` : `${process.cwd()}/frontend/`;

/** @description Full domain của app */
export const host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, '') : 'localhost';

/** @description Tên của app */
export const appName = process.env._____ADDITIONAL_VARIABLE______APP_NAME;

/** @description Dùng để check app extension đang được active hay không */
export const appEmbedExtensionUuid = process.env._____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID;
