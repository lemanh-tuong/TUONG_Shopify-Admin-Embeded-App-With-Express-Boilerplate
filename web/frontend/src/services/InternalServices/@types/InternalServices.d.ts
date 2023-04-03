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
  declare namespace InternalServices {
    /**
     * @description Type response từ BE
     * NOTE: nên được kéo về từ file "AppModels.d.ts" trong folder "web/src"
     */
    declare interface Setting {
      /** @description Primary key */
      readonly _id: string;
      /** @description Attachment resource */
      attachment?: string;
      /** @description Mô tả của trường */
      min: number;
      /**  @description Mô tả của trường */
      max: number;
    }
  }
}

export {};
