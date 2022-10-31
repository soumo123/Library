import React,{useRef,useState,useEffect} from 'react'
import '../../css/authentication.css'
import {Link,useLocation} from 'react-router-dom'
import {login,register,getProclearErrors} from '../../actions/userAction'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/Loader'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Authentication = () => {

const dispatch = useDispatch()
const {error,loading,isAuthenticated,isRegistered} = useSelector((state)=>state.user)


const navigate = useNavigate()
const loginTab = useRef(null)
const registerTab = useRef(null)
const switcherTab = useRef(null)

const[loginEmail,setLoginEmail] = useState("")
const[loginPassword,setLoginPassword] = useState("")

const[user,setUser] = useState({
  name:"",username:"",phone:"",email:"",password:""
})

const { name,username,phone,email,password} = user


const loginSubmit = (e)=>{
  e.preventDefault()
  dispatch(login(loginEmail,loginPassword))
}


const registerSubmit = (e)=>{
  e.preventDefault();

  const myForm = new FormData()
  myForm.set("name",name);
  myForm.set("username",username);
  myForm.set("phone",phone);
  myForm.set("email",email);
  myForm.set("password",password);

  dispatch(register(myForm));
 

}

const registerDataChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  
}


useEffect(() => {
  if(!user){
    toast.error("Invalid Credentials")
    dispatch(getProclearErrors())
  }
  if(isAuthenticated){
    toast.success("Login Succesfull ");
    setInterval(() => {
      window.location.reload();
    }, 2000);
    navigate('/')
  }
  if(isRegistered){
    toast.success("Registration Succesfull ");
    navigate('/login')
  }

  }, [dispatch,toast,isAuthenticated,navigate,user,isRegistered])
  



const switchTabs = (e,tab)=>{
  if (tab === "login") {
    switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");

    registerTab.current.classList.remove("shiftToNeutralForm");
    loginTab.current.classList.remove("shiftToLeft");
  }
  if (tab === "register") {
    switcherTab.current.classList.add("shiftToRight");
    switcherTab.current.classList.remove("shiftToNeutral");

    registerTab.current.classList.add("shiftToNeutralForm");
    loginTab.current.classList.add("shiftToLeft");
  }
}

  return (
   <>
   {
     loading ?( <Loader /> ):(
      
     <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input className="form-control inputtext"
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                <i className="fa fa-lock" aria-hidden="true"></i>

                  <input className="form-control inputtext"
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                
                <input type="submit" value="Login" className="btn btn-link" />
              </form>
              

              <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover />
              
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="User name"
                    required
                    name="username"
                    value={username}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                <i className="fa fa-user" aria-hidden="true"></i>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    name="phone"
                    value={phone}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                  <input className="form-control inputtext"
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="btn btn-link" />
              </form>
            </div>
          </div>

          
     )}
    
    
   </>
  )
}

export default Authentication