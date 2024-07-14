import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetPokemonByName } from '../../redux/actions'
import styles from './SearchBar.module.css'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Filters from '../Filtros/Filters'

const MenuIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 50 50"
  >
    <path
      d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"
      className={styles.icon}
    />
  </svg>
)

const CloseIcon = () => (
  <svg
    className={styles.icon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 18L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.icon}
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.icon}
    />
  </svg>
)

function SearchBar() {
  const [inputBusc, setInputBusc] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    setInputBusc(event.target.value)
  }

  const handleClick = () => {
    if (inputBusc === '') {
      alert('Escribe un nombre...')
    } else {
      dispatch(GetPokemonByName(inputBusc))
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  const toggleFilters = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters)
  }

  return (
    <div>
      <header className={styles.header}>
        <button onClick={toggleFilters} className={styles.toggleButton}>
          {showFilters ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Link to="/pokemons" className={styles.link}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
            width="100"
            height="50"
            alt="Pokémon Logo"
          />
        </Link>
        <div className={styles.searchContainer}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search..."
            className={styles.input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Link to="/pokemons/form" className={styles.createButton}>
          Create
        </Link>
      </header>
      {showFilters && <Filters />}
    </div>
  )
}

export default SearchBar
