import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "./Sidebar";
import { allReturnBooksByAdmin, getBooksByAdmin } from "../../actions/bookAction";
import { returnBookAcceptByAdmin, updateRequest } from "../../actions/userAction";
import { CLEAR_ERRORS } from "../../constants/bookConstants";
import { UPDATE_USER_RESET } from '../../constants/userConstant'
import {ACCEPT_RETURN_RESET} from '../../constants/bookConstants'


const ReturnRequest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.reurnBooks);


  const { isUpdated } = useSelector((state) => state.bookIssued);

  const issuedBooks = (bookid,id) => {
    dispatch(returnBookAcceptByAdmin(bookid,id))
    dispatch({type:ACCEPT_RETURN_RESET})
    alert("Book Return......")
    navigate("/admin/dashboard")
  }
  useEffect(() => {
 

    dispatch(allReturnBooksByAdmin());
  }, [dispatch]);


  return (
    <>
      <MetaData title={`ALL RETURN REQUEST BOOKS - Admin`} />
      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <SideBar />
          <div className="container">

          <div className="body-content">
            

            <div className="row">
                                    <div className="col-lg-12">
                                        <h3>Return Books Requests</h3>
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
                    <th scope="col">Action</th>


                  </tr>
                </thead>
                <tbody>
                  {
                    books && books.map(res=>
                      <tr>
                      <td>{res._id}</td>
                      <td>{res.bookname}</td>
                      <td>{res.bookId}</td>
                      <td>{res.user}</td>
                      <td>{res.isreturn}</td>
                      <td><button className="btn btn-primary" onClick={()=>issuedBooks(res.bookId,res._id)}>Accept</button></td>
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

export default ReturnRequest