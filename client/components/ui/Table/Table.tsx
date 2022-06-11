import React from 'react';
import ReactDOM from 'react-dom';
import { FaCheck } from 'react-icons/fa';

import styles from './PopUp.module.css';

interface Props {
  message: string;
  isOpen: boolean;
}

const Table = ({ message, isOpen }: Props) =>
  isOpen
    ? ReactDOM.createPortal(
        <div className={styles.TableContainer}>
          <div className={styles.message}> {message}</div>
          <FaCheck color={'#59981A'} size={64} />
        </div>,
        document.body
      )
    : null;

export default Table;
