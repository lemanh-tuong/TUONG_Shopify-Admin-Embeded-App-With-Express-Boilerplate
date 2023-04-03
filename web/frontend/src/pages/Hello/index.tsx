import HelloImage from 'assets/images/Hello.jpg';
import { View } from 'wiloke-react-core';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả nếu cần 
 */

export const Hello = () => {
  return <View tagName="img" src={HelloImage} alt="Hello"></View>;
};
