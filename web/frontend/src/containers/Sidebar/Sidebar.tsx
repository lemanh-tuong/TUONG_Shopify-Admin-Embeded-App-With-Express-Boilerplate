import Logo from 'assets/images/Logo_Builder.png';
import { APP_NAME } from 'configs/env';
import { Link } from 'react-router-dom';
import { Text, View } from 'wiloke-react-core';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ ràng các properties trong input 
    2. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    3. Storybook nếu có thể 
    4. Testing nếu có thể 
 */

const WIDTH = 300;
export const Sidebar = () => {
  return (
    <View
      css={{
        position: 'fixed',
        zIndex: 10,
        top: '0',
        left: '0',
        bottom: '0',
        width: `${WIDTH}px`,
        background: '#FFFFFF',
        padding: '16px',
      }}
      tagName="nav"
    >
      <View css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <View tagName="img" css={{ width: '50px' }} src={Logo} alt="Logo" />
        <Text tagName="span" css={{ textAlign: 'right' }}>
          {APP_NAME}
        </Text>
      </View>
      <View tagName="ul" style={{ listStyle: 'none', paddingLeft: '0' }}>
        <View tagName="li">
          <Link to="/">Hello</Link>
        </View>
        <View tagName="li">
          <Link to="/redux-saga">Demo redux saga</Link>
        </View>
        <View tagName="li">
          <Link to="/react-query">Demo react query</Link>
        </View>
        <View tagName="li">
          <Link to="/todos">Demo todos list</Link>
        </View>
      </View>
    </View>
  );
};

Sidebar.width = WIDTH;
