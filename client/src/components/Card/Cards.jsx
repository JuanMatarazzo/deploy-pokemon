import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetPokemonsAll } from '../../redux/actions'
import Paginations from '../Pagination/Paginations'
import { Link } from 'react-router-dom'
import styles from './card.module.css'
import Modal from '../Modal/Modal'
import Spinner from "../Loader/Spinner"

import Searchbar from '../SearchBar/Searchbar'
function Cards() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetPokemonsAll())
  }, [dispatch])

  const pokemons = useSelector((state) => state.AllPokemons)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostPerPage] = useState(12)
  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const pokemonsPost = pokemons.slice(firstPostIndex, lastPostIndex)

  const gridClass =
    pokemonsPost.length === 1 ? `${styles.singleCard}` : styles.grid

  return (
    <div>
    <Searchbar />
  
    <section className={gridClass}>
      {pokemonsPost.length === 0 ? (
        <div>
        <Spinner />
        </div>
      ) : pokemonsPost[0] === 'No existe' ? (
        <Modal res={'El Pokemon no existe!!!'}/>
      ) : (
       
          pokemonsPost.map((pokemon, index) => {
            const rename = pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
            return (
              <div key={index} className={styles.card}>
                <div className={`${styles.header} ${styles[pokemon.types ? pokemon.types[0].name : 'Not clase']}`}>
                  {rename? rename: null}
                </div>
                <div className={styles.content}>
                  <Link to={`/pokemons/detail/${pokemon.id}`}>
                    <img src={pokemon.img} alt={rename} className={styles.image} />
                  </Link>
                </div>
                <div className={styles.tags}>
                  {pokemon.types?.map((type, index) => {
                    const reName = type.name.charAt(0).toUpperCase() + type.name.slice(1);
                    return (
                      <div key={index} className={`${styles.tag} ${styles[type.name]}`}>
                        {reName}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
      
      )}
    </section>
    <Paginations
      totalPosts={pokemons.length}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
    />
  </div>
  )
}

export default Cards
