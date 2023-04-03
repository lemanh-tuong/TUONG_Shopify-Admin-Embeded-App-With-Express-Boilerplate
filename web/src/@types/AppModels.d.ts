/**
 * CONVENTION: Yêu cầu 
    1. Comment @description rõ ràng cho Model
    2. Comment @description rõ ràng các properties của Model
    3. readonly, optional được viết đúng với logic thực tế của app
    4. Link tài liệu nó có 
 */

/**
 * @description Định nghĩa type models của app
 */
declare global {
  /** @description Model chứa các settings để hiển thị ở ngoài shop */
  declare namespace AppModels {
    /** @description Mô tả model */
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
