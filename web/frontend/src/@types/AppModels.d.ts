/**
 * CONVENTION: Yêu cầu 
    1. Comment @description rõ ràng cho Model
    2. Comment @description rõ ràng các properties của Model
    3. readonly, optional được viết đúng với logic thực tế của app
    4. Link tài liệu nó có 
    5. Type response BE trả về cần định nghĩa vào property "rawData"
 */

/**
 * @description Định nghĩa type models của app
 */
declare global {
  declare namespace AppModels {
    /** @description Model chứa các settings để hiển thị ở ngoài shop */
    declare interface Setting {
      /** @description Mô tả */
      min: number;
      /** @description Mô tả */
      max: number;
      /**
       * @description Type response từ BE
       * NOTE: nên được kéo về từ file "AppModels.d.ts" trong folder "web/src"
       */
      rawData: InternalServices.Setting | null;
    }

    /** @description Mô tả */
    declare interface Todo {
      /** @description Mô tả */
      id: string;
      /** @description Mô tả */
      title: string;
      /** @description Mô tả */
      description: string;
    }
  }
}
export {};
