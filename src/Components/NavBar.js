import React, {Fragment} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import SearchBar from './SearchBar'
import Container from 'react-bootstrap/Container'
import NavLink from 'react-router-dom/NavLink'

const NavBar = (props) => {
    console.log(props)
    return (
        <div className="nav-bar">
            <Container fluid>
                <Navbar>
                    <Navbar.Brand>
                    <h2 className="nav-item">Alexandria</h2>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link><img src='https://static.vecteezy.com/system/resources/previews/000/268/526/original/bookworm-vector.png' className='nav-image'/></Nav.Link>
                    <NavLink to='/bookstore' onClick={props.onBookStoreClick}><p className="nav-item">GetBooks</p></NavLink>
                    {  props.loggedIn ? <Nav> <p className="nav-item">Welcome {props.username}</p></Nav> : <NavLink to="/login"> <p className="nav-item">SignIn/SignUp</p></NavLink>}
                    { props.bookAdded && props.loggedIn ? <NavLink to="/users/profilepage" onClick={props.onMyPageClick}><p className="nav-item">My Page</p></NavLink> : null }
                    <NavLink to="/login"> <p onClick={props.logout} className="nav-item">Log Out</p></NavLink>
                    </Nav>
                    {props.myPage === false && <SearchBar {...props}/>}
            </Navbar>
            </Container>
            
        </div>
    )
}

export default NavBar;