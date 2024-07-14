import React, { useEffect, useState } from 'react'
import {
  FiltersByApiOrDb,
  FilterByAttack,
  FilterByName,
  Types,
  FiltersType,
  GetPokemonsAll,
} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Filters.module.css'
function Filters() {
  const dispatch = useDispatch()
  const [attackOrder, setAttackOrder] = useState('')
  const [nameOrder, setNameOrder] = useState('')
  const [typesOrder, setTypesOrder] = useState('')
  const [ApiDbOrder, setApiDbOrder] = useState('')
  const types = useSelector((state) => state.Types)

  useEffect(() => {
    dispatch(Types())
  }, [])

  const handleChange = (value) => {
    let valor = value.target.value
    dispatch(FiltersByApiOrDb(valor))
    setApiDbOrder(valor)
  }

  const handleChangeAttack = (value) => {
    let valor = value.target.value
    dispatch(FilterByAttack(valor))
    setAttackOrder(valor)
  }

  const handleChangeName = (value) => {
    let valor = value.target.value
    dispatch(FilterByName(valor))
    setNameOrder(valor)
  }
  const handleChangeType = (value) => {
    let valor = value.target.value
    dispatch(FiltersType(valor))
    setTypesOrder(valor)
  }

  const onClick = () => {
    dispatch(GetPokemonsAll())
    setAttackOrder('')
    setNameOrder('')
    setApiDbOrder('')
    setTypesOrder('')
  }
  return (
    <div className={styles.container}>
      <div className={styles.container_attack}>
        <select
          value={attackOrder}
          onChange={handleChangeAttack}
          className={styles.container_attacktwo}
        >
          <option value="">Attack</option>
          <option value="asc">1-999</option>
          <option value="desc">999-1</option>
        </select>
      </div>
      
      <div className={styles.container_name}>
        <select
          value={nameOrder}
          onChange={handleChangeName}
          className={styles.container_attacktwo}
        >
          <option value="">Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div className={styles.container_types}>
        <select
          value={typesOrder}
          onChange={handleChangeType}
          className={styles.container_attacktwo}
        >
          <option value="">Types</option>
          {types?.map((type) => {
            let reName = type.name.charAt(0).toUpperCase() + type.name.slice(1)
            return (
              <>
                <option value={type.name}>{reName}</option>
              </>
            )
          })}
        </select>
      </div>
      <div className={styles.container_api}>
        <select
          value={ApiDbOrder}
          onChange={handleChange}
          className={styles.container_attacktwo}
        >
          <option value="">Api and Db</option>
          <option value="db">DB</option>
          <option value="api">API</option>
        </select>
      </div>
      <div className={styles.btn}>
        <button onClick={onClick} className={styles.btnn}>
          <svg
          className={styles.refresh}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M 7.1601562 3 L 8.7617188 5 L 18 5 C 18.551 5 19 5.448 19 6 L 19 15 L 16 15 L 20 20 L 24 15 L 21 15 L 21 6 C 21 4.346 19.654 3 18 3 L 7.1601562 3 z M 4 4 L 0 9 L 3 9 L 3 18 C 3 19.654 4.346 21 6 21 L 16.839844 21 L 15.238281 19 L 6 19 C 5.449 19 5 18.552 5 18 L 5 9 L 8 9 L 4 4 z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Filters
