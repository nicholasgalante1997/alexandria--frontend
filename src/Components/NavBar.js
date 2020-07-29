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
                <Navbar.Brand><h2 className="nav-item">Alexandria</h2></Navbar.Brand>
                    <Nav>
                    <NavLink to='/bookstore'> <p className="nav-item">GetBooks</p></NavLink>
                    {  props.loggedIn ? <Nav> <p className="nav-item">Welcome {props.username}</p></Nav> : <NavLink to="/login"> <p className="nav-item">SignIn/SignUp</p></NavLink>}
                    { props.loggedIn ? <NavLink to="/users/profilepage"><p className="nav-item">My Page</p></NavLink> : null }
                    <NavLink to="/login"> <p onClick={props.logout} className="nav-item">Log Out</p></NavLink>
                    </Nav>
                    <SearchBar {...props}/>
                    
                    
                    {/* <div className="search-bar">
                    <label>Search Books</label>
                    <input onChange={props.handleChange} type='text' name='filter' value={props.filter}/>
                    </div> */}
            </Navbar>
            </Container>
            
        </div>
    )
}

export default NavBar;