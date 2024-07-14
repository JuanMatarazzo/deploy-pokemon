import React from 'react';
import styles from './Spinner.module.css';
import Loader from '../../fotos/Loader.gif'
const Spinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <img src={Loader} width='250' height="250"/>
      </div>
    </div>
  );
};

export default Spinner;