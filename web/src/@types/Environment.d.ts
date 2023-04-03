/**
 * CONVENTION: Yêu cầu 
    1. readonly, optional được viết đúng với logic thực tế của app
    2. Tác dụng của các biến env này sẽ được comment tại file .ts vì tên có thể giống nhau nhưng chức năng có thể khác nhau
      - Ví dụ cùng tên
        - "_____ADDITIONAL_VARIABLE______APP_NAME":
          - FE sử dụng để làm Logo
          - BE sử dụng để lưu tên biến đó lên shopify
        - "_____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID":
          - FE sử dụng để link người dùng đến trang active theme app extension
          - BE sử dụng để check shop đã active theme app extension lên chưa
    3. Link tài liệu nó có 
 */

/**
 * @description Định nghĩa các biến môi trường được sử dụng trong app
 * WARNING: Tiền tố "_____ADDITIONAL_VARIABLE______" được config tại "vite.config.js -> envPrefix". Nếu muốn thay đẩy cần update "generateEnvFiles.js"
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** DANGER: Những thứ liên quan đến shopify và các service hosting ===> không nên update */
      readonly HOST: string;
      readonly SHOPIFY_API_KEY: string;
      readonly SHOPIFY_API_SECRET: string;
      readonly SCOPES: string;
      readonly API_VERSION: string;
      readonly BACKEND_PORT: string;
      readonly PORT: string;
      readonly NODE_ENV: 'production' | 'development';
      /** <------------------------------------------------------------------------------------------> */

      /** START_EDIT: */
      _____ADDITIONAL_VARIABLE______APP_NAME: string;
      _____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID: string;
    }
  }
}

export {};
