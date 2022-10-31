import React, { useEffect } from 'react'
import { getRequestedBooks } from '../../actions/bookAction'
import { useSelector, useDispatch } from 'react-redux'
import { returnBook } from '../../actions/userAction'
import { RETURN_USER_RESET } from '../../constants/userConstant'

const RequstedBooks = () => {

  const dispatch = useDispatch()
  const { reqbooks } = useSelector((state) => state.requestedBook)
  const { success } = useSelector((state) => state.returnBook)


  const returnbook = (bookname, bookId,user) => {
    const myForm = new FormData()
    myForm.set("bookname",bookname)
    myForm.set("bookId",bookId)
    myForm.set("request", "issued")
    myForm.set("isreturn","pending")
    myForm.set("user",user)
    dispatch(returnBook(myForm))
    alert("Book FReturn Request Send")

  }
  useEffect(() => {
    if (success) {
      dispatch({ type: RETURN_USER_RESET })
    }

    dispatch(getRequestedBooks())

  }, [dispatch, success])

  return (
    <>
      <h1 className="text-center">Requested book</h1>
      <div className="container">
        <div className="row mt-5 mb-5 justify-content-center">
          {

            reqbooks.length !== 0 ?

              (reqbooks.map(data =>
                <div className="col-lg-4 col-sm-6">
                  <div className="book-box">
                    <h4 className="book-title">Book Name : <span>{data.bookname}</span></h4>
                    <p className="book-author">Request Status : <span className={data.request === "issued" ? "green" : "red"}>{data.request}</span></p>
                    <p className="book-author">Date Of Request: <span>{data.borroewdAt}</span></p>
                    <button className="btn btn-link mt-2 mb-2" disabled={data.request === "issued" ? false : true} onClick={(e) => returnbook(data.bookname,data.bookId,data.user)}>Return</button>

                  </div>
                </div>)

              ) : <div>
                <h4>No Books are requested</h4>


              </div>

          }
        </div>
      </div>
    </>
  )
}

export default RequstedBooks