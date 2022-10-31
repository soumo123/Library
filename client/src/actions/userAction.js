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
    RETURN_USER_REQUEST,
    RETURN_USER_SUCCESS,
    RETURN_USER_FAIL
} from '../constants/userConstant'


import axios from 'axios'
import { ACCEPT_RETURN_FAIL, ACCEPT_RETURN_REQUEST, ACCEPT_RETURN_SUCCESS } from '../constants/bookConstants'

//login action
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': "application/json",
                // 'Accept':"/"
            },
            withCredentials: true
        }
        const { data } = await axios.post("http://localhost:8000/api/soummya/login", { email, password }, config)
        const profileData = data.user

        localStorage.setItem("token", data.token)
        localStorage.setItem("profile", JSON.stringify(profileData))
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }

}



//registration
export const register = (userData) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }
        const link = 'http://localhost:8000/api/soummya/register'
        const { data } = await axios.post(link, userData, config)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }

}


//Load user

export const loadUser = () => async (dispatch) => {

    try {

        // dispatch({ type: LOAD_USER_REQUEST })
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`http://localhost:8000/api/soummya/me/${token}`)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }

}

export const logout = () => async (dispatch) => {

    try {

        // const token = localStorage.getItem('token')
        await axios.get("http://localhost:8000/api/soummya/logout")

        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message })
    }

}

//issued books //

export const updateRequest = (id,newId,reqdata) => async (dispatch) => {

    try {
        dispatch({ type:  UPDATE_USER_REQUEST })
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:8000/api/soummya/admin/user/${id}/${newId}/${token}`,reqdata , config)
        
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
    }

}


//return book by user////////////////////////////////

export const returnBook = (reqdata) => async (dispatch) => {

    try {
        dispatch({ type:  RETURN_USER_REQUEST })
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.post(`http://localhost:8000/api/soummya/books/returnbooks/${token}`,reqdata , config)
        
        dispatch({ type: RETURN_USER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: RETURN_USER_FAIL, payload: error.response.data.message })
    }

}
//

///accept return book by admin///


export const returnBookAcceptByAdmin = (bookid,id) => async (dispatch) => {

    try {
        dispatch({ type:  ACCEPT_RETURN_REQUEST })
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:8000/api/soummya/admin/returnbooks/accept/${bookid}/${id}/${token}`,config)
        
        dispatch({ type: ACCEPT_RETURN_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: ACCEPT_RETURN_FAIL, payload: error.response.data.message })
    }

}





export const getProclearErrors = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS })
}