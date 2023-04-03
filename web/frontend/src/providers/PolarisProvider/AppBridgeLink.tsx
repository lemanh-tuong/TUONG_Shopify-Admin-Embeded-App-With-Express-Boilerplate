import { useNavigate } from '@shopify/app-bridge-react';
import { LinkLikeComponentProps } from '@shopify/polaris/build/ts/latest/src/utilities/link';
import { FC, useCallback } from 'react';

export const AppBridgeLink: FC<LinkLikeComponentProps> = ({ url, children, external, ...rest }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex={0} {...rest}>
      {children}
    </a>
  );
};
