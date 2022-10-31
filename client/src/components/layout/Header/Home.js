import React from 'react'
import '../../../css/home.css'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <>
    
    <div className="container">
        <div className="row">
                <div className="col-lg-12 mt-5 mb-5 text-center">                 
                       <h1>Library Managment System</h1>                                         
                </div>

                <div className="col-lg-12 text-center">                 
                       <Link to="/allbooks" className="btn btn-link">See All Books</Link>                                         
                </div>
        </div>

      
    </div>
    
    
    
    </>
  )
}

export default Home