import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import '../../css/dashboard.css'
import { useSelector, useDispatch } from 'react-redux'
import Metadata from '../layout/Metadata';
import { transactionBooksByAdmin } from '../../actions/bookAction'



const Dashboard = () => {
  const dispatch = useDispatch()

  const { books } = useSelector((state) => state.transaction)
  useEffect(() => {
    dispatch(transactionBooksByAdmin());

  }, [dispatch]);


  return (

    <>
      <div className="container-fluid display-table">
      <Metadata title={`DASHBOARD`} />

        <div className="row display-table-row mt-5">
          <Sidebar />

          <div>
            <div className="body-content">
              <div className="row">
                <div className="col-lg-12">
                  <h3>All Transaction Books</h3>

                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Book Id</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Transaction Status</th>                  </tr>
                    </thead>
                    <tbody>
                      {
                        books && books.map(res =>
                          <tr>
                            <td>{res.bookname}</td>
                            <td>{res.bookId}</td>
                            <td>{res.user}</td>
                            <td>{res.dueDate && res.dueDate.substring(0, 10)}</td>
                            <td>{res.request}</td>

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
    </>
  )
}

export default Dashboard