import { GET_BOOK_ADMIN_FAIL, GET_BOOK_ADMIN_REQUEST, GET_BOOK_ADMIN_SUCCESS } from '../constants/bookConstants'
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    RETURN_USER_REQUEST,
    RETURN_USER_SUCCESS,
    RETURN_USER_FAIL,
    RETURN_USER_RESET

} from '../constants/userConstant'

export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case  LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
            case REGISTER_USER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isRegistered: true,
                    user: action.payload
                }
            case LOAD_USER_FAIL:
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }


        case LOGOUT_SUCCESS:
            return {
                loading:false,
                user:null,
                isAuthenticated:false
            }

            case LOGOUT_FAIL:
                return {
                   ...state,
                    laoding:false,
                    error:action.payload
                }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                isRegistered:false,
                user: null,
                error: action.payload
            }

    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const allRequestedBooksByAdmin = (state = {books:[]}, action) => {

    switch (action.type) {
        case GET_BOOK_ADMIN_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_BOOK_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload
            }
        case GET_BOOK_ADMIN_FAIL:
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
            return state
    }
}



export const bookIsuedReducer = (state = {}, action) => {

    switch (action.type) {
            case UPDATE_USER_REQUEST:
            return {
                ...state,
                isAuthenticated: false
            }
        case  UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        
        
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

        
        default:
            return state
    }
}







export const returnIssuedReducer = (state = {}, action) => {

    switch (action.type) {
            case RETURN_USER_REQUEST:
            return {
                ...state,
                isAuthenticated: false
            }
        case  RETURN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isReturn: action.payload
            }
        
        
        case RETURN_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RETURN_USER_RESET:
            return {
                ...state,
                isUpdate: false
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

        
        default:
            return state
    }
}