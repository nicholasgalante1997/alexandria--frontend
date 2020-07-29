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
    usersArray: []
   }

   onLogOut = () => {
     this.setState({
       currentUser: {},
       loggedIn: false 
     })
   }

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
      return [...this.state.books].filter((book) => book.title.toLowerCase().includes(this.state.filter.toLowerCase()))
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

   componentDidMount(){
     this.fetchBooks()
     this.fetchUsers()
   }


  render() { 
    console.log(this.state.currentUser, this.state.loggedIn)
    return ( 
     <>
        <NavBar logout={this.onLogOut} loggedIn={this.state.loggedIn} handleChange={this.handleChange} filter={this.state.filter} {...this.state.currentUser}/>
        {/* <SearchBar /> */}
        <Switch>
          {/* <Route exact path='/books/isbn' render={(routerProps) => } */}
          
            <Route exact path='/bookstore' render={(routerProps) => 
            <BookStoreContainer books={this.filterFunc()} {...routerProps} currentUser={this.state.currentUser} loggedIn={this.state.loggedIn}/>}/>
            <Route path='/users/profilepage' render={(routerProps) => 
            <MyPageContainer currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} {...routerProps} />}/>
            <Route exact path='/login' render={(routerProps) => 
            <LogInForm {...routerProps} setCurrentUser={this.setCurrentUser} users={this.state.usersArray}/>}/>
          

        </Switch> 
        <Footer/>
      </>
    
     );
  }
}
 
export default App;