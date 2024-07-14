import React from "react";
import styles from "./Modal.module.css";
import { GetPokemonsAll } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import GifNoExistePoke from '../../fotos/Noexiste.gif'

const Modal = ({res}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(GetPokemonsAll())
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                <h1>{res}</h1>

                    <img src={GifNoExistePoke} width="250px" height="250px"/>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.button} onClick={handleClick}>Go to Hone</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;