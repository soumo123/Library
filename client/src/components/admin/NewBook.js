import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { addBook, getProclearErrors } from '../../actions/bookAction'
import { NEW_BOOK_RESET } from '../../constants/bookConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Metadata from '../layout/Metadata'


const NewBook = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, success, error } = useSelector((state) => state.newBook)

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [status, setStatus] = useState("")

    const bookStatus = [
        "Avaliable",
        "Not-Avaliable"
    ]

    useEffect(() => {
        if (error) {
            toast.error("Ooops !!! Book Already Present ")
            // dispatch(getProclearErrors())
            dispatch({ type: NEW_BOOK_RESET })
            navigate("/allbooks")
        }
        if (success) {
            toast.success("Book Added Successfully")
            dispatch({ type: NEW_BOOK_RESET })
            navigate("/allbooks")

        }

    }, [dispatch, alert, navigate, toast, success, error])



    const createBookSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("author", author)
        myForm.set("status", status)
        dispatch(addBook(myForm))
    }
    return (
        <>
                  <Metadata title={`ADD BOOKS`} />
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <Sidebar />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="body-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h3>Add New Book</h3>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-lg-12">
                                    <form className="form"
                                        encType="multipart/form-data"
                                        onSubmit={createBookSubmitHandler}
                                    >
                                        <div className="row">

                                            <div className="col-sm-4 ">
                                                <div className="mb-3">
                                                    <label className="form-label">Book Name</label>

                                                    <input
                                                        type="text" className="form-control inputtext"
                                                        placeholder="Book Name"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4 ">
                                                <div className="mb-3">
                                                    <label className="form-label">Book Author</label>

                                                    <input
                                                        type="string" className="form-control inputtext"
                                                        placeholder="Book Author"
                                                        required
                                                        value={author}
                                                        onChange={(e) => setAuthor(e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-sm-4 ">
                                                <div className="mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select className="form-control inputtext" onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="">Choose Status</option>
                                                        {
                                                            bookStatus.map((sta) => (
                                                                <option key={sta} value={sta}>{sta}</option>
                                                            ))
                                                        }

                                                    </select>

                                                </div>
                                            </div>
                                            <div className="col-sm-12 mb-3">
                                               
                                                    <input
                                                        type="submit"
                                                        value="Continue"
                                                        className="btn btn-link"
                                                        disabled={loading ? true : false}
                                                    />
                                               
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                />
            </div>

        </>
    )
}

export default NewBook