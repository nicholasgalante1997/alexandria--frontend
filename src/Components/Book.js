import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Book extends Component {
    
    state={
        isbn13: this.props.isbn13,
        backSide: false,
        moreInfo: {}
    }

    handleClick = () => {
        
        if (this.state.backSide) {

            this.setState(prevState => {
                return {
                    backSide: !prevState.backSide
                }
            })

        } else { 

        fetch(`http://localhost:3001/api/v1/books/${this.props.isbn13}`)
        .then(r => r.json())
        .then(book => this.setState(prevState => 
        {   return {
            moreInfo: book,
            backSide: !prevState.backSide
            }
        }
        ),
        console.log(this.state.moreInfo)
        )
        
        }
    }

    // componentDidMount(){
    //     fetch(`https://api.itbook.store/1.0/books/9781617294136`)
    //     .then(r => r.json())
    //     .then(book => console.log(book))
    // }

    renderFront = () => {
      return (<Col md={3}>
            <img className='book' src={this.props.image} />
            <p>{this.props.title}</p>
            <button onClick={this.handleClick}name='info'>MoreInfo</button>
        </Col>)
    }

    renderBack = () => {
        return ( 
            <Col md={3}>
            <strong>{this.state.moreInfo.title}</strong>
            <small>{this.state.moreInfo.author}</small>
            <small>{this.state.moreInfo.desc}</small>
            <button onClick={this.handleClick}name='info'>LessInfo</button>
        </Col>)
    }
    
    render () {
        // console.log(this.props)
    return (
        (this.state.backSide 
            ? this.renderBack() : this.renderFront()
        )
        )
    }
}

export default Book;