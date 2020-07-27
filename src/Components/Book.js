import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const Book = (props) => {
    console.log(props)
    return (
        <Col md={3}>
            <img className='book' src={props.image} />
            <p>{props.title}</p><button name='info'>MoreInfo</button>
        </Col>
    )
}

export default Book;