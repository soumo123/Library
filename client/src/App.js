import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'
import { BrowserRouter , Routes,Route} from "react-router-dom";
import Authentication from './components/users/Authentication';
import AllBooks from './components/books/AllBooks';
import Home from './components/layout/Header/Home';
import { useSelector, } from 'react-redux';
import Header from './components/layout/Header/Header';
import { loadUser } from './actions/userAction';
import store from './store'
import Dashboard from './components/admin/Dashboard';
import NewBook from './components/admin/NewBook'
import BookList from './components/admin/BookList'
import RequstedBooks from './components/books/RequstedBooks';
import AllRequestedBorrowBooks from './components/admin/AllRequestedBorrowBooks'
import ReturnRequest from './components/admin/ReturnRequest';

function App() {


useEffect(() => {
  store.dispatch(loadUser())
}, [])

const {isAuthenticated,user} = useSelector((state)=>state.user)  


  return (
    <BrowserRouter>
       <Header/>
    <Routes>
     <Route exact path="/login" element={<Authentication/>} />
   
<Route exact path="/" element={<Home/>} />
<Route exact path="/allbooks" element={<AllBooks/>} />
<Route exact path="/books/request" element={<RequstedBooks/>} />

{user?.role === "admin" ?  <Route exact path="/admin/dashboard" element={<Dashboard/>}/> : user?.role ==="user" ? <Route exact path="/admin/dashboard" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
{user?.role === "admin" ?  <Route exact path="/admin/books" element={<BookList/>}/> : user?.role ==="user" ? <Route exact path="/admin/books" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
{user?.role === "admin" ?  <Route exact path="/admin/create" element={<NewBook/>}/> : user?.role ==="user" ? <Route exact path="/admin/dashboard" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
{user?.role === "admin" ?  <Route exact path="/admin/req" element={<AllRequestedBorrowBooks/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}
{user?.role === "admin" ?  <Route exact path="/admin/ret" element={<ReturnRequest/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Home/>}/> : <Route exact path="/admin/dashboard" element={<Home/>}/>}


    </Routes>

</BrowserRouter>
  );
}

export default App;
