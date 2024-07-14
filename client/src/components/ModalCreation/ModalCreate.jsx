import React from 'react';
import styles from './ModalCreate.module.css'; 
const ModalCreate = ({ isOpen, onClose, onConfirm,name}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
    <div className={styles.modalContainer}>
      <h2 className={styles.modalTitle}>Estas seguro que quieres crearlo?</h2>
      <p className={styles.modalText}>Estas a punto de crear a <strong>{name || 'Selecciona un name'}</strong>.</p>
      <div className={styles.modalButtonContainer}>
        <button
          onClick={onClose}
          className={styles.cancelButton}
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className={styles.button}
        >
          Sí
        </button>
      </div>
    </div>
  </div>

  );
};

export default ModalCreate;