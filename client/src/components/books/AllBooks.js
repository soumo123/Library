import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { borrowBook, getBooks } from '../../actions/bookAction';
import { useAlert } from 'react-alert'
import '../../css/book.css'
import { Link } from 'react-router-dom'
const AllBooks = () => {
const alert = useAlert()
  const dispatch = useDispatch()
  const { books } = useSelector((state) => state.books)
  // const {status} = books
  const borrowBooks = useSelector((state) => state.borrowBook)
const {borrowbooks} = borrowBooks
console.log(borrowbooks&&borrowbooks.success)


  const borrowBooksRequest = (name, id) => {

    const myForm = new FormData()
    myForm.set("bookname", name)
    myForm.set("request", "request")
    myForm.set("bookId", id)
    dispatch(borrowBook(myForm))
  }

  useEffect(() => {
if(borrowbooks&&borrowbooks.success){
  alert.success("Book Request Send")
}
    dispatch(getBooks())
  }, [dispatch,borrowbooks,borrowbooks.success,alert])


  return (
    <>

      <div className="container">

        <div className="row mt-5 mb-5 justify-content-center">
          {
              books && books.length===0?(
                <h3 className="text-center">There are no Books in Library</h3>


              )
            :books.map((resp) => (
              <div className="col-lg-4 col-sm-6">
                <div className="book-box">
                  <h4 className="book-title">Book Name : <span>{resp.name}</span></h4>
                  <p className="book-author">Author : <span>{resp.author}</span></p>
                  <p className="book-status">Status : <span className={resp.status === "Not-Avaliable" ? "red" : "green"}>{resp.status}</span></p>
                  <button className="btn btn-link mt-2 mb-2" disabled={resp.status === "Not-Avaliable" ? true : false} onClick={(e) => borrowBooksRequest(resp.name, resp._id)}>Request to Borrow</button>
                </div>
              </div>
            ))
          }

        </div>
      </div>




    </>
  )
}

export default AllBooks