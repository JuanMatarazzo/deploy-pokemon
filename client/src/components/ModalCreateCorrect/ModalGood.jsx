import React from 'react'
import styles from './ModalGood.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LimpFormState } from '../../redux/actions'
import PikaFeliz from "../../fotos/PikaFelizCorrect.gif"



const ModalGood = (img) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(LimpFormState())
  }

  return (
      <div className={styles.modalOverlay}>
        {console.log(img)}
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
        <h1>¡Pokemon is Created!</h1>
          <img
            src={PikaFeliz}
            width="250px"
            height="250px"
          />
        </div>
        <div className={styles.modalFooter}>
          <Link to={'/pokemons'}>
            <button className={styles.button} onClick={handleClick}>
              Go To Hoome
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ModalGood
