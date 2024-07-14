import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import PokeFondo from '../../fotos/PokeFondo.png'
function LandingPage() {
  return (
    <div className={styles.container}>
      <img src={PokeFondo} alt="Hero Image" className={styles.container_img} />
      <div className={styles.container_btn}>
        <button className={styles.btn}>
          <Link to="/pokemons" className={styles.link}>Lest Go</Link>
        </button>
      </div>
    </div>
  )
}

export default LandingPage
