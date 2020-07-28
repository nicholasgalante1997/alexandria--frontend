import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar'
import BookStoreContainer from './Components/BookStoreContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/SearchBar';
import { Route, Switch } from 'react-router-dom';
import LogInForm from './Components/LogInForm';

class App extends Component {
  state = { 
    rubyBooks: [], 
    jsBooks: [],
    reactBooks: [],
    cssBooks: [],
    reduxBooks: [],
    books: [],
    filter: "",
    currentUser: {}
   }

   setCurrentUser = (user) => {
     this.setState({
       currentUser: user 
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


   componentDidMount(){
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

   

  render() { 
    console.log(this.state.currentUser)
    return ( 
     <>
        <NavBar/>
        <SearchBar handleChange={this.handleChange} filter={this.state.filter} />
        <Switch>
          {/* <Route exact path='/books/isbn' render={(routerProps) => } */}
          <Route exact path='/bookstore' render={(routerProps) => 
          <BookStoreContainer books={this.filterFunc()} {...routerProps}/>}/>
          <Route exact path='/login' render={(routerProps) => 
          <LogInForm {...routerProps} setCurrentUser={this.setCurrentUser}/>}/>
          {/* <Route exact path='/users/:id' render={(routerProps) => "" /> */}

        </Switch> 
      </>
    
     );
  }
}
 
export default App;