import React, { Component } from 'react';
import Book from './Book';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'


class BookStoreContainer extends Component {
    state = { 
    }

    render() { 
        console.log(this.props.currentUser)
        return ( 
            
                <Container fluid className="bookshelf">
                    <br></br>
                    <h2 className="bookshelf-title">Welcome to Your Online Bookstore!</h2>
                    <Row>
                        {this.props.books.map((book) => <Book {...book} currentUser={this.props.currentUser} loggedIn={this.props.loggedIn}/>)}
                </Row>
               </Container>
       
         );
    }
}
 
export default BookStoreContainer;