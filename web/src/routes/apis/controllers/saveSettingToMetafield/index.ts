import { auth } from 'actions';
import { save } from './actions/save';
import { validate } from './actions/validate';

/**
 * CONVENTION: Yêu cầu
    1. Tài liệu luồng hoặc mô tả nghiệp vụ 
 */

export const saveSettingToMetafield = [auth, validate, save];
