import React, { Component } from 'react';
import MyBook from './MyBook'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

class MyPageContainer extends Component {

    state = {
        myBookArray: [],
        comments: [],
        newCommentToggle: false
    }



    componentDidMount(){
        this.getUserBooks()
        this.fetchComments()
        console.log(this.props.currentUser.user_books)
    }

    fetchIndBook = (isbn) => {
        fetch(`http://localhost:3001/api/v1/books/${isbn}`)
        .then(r => r.json())
        .then(book => this.setState(prevState => {
            return {
                myBookArray: [...prevState.myBookArray, book]
            }
        }))
    }

    getUserBooks = () => {
      const isbnArray = [...this.props.userBooks].map(user_book => user_book.isbn13)
      isbnArray.map(isbn => this.fetchIndBook(isbn))
    }

    fetchComments = () => {
        fetch('http://localhost:3001/api/v1/comments')
        .then(r => r.json())
        .then(comments => this.setState({
            comments
        }))
    }

    // filterComments = () => {
    //     return 
    // }

    
   
    render() { 
        console.log(this.state.myBookArray, this.state.comments)
    return (    <div className="bookshelf">
                    <Container>
                        <h2>{this.props.currentUser.username}</h2> 
                         <strong>Book List</strong>
                         <br></br>
                         <Row>{this.state.myBookArray.map(book => <MyBook onDelete={this.props.onDelete} onFav={this.props.onFav} {...book} currentUser={this.props.currentUser} loggedIn={this.props.loggedIn} currentUserBooks={this.props.userBooks} history={this.props.history} comments={this.state.comments}/>)}</Row>
                         
                    </Container>
                         

                </div>
    
    );
    }
}
 
export default MyPageContainer;