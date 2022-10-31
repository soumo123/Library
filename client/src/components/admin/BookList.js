import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminBooks, getProclearErrors, deleteBook } from '../../actions/bookAction'
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar'
import Metadata from '../layout/Metadata'
import { DELETE_BOOK_RESET } from '../../constants/bookConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, books } = useSelector((state) => state.books)
  const { isDeleted } = useSelector((state) => state.bookAdmin)

  const deleteProductHandler = (id) => {
    dispatch(deleteBook(id))
    // navigate("/admin/dashboard");
    // dispatch({type:DELETE_BOOK_RESET})

  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(getProclearErrors());
    }
    dispatch(getAdminBooks());

    if (isDeleted) {
      toast.success("Book Deleted Succesfully")
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_BOOK_RESET })
    }
  }, [error, alert, dispatch, navigate, isDeleted]);




  const columns = [
    { field: "id", headerName: "#ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "author",
      headerName: "Author",
      type: "text",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  books &&
    books.map((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        author: item.author,
        status: item.status,
      });
    });



  return (
    <>
      <Metadata title={`ALL BOOKS - Admin`} />

      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <Sidebar />
          <div className="body-content">
            <div class="row">
              <div className="col-lg-12">
                <h3>ALL BOOKS</h3>
              </div>



            </div>


            <div class="row mt-3">
              <div class="col-lg-12">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              </div>
            </div>


          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}



      />
    </>
  )
}

export default BookList