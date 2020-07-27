import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const NavBar = (props) => {
    return (
        <div className="nav-bar">
            <Navbar>
                <Navbar.Brand><h2 className="nav-item">Alexandria</h2></Navbar.Brand>
                    <Nav>
                    <Nav.Link href='/bookstore'> <p className="nav-item">GetBooks</p></Nav.Link>
                    <Nav.Link href="/"> <p className="nav-item">SignIn/SignUp</p></Nav.Link>
                    <Nav.Link href="/userpage"><p className="nav-item">My Page</p></Nav.Link>
                    </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;