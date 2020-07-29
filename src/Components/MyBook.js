import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class MyBook extends Component {
    state = { 
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
        // console.log(this.state.moreInfo)
        )
        
        }
    }
    renderFront = () => {
        return (<Col md={3}>
              <img className='book' src={this.props.image} />
              <p>{this.props.title}</p>
              <button onClick={this.handleClick}name='info'>MoreInfo</button>
          </Col>)
    }

    addToFavorites = () => {
        fetch(`http://localhost:3001/api/v1/user_books/`)
    }

    renderBack = () => {
        return (
            
            <Col md={3} >
                
                <img src={this.props.image}/>
                <div className="book-backside">
                <h3>{this.state.moreInfo.title}</h3>
                <p>{this.state.moreInfo.authors}</p>           
                <small>{this.state.moreInfo.desc}</small>
                <ul>
                    <li><a href={this.state.moreInfo.url}>Book Link</a></li>
                </ul>
                <br></br>
                <button onClick={this.handleClick} name='info'>LessInfo</button>
                {/* <button onClick={this.addToLibrary} name="add-to-lib">Add To My Library</button> */}
                </div>
                
            
             </Col>
         )
    }


    render() { 
        console.log(this.props)
        return ( 
            (
                (this.state.backSide 
                    ? this.renderBack() : this.renderFront()
                )
                )
         );
    }
}
 
export default MyBook;