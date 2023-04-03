import { auth } from 'actions';
import { getData } from './actions/getData';

/**
 * CONVENTION: Yêu cầu
    1. Tài liệu luồng hoặc mô tả nghiệp vụ 
 */

export const initializationApp = [auth, getData];
