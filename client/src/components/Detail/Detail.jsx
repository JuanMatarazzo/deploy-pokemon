import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PokemonsById, LimpDetail } from '../../redux/actions'
import styles from './Detail.module.css'
import { Link } from 'react-router-dom'
import Spinner from '../Loader/Spinner'

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const pokemon = useSelector((state) => state.PokemonDetail)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(PokemonsById(id)).finally(() => setLoading(false))

    return () => {
      dispatch(LimpDetail())
    }
  }, [dispatch, id])

  if (loading) {
    return <Spinner />
  }

  if (!pokemon.types || pokemon.types.length === 0) {
    return null
  }

  return (
    <section className={styles.containerOne}>
      <Link to={'/pokemons'} className={`${styles.divStyle} dark`}>
        <ArrowLeftIcon />
      </Link>

      {pokemon.name ? (
        <div
          className={`${styles.container} ${
            styles[pokemon.types[0].name + '_border']
          }`}
        >
          <div
            className={`${styles.relative_container} ${
              styles[pokemon.types[0].name]
            }`}
          >
            <img
              src={pokemon.img}
              alt={pokemon.name}
              className={styles.full_cover}
              width="300"
            />
          </div>
          <div className={styles.padding_box}>
            <div className={styles.flex_container}>
              <h2 className={styles.bold_text}>
                {pokemon.name
                  ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                  : pokemon.name}
              </h2>
              <span className={styles.medium_gray_text}>
                #
                {pokemon.id.length > 5
                  ? pokemon.id.substring(pokemon.id.length - 5)
                  : pokemon.id}
              </span>
            </div>
            <div className={styles.grid_container}>
              <div className={styles.flex_containertwo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_red}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className={styles.hp}>{pokemon.hp}</span>
              </div>
              <div className={styles.flex_containertwo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_yellow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                  <line x1="13" x2="19" y1="19" y2="13" />
                  <line x1="16" x2="20" y1="16" y2="20" />
                  <line x1="19" x2="21" y1="21" y2="19" />
                </svg>
                <span className={styles.attack_text}>{pokemon.attack}</span>
              </div>
              <div className={styles.flex_containertwo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_blue}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className={styles.bold_defense_gray}>
                  {pokemon.defense}
                </span>
              </div>
              <div className={styles.flex_containertwo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_green}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className={styles.bold_defense_gray}>
                  {pokemon.speed}
                </span>
              </div>
              <div className={styles.flex_containertwo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_gray}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
                <span className={styles.bold_defense_gray}>
                  {pokemon.height}
                </span>
              </div>
              <div className={styles.flex_containertwo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.svg_gray}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <span className={styles.bold_defense_gray}>
                  {pokemon.weight}
                </span>
              </div>
            </div>
            <div className={styles.flex_types_container}>
              {pokemon.types?.map((type) => {
                let rename =
                  type.name.charAt(0).toUpperCase() + type.name.slice(1)
                return (
                  <span
                    key={type.name}
                    className={`${styles.types} ${styles[type.name]}`}
                  >
                    {' '}
                    {rename}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        
          <Spinner />
       
      )}
    </section>
  )
}

export default Detail
