import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Cart = () => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const history = useHistory()

  useEffect(() => {
    fetch('http://localhost:9000/books')
    .then(res => {
      if(!res.ok){
        throw Error = "could not fetch data"
      }
      return res.json()
    })
    .then(data => {
      setIsLoading(false)
      setBooks(data)
    })
    .catch(err => {
      setError(err.message)
    })
  }, [books])



  const bookAdd = (book) => {
    book.quantity++
    fetch('http://localhost:9000/books/' + book.id, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const bookSub = (book) => {
    if(book.quantity > 1 ) {
      book.quantity--
    }else {
    }
    fetch('http://localhost:9000/books/' + book.id, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(book)
    })
  }

  const totalPrice = () => {
  let total = 0
  books && books.forEach(book => {
    const book_price_arr = book.price.split("$")
    const book_price = parseFloat(book_price_arr[1]);
    total += book_price * book.quantity
  })
  return total.toFixed(2)
  }


  
  return (
    <>
    {isLoading && <div>Loading....</div>}
    {books && books.map(book => {
      return(
        <div key = {book.id} style={{display: "flex",border: "1px solid #ccc", alignItems: 'center', marginTop: '1rem', padding: '5px', position: 'relative'}} className="cart_book">
          <div style={{width: "90px",height: "110px", overflow: 'hidden'}} className="img"><img style={{width: "100%", height: "100%"}} src={book.image} alt="img" /></div>
          <h2 style={{fontSize: '1.3rem', width: '60%'}}>{book.title}</h2>
          <div className="tracks" style={{position: 'absolute', right: '10px'}}>
            <div className="pri"><h5>{book.price}</h5></div>
          <div  className="quantity">
            <button className='btn btn-warning' onClick={() => bookSub(book)} style={{cursor:'pointer'}}>-</button>
            <span className='border border-info round' style={{margin:'2px', borderRadius:'5px'}}>{book.quantity}</span>
            <button className='btn btn-primary' onClick={() => bookAdd(book)} style={{cursor:'pointer'}}>+</button>
          </div>
            <button className='btn btn-danger' onClick={() => {
                  fetch('http://localhost:9000/books/' + book.id, {
                    method: 'DELETE',
                  })
                  .then(() => {
                    console.log('success')
                  })
            }} style={{marginLeft: '3px', marginTop: '2px'}}>remove</button>
          </div>
        </div>
      )
    })}

    <div className='totalPrice' style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: "10px 20px",
      width: '100%',
      background: '#988dba',
      position: 'fixed',
      bottom: 0
    }}>
      <div className='price'><h2>${totalPrice()} </h2></div>
      <button className = 'btn btn-success'>Order Now</button>
      </div>
    </>
  )
}

export default Cart