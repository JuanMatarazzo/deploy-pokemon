
import styles from "./ModalTypes.module.css";

export default function ModalTypes({ isOpen, handleClose, handleDelete }) {

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>¿Deseas elimnar el type ?</h2>
        <p className={styles.modalText}>Esta acción no se puede deshacer. Se eliminará permanentemente el type .</p>
        <div className={styles.modalButtonContainer}>
          <button
            onClick={handleClose}
            className={styles.cancelButton}
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className={styles.button}
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}