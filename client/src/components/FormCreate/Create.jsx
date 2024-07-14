import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Types, GetPokemonCreate } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import styles from './Create.module.css' // Importa los estilos CSS modules
import defaultImage from '../../fotos/imagen_incong-removebg-preview.jpg'
import { Route, Link } from 'react-router-dom'
import ModalTypes from '../ModalTypes/ModalTypes'
import ModalCreate from '../ModalCreation/ModalCreate'
import ModalError from '../ModalError/ModalError'
import ModalGood from '../ModalCreateCorrect/ModalGood'
import PickFormCreate from "../../fotos/PokeForm.png"

function Create() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const createPoke = useSelector((state) => state.PokeCreate)

  const [formData, setFormData] = useState({
    name: '',
    vida: '',
    fuerza: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    type: [],
    img: '',
  })
  useEffect(() => {
    dispatch(Types())
    validate()
  }, [formData])

  const [typeState, setTypeState] = useState({
    types: [],
  })

  const [formValidate, setFormValidate] = useState({
    name: '',
    vida: '',
    fuerza: '',
    defensa: '',
    velocidad: '',
    altura: '',
    peso: '',
    type: '',
    img: '',
  })



    const validate = () => {
    // Validacion name
    const regexName = /^[a-zA-Z]{4,8}$/
    let newFormValidate = { ...formValidate }

    // Validación del nombre
    if (formData.name.length === 0) {
      newFormValidate.name = 'Escribe un Nombre'
    } else if (!regexName.test(formData.name)) {
      newFormValidate.name =
        'Debe contener letras y tener entre 4 y 8 caracteres'
    } else {
      newFormValidate.name = ''
    }

    // Validacion de fuerza
    if (formData.fuerza.length === 0) {
      newFormValidate.fuerza = 'Escribe cuánta fuerza debe tener tu Pokémon'
    } else if (formData.fuerza > 150) {
      newFormValidate.fuerza = 'El Pokémon no puede tener más de 150 de Fuerza'
    } else if (formData.fuerza < 0) {
      newFormValidate.fuerza = 'El Pokémon no puede tener menos de 0 de Fuerza'
    } else {
      newFormValidate.fuerza = ''
    }
    // Validación de vida
    if (formData.vida.length === 0) {
      newFormValidate.vida = 'Escribe cuánta vida debe tener tu Pokémon'
    } else if (formData.vida > 150) {
      newFormValidate.vida = 'El Pokémon no puede tener más de 150 de Vida'
    } else if (formData.vida < 0) {
      newFormValidate.vida = 'El Pokémon no puede tener menos de 0 de Vida'
    } else {
      newFormValidate.vida = ''
    }
    // Validacion de defensa
    if (formData.defensa.length === 0) {
      newFormValidate.defensa = 'Escribe cuánta defensa debe tener tu Pokémon'
    } else if (formData.defensa > 150) {
      newFormValidate.defensa =
        'El Pokémon no puede tener más de 150 de Defensa'
    } else if (formData.defensa < 0) {
      newFormValidate.defensa =
        'El Pokémon no puede tener menos de 0 de Defensa'
    } else {
      newFormValidate.defensa = ''
    }
    // Validacion de velocidad
    if (formData.velocidad.length === 0) {
      newFormValidate.velocidad =
        'Escribe cuánta velocidad debe tener tu Pokémon'
    } else if (formData.velocidad > 150) {
      newFormValidate.velocidad =
        'El Pokémon no puede tener más de 150 de Velocidad'
    } else if (formData.velocidad < 0) {
      newFormValidate.velocidad =
        'El Pokémon no puede tener menos de 0 de Velocidad'
    } else {
      newFormValidate.velocidad = ''
    }
    // Validacion de peso
    if (formData.peso.length === 0) {
      newFormValidate.peso = 'Escribe cuánta peso debe tener tu Pokémon'
    } else if (formData.peso > 150) {
      newFormValidate.peso = 'El Pokémon no puede tener más de 150 de Peso'
    } else if (formData.peso < 0) {
      newFormValidate.peso = 'El Pokémon no puede tener menos de 0 de Peso'
    } else {
      newFormValidate.peso = ''
    }
    // validacion de altura
    if (formData.altura.length === 0) {
      newFormValidate.altura = 'Escribe cuánta altura debe tener tu Pokémon'
    } else if (formData.altura > 150) {
      newFormValidate.altura = 'El Pokémon no puede tener más de 150 de altura'
    } else if (formData.altura < 0) {
      newFormValidate.altura = 'El Pokémon no puede tener menos de 0 de altura'
    } else {
      newFormValidate.altura = ''
    }
    // Imagen
    const regexImg = /^https?:\/\/.*\.(?:png)$/
    if (formData.img.length === 0) {
      newFormValidate.img = 'Escribe un URL valido (png)'
    } else if (!regexImg.test(formData.img)) {
      newFormValidate.img = 'La Imagen debe ser en formato png'
    } else {
      newFormValidate.img = ''
    }

    //Types
    if (formData.type.length === 0) {
      newFormValidate.type = 'Seleccione aunque sea un tipo'
    } else if (formData.type.length > 3) {
      newFormValidate.type = 'Solo se pueden como maximo 2 tipos de pokemons'
    } else {
      newFormValidate.type = ''
    }
    setFormValidate(newFormValidate)
  }
  const types = useSelector((state) => state.Types)
  const isFormValid = Object.values(formValidate).every((field) => field === '')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleChangeTypes = (e) => {
    const { value } = e.target
    const selectedRename = e.target.options[
      e.target.selectedIndex
    ].getAttribute('data_rename')
    if (formData.type.length < 2) {
      setFormData({
        ...formData,
        type: [...formData.type, value],
      })
      setTypeState({
        types: [...typeState.types, { id: value, name: selectedRename }],
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = Object.values(formValidate).every((field) => field === '')
    console.log('Soy validate', isValid)
    if (isValid) {
      setIsModalOpen(true)
    } else {
      alert('Por favor completa todos los campos')
    }
  }

  const handleConfirm = () => {
    dispatch(GetPokemonCreate(formData))
    setFormData({
      name: '',
      vida: '',
      fuerza: '',
      defensa: '',
      velocidad: '',
      altura: '',
      peso: '',
      type: [],
      img: '',
    })
    setTypeState({
      types: [],
    })
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleRemoveType = (typeToRemove) => {
    setFormData({
      ...formData,
      type: formData.type.filter((type) => type !== typeToRemove.id),
    })
    setTypeState({
      ...typeState,
      types: typeState.types.filter((type) => type.name !== typeToRemove.name),
    })
  }
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
  const imageUrl = formData.img ? formData.img : defaultImage

  const handleDelete = () => {
    if (selectedType) {
      handleRemoveType(selectedType)
    }
    setIsOpen(false)
  }

  const handleOpenModal = (type) => {
    setSelectedType(type)
    setIsOpen(true)
  }

  return (
    // https://static.wikia.nocookie.net/espokemon/images/4/43/Bulbasaur.png
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* 1 */}
      <Link
        to={'/pokemons'}
        className={`${styles.divStyle} dark`}
        prefetch={false}
      >
        <ArrowLeftIcon />
      </Link>
      {createPoke[0] === 'Error' ? (
        <ModalError />
      ) : createPoke[0] === 'Creado' ? (
        <ModalGood img={formData.img}/>
      ) : (
        <div className={styles.container_formAndCard}>
          <div className={styles.container__form}>
            <div className={styles.container_name}>
              <div className={styles.container_inputs}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  autocomplete="off"
                />
                <label htmlFor="name">Name</label>
                {formValidate.name && (
                  <div className={styles.error}>
                    {formValidate.name } 
                  </div>
                )}
              </div>
            </div>

            {/* 2 */}
            <div className={styles.container_img}>
              <div className={styles.container_inputs}>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                  placeholder=" "
                  autocomplete="off"
                />
                <label htmlFor="img">Imagen</label>
                {formValidate.img && (
                 <div className={styles.error}>
                    {formValidate.img}
                  </div>
                )}
              </div>
            </div>
            {/* 3 */}
            <div className={styles.container_types}>
              <div className={styles.container_inputs}>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChangeTypes}
                  className={styles.select_Types_One}
                >
                  {types?.map((tipo, index) => {
                    let rename =
                      tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1)
                    return (
                      <option
                        key={index}
                        value={`${tipo.id}`}
                        data_rename={rename}
                      >
                        {rename}
                      </option>
                    )
                  })}
                </select>
                {formValidate.type && (
                <div className={styles.error_type}>
                  {formValidate.type}
                </div>
              )}
              </div>
           

              <div>
                <div className={styles.flex_types_container}>
                  {typeState.types.map((type, index) => (
                    <div
                      key={index}
                      className={`${styles.types} ${
                        styles[type.name.toLowerCase()]
                      }`}
                    >
                      <span
                        className={styles.spanRemove}
                        onClick={() =>
                          handleOpenModal({ name: type.name, id: type.id })
                        }
                      >
                        {type.name}
                      </span>
                      <ModalTypes
                        isOpen={isOpen}
                        handleClose={() => setIsOpen(false)}
                        handleDelete={handleDelete}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className={styles.container_fuerza}>
              <div className={styles.container_inputs}>
                <input
                  type="number"
                  id="fuerza"
                  name="fuerza"
                  value={formData.fuerza}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>
                  {' '}
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
                </label>

                {formValidate.fuerza && (
                  <div className={styles.error}>
                    {formValidate.fuerza}
                  </div>
                )}
              </div>
            </div>
            {/* 5 */}
            <div className={styles.container_vida}>
              <div className={styles.container_inputs}>
                <input
                  type="number"
                  id="vida"
                  name="vida"
                  value={formData.vida}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>
                  {' '}
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
                </label>
                {formValidate.vida && (
                  <div className={styles.error}>
                    {formValidate.vida}
                  </div>
                )}
              </div>
            </div>
            {/* 6 */}
            <div className={styles.container_def}>
              <div className={styles.container_inputs}>
                <input
                  type="number"
                  id="defensa"
                  name="defensa"
                  value={formData.defensa}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>
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
                </label>
                {formValidate.defensa && (
                  <div className={styles.error}>
                    {formValidate.defensa}
                  </div>
                )}
              </div>
            </div>
            {/* 7 */}
            <div className={styles.container_vel}>
              <div className={styles.container_inputs}>
                <input
                  type="number"
                  id="velocidad"
                  name="velocidad"
                  value={formData.velocidad}
                  onChange={handleChange}
                  placeholder=""
                />
                <label>
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
                </label>
                {formValidate.velocidad && (
                  <div className={styles.error}>
                    {formValidate.velocidad}
                  </div>
                )}
              </div>
            </div>
            {/* 8 */}
            <div className={styles.container_peso}>
              <div className={styles.container_inputs}>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>
                  {' '}
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
                </label>
                {formValidate.peso && (
                  <div className={styles.error}>
                    {formValidate.peso}
                  </div>
                )}
              </div>
            </div>
            {/* 9 */}
            <div className={styles.container_altura}>
              <div className={styles.container_inputs}>
                <input
                  type="number"
                  id="altura"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>
                  {' '}
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
                </label>
                {formValidate.altura && (
                  <div className={styles.error}>
                    {formValidate.altura}
                  </div>
                )}
              </div>
            </div>
            {/* 10 */}
            <div className={styles.container_btn}>
              <button
                type="submit"
                className={styles.btnSubmit}
                disabled={!isFormValid}
              >
                Submit
              </button>
              <ModalCreate
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                name={formData.name}
              />
            </div>
          </div>

          {/* CARD. */}
          <div className={styles.container__card}>
            <section className={styles.card_state}>
              <div
                className={`${styles.container} ${
                  styles[
                    typeState.types &&
                    typeState.types[0] &&
                    typeState.types[0].name
                      ? typeState.types[0].name.toLowerCase() + '_border'
                      : 'classContainerCard'
                  ]
                }`}
              >
                <div
                  className={`${styles.relative_container} ${
                    styles[
                      typeState.types &&
                      typeState.types[0] &&
                      typeState.types[0].name
                        ? typeState.types[0].name.toLowerCase()
                        : 'ContainerImg'
                    ]
                  }`}
                >
                  <img
                    src={formData.img? formData.img : PickFormCreate}
                    alt={formData.name}
                    className={styles.full_cover}
                    width="300"
                  />
                </div>

                <div className={styles.padding_box}>
                  <div className={styles.flex_container}>
                    <h2 className={styles.bold_text}>
                      {formData.name
                        ? formData.name.charAt(0).toUpperCase() +
                          formData.name.slice(1)
                        : 'Name'}
                    </h2>
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
                      <span className={styles.hp}>
                        {formData.vida ? formData.vida : 0}
                      </span>
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

                      <span className={styles.attack_text}>
                        {formData.fuerza ? formData.fuerza : 0}
                      </span>
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
                        {formData.defensa ? formData.defensa : 0}
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
                        {formData.velocidad ? formData.velocidad : 0}
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
                        {formData.altura ? formData.altura : 0}
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
                        {formData.peso ? formData.peso : 0}
                      </span>
                    </div>
                  </div>
                  <div className={styles.flex_types_container}>
                    {typeState.types?.map((type) => {
                      let res = type.name.toLowerCase()
                      return (
                        <>
                          <span className={`${styles.types} ${styles[res]}`}>
                            {' '}
                            {type.name}
                          </span>
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </form>
  )
}

export default Create
