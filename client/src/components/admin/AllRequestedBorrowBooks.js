import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Metadata";
import SideBar from "./Sidebar";
import { getBooksByAdmin } from "../../actions/bookAction";
import { updateRequest } from "../../actions/userAction";
import { CLEAR_ERRORS } from "../../constants/bookConstants";
import { UPDATE_USER_RESET } from '../../constants/userConstant'

const AllRequestedBorrowBooks = () => {
  const dispatch = useDispatch();
  const { error, bookdetails } = useSelector((state) => state.allBooksGetByAdmin.books);
  // const {request} = bookdetails


  const { isUpdated } = useSelector((state) => state.bookIssued);

  const issuedBooks = (id, newId) => {
    const myForm = new FormData()
    myForm.set("request", "issued")
    dispatch(updateRequest(id, newId, myForm))
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_ERRORS());
    }
    if (isUpdated) {
      alert("Book Issued Successfull")
      dispatch({ type: UPDATE_USER_RESET })
    }

    dispatch(getBooksByAdmin());
  }, [dispatch, alert, isUpdated]);


  return (
    <>
      <MetaData title={`ALL REQUESTED BOOKS - Admin`} />
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar />
          <div className="container">

            <div className="body-content">


              <div className="row">
                <div className="col-lg-12">
                  <h3>Request For Borrow Books</h3>
                </div>
              </div>



              <div className="row mt-3">
                <div className="col-lg-12">

                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#id</th>
                          <th scope="col">Book Name</th>
                          <th scope="col">Book Id</th>
                          <th scope="col">User Id</th>
                          <th scope="col">Request</th>
                          <th scope="col">Action</th>


                        </tr>
                      </thead>
                      <tbody>
                        {
                          bookdetails && bookdetails.map(res =>
                            <tr>
                              <td>{res._id}</td>
                              <td>{res.bookname}</td>
                              <td>{res.bookId}</td>
                              <td>{res.user}</td>
                              <td>{res.request}</td>
                              <td><button className={res.request === "issued" ? "btn btn-accepted btn-sm" : "btn btn-accepted btn-sm"} disabled={res.request === "issued" ? true : false} onClick={(e) => issuedBooks(res.bookId, res._id)}>{res.request === "issued" ? "Accepted" : res.request}</button></td>
                            </tr>
                          )
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>

    </>
  )
}

export default AllRequestedBorrowBooks