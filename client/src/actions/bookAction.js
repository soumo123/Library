import axios from 'axios'
import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
    NEW_BOOK_REQUEST,
    NEW_BOOK_SUCCESS,
    NEW_BOOK_FAIL,
    ADMIN_BOOK_REQUEST,
    ADMIN_BOOK_SUCCESS,
    ADMIN_BOOK_FAIL,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    CLEAR_ERRORS,
    BORROW_BOOK_REQUEST,
    BORROW_BOOK_SUCCESS,
    BORROW_BOOK_FAIL,
    GET_BOOK_REQUEST,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAIL,
    GET_BOOK_ADMIN_REQUEST,
    GET_BOOK_ADMIN_SUCCESS,
    GET_BOOK_ADMIN_FAIL,
    LIBRARY_TRANSACTION_REQUEST,
    LIBRARY_TRANSACTION_SUCCESS,
    LIBRARY_TRANSACTION_FAIL,

} from '../constants/bookConstants'
import { ADMIN_RETURN_BOOK_FAIL, ADMIN_RETURN_BOOK_REQUEST, ADMIN_RETURN_BOOK_SUCCESS } from '../constants/userConstant'
//to gett all products//
export const getBooks = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_BOOK_REQUEST })
            const link = `http://localhost:8000/api/soummya/books`
            const { data } = await axios.get(link)
            dispatch({ type: ALL_BOOK_SUCCESS, payload: data })
        }


    catch (error) {
        dispatch({
            type: ALL_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

//create product by admin
export const addBook = (bookData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: NEW_BOOK_REQUEST })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:8000/api/soummya/admin/book/new/${token}`,bookData,config)
       
        dispatch({ type: NEW_BOOK_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: NEW_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}





//get books by admin
export const getAdminBooks = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({type:ADMIN_BOOK_REQUEST})
        const {data} = await axios.get(`http://localhost:8000/api/soummya/admin/book/${token}`)
        dispatch({type:ADMIN_BOOK_SUCCESS,payload:data.books})

    } catch (error) {
        dispatch({
            type: ADMIN_BOOK_FAIL,
            payload: error.response.data.message
        })
    }

}




// //delete product by admin

export const deleteBook = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: DELETE_BOOK_REQUEST })
        const { data } = await axios.delete(`http://localhost:8000/api/soummya/admin/book/${id}/${token}`)
      
        dispatch({ type: DELETE_BOOK_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({
            type: DELETE_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}


//borrowbooks by user////////////////////////////////

export const borrowBook = (booksdata) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: BORROW_BOOK_REQUEST })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:8000/api/soummya/books/borrow/request/${token}`,booksdata,config)
       
        dispatch({ type: BORROW_BOOK_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: BORROW_BOOK_FAIL,
            payload: error.response.data
        })
    }
}


//get all requested books///


export const getRequestedBooks = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({type:GET_BOOK_REQUEST})
        const {data} = await axios.get(`http://localhost:8000/api/soummya/books/borrowbooks/${token}`)
        dispatch({type:GET_BOOK_SUCCESS,payload:data})

    } catch (error) {
        dispatch({
            type: GET_BOOK_FAIL,
            payload: error.response.data.message
        })
    }

}

//get all requestd borrow books by admin//


export const getBooksByAdmin = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({type:GET_BOOK_ADMIN_REQUEST})
        const {data} = await axios.get(`http://localhost:8000/api/soummya/admin/books/${token}`)
        dispatch({type:GET_BOOK_ADMIN_SUCCESS,payload:data})

    } catch (error) {
        dispatch({
            type: GET_BOOK_ADMIN_FAIL,
            payload: error.response.data.message
        })
    }

}




///get all transaction books by admin///


export const transactionBooksByAdmin = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({type:LIBRARY_TRANSACTION_REQUEST})
        const {data} = await axios.get(`http://localhost:8000/api/soummya/admin/issuedbooks/${token}`)
        dispatch({type:LIBRARY_TRANSACTION_SUCCESS,payload:data})

    } catch (error) {
        dispatch({
            type: LIBRARY_TRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }

}



//get all return request books////////////////////////////////////////////////////////////////

export const allReturnBooksByAdmin = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({type:ADMIN_RETURN_BOOK_REQUEST})
        const {data} = await axios.get(`http://localhost:8000/api/soummya/admin/return/books/${token}`)
        dispatch({type:ADMIN_RETURN_BOOK_SUCCESS,payload:data})

    } catch (error) {
        dispatch({
            type: ADMIN_RETURN_BOOK_FAIL,
            payload: error.response.data.message
        })
    }

}











//CLEAR ERRORS//
export const getProclearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}