import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
// import profileImage from '../../../images/profile.png'
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import UserOptions from './UserOptions';
// import '../../../css/header.css'
// import '../../../Responsive.css'

const Header = () => {

  return (
    <>
<Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/"><h3 className="font-link">Library</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/allbooks">All Books</Nav.Link>
            {/* <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/search">search</Nav.Link> */}
          </Nav>
        <UserOptions/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
      </>
      
  )


};

export default Header;
