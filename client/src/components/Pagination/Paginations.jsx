import React, { useState } from 'react'
import styles from './Paginations.module.css'

function Paginations({ totalPosts, postsPerPage, setCurrentPage }) {
  const [currentPage, setPage] = useState(1)
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  let pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1)
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1)
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page) => {
    setPage(page)
    setCurrentPage(page)
  }



 

  return (
    <div className={styles.paginationContainer}>
      <button
        className={`${styles.paginationButton} ${
          currentPage === 1 ? styles.paginationButtonDisabled : ''
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
       Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            currentPage === page ? styles.paginationButtonActive : ''
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`${styles.paginationButton} ${
          currentPage === totalPages ? styles.paginationButtonDisabled : ''
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Paginations
