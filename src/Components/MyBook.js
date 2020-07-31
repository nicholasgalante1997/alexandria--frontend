import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class MyBook extends Component {
    state = { 
        backSide: false,
        moreInfo: {},
        myUserBook: {},
        favorite: false,
        commentBar: false,
        comment: "",
        commentToggle: false,
        newCommentsToRender: [] 
     }

     componentDidMount(){
         this.setMyUserBook()
     }

    //  componentDidUpdate(prevProps ,prevState){
    //     this.setMyUserBook()
    //  }

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

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    

    findMyBook = () => {
      return [...this.props.currentUserBooks].find(user_book => (user_book.isbn13 === this.props.isbn13))
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
        .then(user_book => {
            this.setState(prevState => {
            return {
                myUserBook: user_book,
                favorite: !prevState.favorite
            }
        })
        this.props.onFav()
    });
        
    }
    // method below became unnecessary as the intention is to keep track of books you have read and you can't unread a book, made more sense to utilize a toggle favorite instead
    // removeFromLibrary = () => {
    //     fetch(`http://localhost:3001/api/v1/user_books/${this.state.myUserBook.id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         }
    //     })
    //     .then(r => r.json())
    //     .then(empty => alert('item has been removed from your library'))
    //     this.props.onDelete()
    //     this.setState({

    //     })
    // }

    toggleCommentBar = () => this.setState(prevState => {
     return {
        commentBar: !prevState.commentBar
    }
})

    handleCommentSubmit = (event) => {
        event.preventDefault() 
        fetch('http://localhost:3001/api/v1/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_book_id: this.state.myUserBook.id,
                text: this.state.comment 
            })
        })
        .then(r => r.json())
        .then(comment => this.setState(prevState => {
          return  {
            comment: "",
            commentBar: false,
            newCommentsToRender: [...prevState.newCommentsToRender, comment]
        }
    }))
    }

    renderFront = () => {
        console.log(this.props, this.state)
        return (<Col md={3}>
              <img className='book' src={this.props.image} />
              <p>{this.props.title}</p>
              <button onClick={this.handleClick}name='info'>MoreInfo</button>
          </Col>)
    }

    filterForMyComment = () => {
        let myComments = [...this.props.comments].filter(comment => comment.user_book_id === this.state.myUserBook.id )
        return myComments
    }
    
    renderBack = () => {
        let comments = this.filterForMyComment()
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
                <ul>
                    <strong>Comments:</strong>
                    {comments.map(comment => <li>{comment.text}</li>)}
                    {this.state.newCommentsToRender.map(comment => <li>{comment.text}</li>)}
                </ul>
                <br></br>
                <button onClick={this.handleClick} name='info'>LessInfo</button>
                { this.state.favorite ? <button onClick={this.toggleFavorite}>UnFavorite 💔</button> : <button onClick={this.toggleFavorite}>Favorite 💖</button> }
                {/* <button onClick={this.removeFromLibrary}>Remove me from library :(</button> */}
                <br></br>
                
                { this.state.commentBar
                ? 
                <>
                <button onClick={this.toggleCommentBar}>Remove Comment Bar</button> 
                <form name='comment' onSubmit={this.handleCommentSubmit} >
                <label>Comment</label>
                <input onChange={this.handleInput} type='text' name='comment' value={this.state.comment}/> 
                <button type='submit'>Submit</button>
                </form>
                </>
                : 
                <button onClick={this.toggleCommentBar}>Add a Comment</button> }
                
                </div>
                
            
             </Col>
         )
    }


    render() { 
        console.log(this.props, this.state)
        console.log(this.filterForMyComment())
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