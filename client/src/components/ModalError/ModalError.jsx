import React from 'react'
import styles from './ModalError.module.css'
import {  Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LimpFormState } from '../../redux/actions'
import GifError from '../../fotos/gifError.jpg.gif'
import { useEffect } from 'react';

const ModalError = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(LimpFormState())
  }

  useEffect(() => {
    

    return () => {
      dispatch(LimpFormState())
    };
  }, []); 

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>

        <div className={styles.modalContent}>
          <img
            src={GifError}
            width="200px"
            height="200px"
          />
        </div>
        
      
        <div className={styles.containerTitle}>
        <p className={styles.parrafo}><strong>Ups... El nombre ya existe!</strong></p>
        </div>
        <div className={styles.modalFooter}>
          
          <Link to={'/pokemons/form'}>
            <button className={styles.button} onClick={handleClick}>
              Back to Form
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ModalError
