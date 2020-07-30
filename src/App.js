import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar'
import BookStoreContainer from './Components/BookStoreContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/SearchBar';
import { Route, Switch } from 'react-router-dom';
import LogInForm from './Components/LogInForm';
import MyPageContainer from './Components/MyPageContainer';
import Footer from './Components/Footer'


class App extends Component {
  state = { 
    loggedIn: false,
    rubyBooks: [], 
    jsBooks: [],
    reactBooks: [],
    cssBooks: [],
    reduxBooks: [],
    books: [],
    filter: "",
    currentUser: {},
    usersArray: [],
    user_book_added: false,
    currentUserUserBooks: [],
    myPage: false,
    ascending: false 
   }

   sortBooksFunction () {

   }

   onMyPageClick = () => {
     this.setState({
       myPage: true 
     })
   }

   onBookStoreClick = () => {
     this.setState({
       myPage: false 
     })
   }

    onLogOut = () => {
     this.setState({
       currentUser: {},
       loggedIn: false,
       currentUserUserBooks: []
     })
    }
    
    // Intended for use with a feature of the application that has since been removed, maintained for possible different usage in expanding the functionality of the app
    onDeleteUserBook = () => {
      fetch(`http://localhost:3001/api/v1/users/${this.state.currentUser.id}`)
      .then(r => r.json())
      .then(user => this.setState({
        currentUserUserBooks: user.user_books
      }))
    }
   
    //the name here is confusing but i do not want to change it everywhere 7 seconds before submit;
    //the utility here changes the status of user_book_added, so that a new user's my page will not remain blocked from nav, also serves to set state's currentUserUserBooks for later passing
    addUserBookToBookAdded = () =>  {
    fetch(`http://localhost:3001/api/v1/users/${this.state.currentUser.id}`)
      .then(r => r.json())
      .then(user => this.setState({
     
     user_book_added: true,
     currentUserUserBooks: [user.user_books]
     })
    )}

   setCurrentUser = (user) => {
     this.setState({
       currentUser: user,
       loggedIn: true 
     })
   }

   handleChange = (event) => {
     this.setState({
       [event.target.name]: event.target.value
     })
    }

    filterFunc = () => {
      let booksSearched = [...this.state.books].sort()
      return booksSearched.filter((book) => book.title.toLowerCase().includes(this.state.filter.toLowerCase()))
    }


    
    fetchBooks = () => {
      fetch('http://localhost:3001/api/v1/books')
     .then(r => r.json())
     .then(books => {
       this.setState({
         rubyBooks: books[0].books,
         jsBooks: books[1].books,
         reactBooks: books[2].books,
         cssBooks: books[3].books,
         reduxBooks: books[4].books,
         books: [...books[0].books, ...books[1].books, ...books[2].books, ...books[3].books, ...books[4].books],
         currentBook: {},
         currentUser: {}
       })
     })
    }

    fetchUsers = () => {
      fetch("http://localhost:3001/api/v1/users")
      .then(r => r.json())
      .then(users => this.setState({
        usersArray: users
      }))
    }
    // the || [] is necessary to prevent a new users user page from firing an error for an undefined prop
    fetchUserBooksForCurrentUser = () => {
      console.log('in fetch for userbooks/currentuser', this.state.currentUser.id)
      fetch(`http://localhost:3001/api/v1/users/${this.state.currentUser.id}`)
      .then(r => r.json())
      .then(user => {this.setState({
        currentUserUserBooks: (user.user_books || [])
      })
    })
    }

   

    libStatus = () => {
     if (this.state.currentUserUserBooks === undefined) {
       this.setState({
         user_book_added: false 
       })
     } else {
       this.setState({user_book_added: true})
     }
    }

    componentDidMount(){
     this.fetchBooks()
     this.fetchUsers()
    }

   componentDidUpdate(prevProps, prevState){
     if (prevState.currentUser !== this.state.currentUser){
     this.fetchUserBooksForCurrentUser()
     this.libStatus()
    }}

  render() { 
    console.log(this.props)
    return ( 
     <>
        <NavBar onMyPageClick={this.onMyPageClick} onBookStoreClick={this.onBookStoreClick} myPage={this.state.myPage} logout={this.onLogOut} loggedIn={this.state.loggedIn} handleChange={this.handleChange} filter={this.state.filter} {...this.state.currentUser} bookAdded={this.state.user_book_added}/>
        {/* <SearchBar /> */}
        <Switch>
          {/* <Route exact path='/books/isbn' render={(routerProps) => } */}
            
            <Route exact path='/bookstore' render={(routerProps) => 
            <BookStoreContainer fetchUsers={this.fetchUsers} addBook={this.addUserBookToBookAdded}fetchUB={this.fetchUserBooksForCurrentUser}books={this.filterFunc()} {...routerProps} currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} />}/>
            <Route path='/users/profilepage' render={(routerProps) => 
            <MyPageContainer onFav={this.fetchUserBooksForCurrentUser} onDelete={this.onDeleteUserBook} userBooks={this.state.currentUserUserBooks} currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} {...routerProps} userbooksArray={this.state.currentUserUserBooks}/> }/>
            <Route exact path='/login' render={(routerProps) => 
            <LogInForm {...routerProps} setCurrentUser={this.setCurrentUser} users={this.state.usersArray}/>}/>
          

        </Switch> 
        <Footer/>
      </>
    
     );
  }
}
 
export default App;