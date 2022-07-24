
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  Modal  from './Modal';


const Genres = () => {
const [books, setBooks] = useState([]);
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState(null)
const [searchText, setSearchText] = useState('')
const [isOpen, setIsOpen] = useState(false)
const [id, setId] = useState(null)
console.log(searchText)

useEffect(() => {
  fetch('https://api.itbook.store/1.0/new')
  .then(res => {
    if(!res.ok){
      throw Error("could not fetch data")
    }
    return res.json();
  })
  .then(data => {
    setBooks(data.books)
    setIsLoading(false)
    setError(null)
  })
  .catch(err => {
    console.log("err" + err.message)
    setError(err.message)
    setIsLoading(false)
  })
},[])


 
  return (
    <>
    <div className="container-fluid container">
      <div className="search">
            <input type="text" placeholder='search books ... ' onChange={(e) => setSearchText(e.target.value)}/>
            {/* <button><i class="fa-solid fa-magnifying-glass"></i></button> */}
        </div>
    <div className="books">
      {isLoading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {books && books.filter((book) => {
        if(searchText == '' || searchText == undefined){
          return book
        }else if (book.title.toLowerCase().includes(searchText.toLowerCase())){
          return book
        }
      }).map((book) => {
        return(
          <article key = {book.isbn13}>
          <img src={book.image} alt = "img"></img>
          <h2>{book.title}</h2>
          <div className='shop'>
            <div className='price'><h2 style = {{"fontSize": "1.3rem"}}>{book.price}</h2></div>
            <button style={{marginRight: '5px'}} onClick={() => {
              setIsOpen(true)
              setId(book.isbn13)
            }}>Details</button>
          </div>
        </article>
        )
        
      })}
    </div>
    </div>
    <Modal open = {isOpen} id = {id} onClose = {() => setIsOpen(false)}>
    </Modal>
    </>
  )
}

export default Genres