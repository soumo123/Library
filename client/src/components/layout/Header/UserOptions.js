import React from 'react'
import '../../../css/user.css'
import { Link } from 'react-router-dom'
import {Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import profileImage from '../../../images/profile.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UserOptions = () => {

  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { reqbooks } = useSelector((state) => state.requestedBook)


  // const { cartItems } = useSelector((state) => state.cart)

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    toast.success("Logout Succesfully ");
    navigate('/allbooks')
    setInterval(() => {
      window.location.reload();
    }, 1000);



  }



  return (


    <Nav className="align-items-center">

      {
        !isAuthenticated ?
          <>
            <Nav.Link>
              <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src={profileImage} />
                </Link>

                <div class="dropdown-menu" aria-labelledby="dropdown">
                    <Link className="dropdown-item" to="/login" >Login</Link>
                </div>
                
              </li> 

            </Nav.Link>
          </>
          : <>
            <Nav.Link>
              <li className="nav-item"> {user?.username}</li>
            </Nav.Link>
            <Nav.Link>
              <li className="nav-item dropdown">
                <Link to="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                 
                </Link>

                {
                  user?.role === "admin" ?

                  <div class="dropdown-menu" aria-labelledby="dropdown">
                      <Link className="dropdown-item" to="/admin/dashboard"><i class="fa fa-tachometer" aria-hidden="true"></i>
                        Dashboard</Link>
                        <p className="dropdown-item" onClick={logout} ><i class="fa fa-sign-out" aria-hidden="true"></i>
                        Logout</p>
                 </div>

                   : 

                   <div class="dropdown-menu" aria-labelledby="dropdown">
                 
                     <p className="dropdown-item" onClick={logout} >
                     Logout</p>
                     
                     <Link className="dropdown-item"to="/books/request">
                     Requested Books</Link><p>{reqbooks&& reqbooks.length}</p>
              </div>
                    
                    
   
                }



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
              </li>
            </Nav.Link></>

      }



    </Nav>


  )
}

export default UserOptions