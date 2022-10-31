import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
    NEW_BOOK_REQUEST,
    NEW_BOOK_SUCCESS,
    NEW_BOOK_FAIL,
    NEW_BOOK_RESET,
    ADMIN_BOOK_REQUEST,
    ADMIN_BOOK_SUCCESS,
    ADMIN_BOOK_FAIL,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    DELETE_BOOK_RESET,
    CLEAR_ERRORS,
    BORROW_BOOK_REQUEST,
    BORROW_BOOK_SUCCESS,
    BORROW_BOOK_FAIL,
    GET_BOOK_REQUEST,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAIL,
    LIBRARY_TRANSACTION_REQUEST,
    LIBRARY_TRANSACTION_SUCCESS,
    LIBRARY_TRANSACTION_FAIL,

} from '../constants/bookConstants'
export const bookReducer = (state = { books: [] }, action) => {

    switch (action.type) {
        case ALL_BOOK_REQUEST:
        case ADMIN_BOOK_REQUEST:
            return {
                loading: true,
                books: []
            }
        case ALL_BOOK_SUCCESS:
            return {
                loading: false,
                books: action.payload.books
            }
        case ADMIN_BOOK_SUCCESS:
            return {
                loading: false,
                books: action.payload
            }

        case ALL_BOOK_FAIL:
        case ADMIN_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}

export const newBookReducer = (state = { books: {} }, action) => {

    switch (action.type) {
        case NEW_BOOK_REQUEST:
            return {
                loading: true,
                ...state
            }
        case NEW_BOOK_SUCCESS:
            return {
                loading: false,
                product: action.payload.books,
                success: action.payload.success
            }
        case NEW_BOOK_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: false
            }
        case NEW_BOOK_FAIL:
            return {
                loading: false,
                error: true
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}

export const deleteBookAdminReducer = (state = {}, action) => {

    switch (action.type) {

        case DELETE_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_BOOK_RESET:
            return {
                ...state,
                isDeleted: false
            }


        case DELETE_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }
        default:
            return state;


    }



}

export const borrowBookReducer = (state = { borrowbooks: {} }, action) => {

    switch (action.type) {

        case BORROW_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BORROW_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                borrowbooks:action.payload
            }

        case BORROW_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }
        default:
            return state;


    }



}


export const requestedBooks = (state = { reqbooks: [] }, action) => {

    switch (action.type) {
        case GET_BOOK_REQUEST:
            return {
                loading: true,  
                reqbooks: []
            }
        case GET_BOOK_SUCCESS:
            return {
                loading: false,
                reqbooks: action.payload.books
            }
  
        case GET_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}



export const transactionBooks = (state = { books: [] }, action) => {

    switch (action.type) {
        case LIBRARY_TRANSACTION_REQUEST:
            return {
                loading: true,  
                books: []
            }
        case LIBRARY_TRANSACTION_SUCCESS:
            return {
                loading: false,
                books: action.payload.todayIssuedBooks
            }
  
        case LIBRARY_TRANSACTION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}