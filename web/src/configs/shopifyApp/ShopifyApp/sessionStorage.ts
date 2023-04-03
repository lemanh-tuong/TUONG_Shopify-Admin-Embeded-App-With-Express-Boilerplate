import { SQLiteSessionStorage } from '@shopify/shopify-app-session-storage-sqlite';

/**
 * WARNING: START_EDIT: Bắt buôc phải update "SessionStorage" thay vì lưu Memory vì 
 * 1. Shopify chỉ chạy auth - tức chỉ nhận được offline token hoặc online token - khi app được cài, update scopes hoặc redirect đến "/auth"
 * 2. Token chỉ có thể lấy qua hàm "getSessionAfterVerify" được định nghĩa tại "src/utils/getSessionAfterVerify.ts" - "ShopifyApp.validateAuthenticatedSession" sẽ gán token vào "locals" và hàm đó sẽ thực hiện lấy session trong trường "locals" về
 * Kịch bản lỗi như sau:
     1. Người dùng cài app 
     2. Shopify sẽ trả về offline token và lưu vào Memory
     3. Ta build lại app hoặc đơn giản là chạy lại server
     4. Người dùng truy cập lại app
     5. Các api của app sẽ trả về 403 do hàm "ShopifyApp.validateAuthenticatedSession()" validate - Hàm này sẽ lấy session từ "sessionStorage" mà khi đó Memory bị flush rồi nên sẽ không có nên sẽ là 403 liên tục 

 * NOTE: Tại FE đã có đoạn redirect "/auth" nếu "ShopifyApp.validateAuthenticatedSession" nhưng vẫn nên viết lại để giảm thời gian vào app của khách hàng 
*/
const DB_PATH = `${process.cwd()}/database.sqlite`;
export const sessionStorage = new SQLiteSessionStorage(DB_PATH);
