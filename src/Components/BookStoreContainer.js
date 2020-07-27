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
        return ( 
            
                <Container fluid className="bookshelf">
                    <Row>
                        {this.props.books.map((book) => <Book {...book} onClick={console.log()}/>)}
                </Row>
               </Container>
       
         );
    }
}
 
export default BookStoreContainer;