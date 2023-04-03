import React, { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'wiloke-react-core';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ ràng các properties trong input 
    2. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    3. Storybook
    4. Testing
 */

export interface AsyncComponentProps {
  /** Trạng thái request hiện tại */
  status: Status;
  /** Component của trạng thái "idle" */
  Idle?: ReactNode;
  /** Component của trạng thái "request" */
  Request?: ReactNode;
  /** Component của trạng thái "success" */
  Success: ReactNode;
  /** Component của trạng thái "failure" */
  Failure?: ReactNode;
  /** Component của trạng thái "success" và "isEmpty=true" */
  Empty?: ReactNode;
  /** Cờ trạng thái check dữ liệu rỗng */
  isEmpty?: boolean;
}

export const AsyncComponent: FC<AsyncComponentProps> = ({
  status,
  Success,
  Failure = null,
  Idle = null,
  Request = <ActivityIndicator />,
  Empty = null,
  isEmpty = false,
}) => {
  const _renderMapping: Record<Status, ReactNode> = {
    idle: isEmpty ? Empty : Idle,
    loading: Request,
    success: isEmpty ? Empty : Success,
    failure: Failure,
  };

  return <>{_renderMapping[status]}</>;
};
