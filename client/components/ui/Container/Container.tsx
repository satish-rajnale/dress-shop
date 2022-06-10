import { CommonProps } from '@/types/Common';
import React from 'react';

import styles from './Container.module.css';

interface Props extends CommonProps {
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  const classNames = `${styles.container} ${className ? className : ''}`;

  return <div className={classNames}>{children}</div>;
};

export default Container;
