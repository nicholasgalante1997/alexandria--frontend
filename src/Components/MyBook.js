import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class MyBook extends Component {
    state = { 
        backSide: false,
        moreInfo: {},
        myUserBook: {},
        favorite: false
     }

     componentDidMount(){
         this.setMyUserBook()
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

    findMyBook = () => {
      return [...this.props.currentUser.user_books].find(user_book => (user_book.isbn13 === this.props.isbn13))
    }

    setMyUserBook = () => {
       const userbook = this.findMyBook()
       this.setState({
           myUserBook: userbook,
           favorite: userbook.been_read
       })
    }

    toggleFavorite = () => {
        fetch(`http://localhost:3001/api/v1/user_books/${this.state.myUserBook.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                been_read: !this.state.myUserBook.been_read
            })
        })
        .then(r => r.json())
        .then(user_book => this.setState(prevState => {
            return {
                myUserBook: user_book,
                favorite: !prevState.favorite
            }
        }));
        
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
                { this.state.favorite ? <button onClick={this.toggleFavorite}>UnFavorite 💔</button> : <button onClick={this.toggleFavorite}>Favorite 💖</button> }
                </div>
                
            
             </Col>
         )
    }


    render() { 
        console.log(this.props, this.state)
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