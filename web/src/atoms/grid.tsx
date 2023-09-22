import classNames from 'classnames';
import React, { FC } from 'react';
import { css } from 'styled-components';

export const columnCss = css`
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
`;

export const columnClasses = 'mx-auto my-0 w-10/12 max-w-6xl';

export const Column: FC<{ className?: string }> = ({ children, className }) => {
  return <div className={classNames(columnClasses, className)}>{children}</div>;
};
