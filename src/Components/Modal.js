import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { Link , useHistory} from 'react-router-dom'

const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ccc',
        padding: '10px',
        zIndex: 1000,
        borderRadius: '5px',
        transition: 'all 300ms ease'
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
}

const Modal = ({open, id, onClose}) => {
  const history = useHistory()
    const [book, setBook] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://api.itbook.store/1.0/new')
  .then(res => {
    if(!res.ok){
      throw Error("could not fetch data")
    }
    return res.json();
  })
  .then(data => {
    setBook(data.books)
    setIsLoading(false)
    setError(null)
  })
  .catch(err => {
    console.log("err" + err.message)
    setError(err.message)
    setIsLoading(false)
  })
},[])
const handleAdd = (e) => {
  e.preventDefault();
  const cart_book = {
    title: book.filter(book => book.isbn13 == id)[0].title,
    price: book.filter(book => book.isbn13 == id)[0].price,
    image:  book.filter(book => book.isbn13 == id)[0].image,
    quantity: 1
  }
  fetch('http://localhost:9000/books', {
    method: 'POST',
    headers : {"Content-Type": "application/json"},
    body: JSON.stringify(cart_book)
  })
  .then(() => {
    console.log("added")
    history.push('/cart')
  })
}
    if(!open){
        return null
    }else{

        return ReactDom.createPortal(
          <>
          <div style={OVERLAY_STYLES}/>
          <div className='bookcontent' style={MODAL_STYLES}>
              <button style={{
                position: 'absolute',
                top: '2px',
                right: '2px'
              }} onClick={onClose}>close</button> 
            {book.filter((book) => book.isbn13 === id).map((book)=> {
                return(
                    <article  style={{display: 'flex'}} key = {book.isbn13}>
                        <div className="image">
                            <img src={book.image} alt="img" />
                        </div>
                        <div className="content">
                            <h1 style={{fontSize: '2rem'}}>{book.title}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ex dignissimos minus molestias nostrum consequatur suscipit laudantium dolorem incidunt. Illo, maiores. Minima sapiente natus commodi at tempore suscipit minus necessitatibus id eligendi velit, laborum rem ut non vel, iure aperiam?</p>
                            <div className="shop">
                            <span style={{fontWeight: 'bold', fontSize: '1.3rem'}}>{book.price}</span>
                            <button onClick = {handleAdd} style={{color: 'white'}}>Add to cart</button>
                            </div>
                        </div>
                    </article>
                )
            })}
          </div>
          </>,
          document.getElementById('portal')
        )
    }
}

export default Modal