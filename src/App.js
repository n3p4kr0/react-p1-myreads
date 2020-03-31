import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './utils/BooksAPI.js'
import { Link, Route } from 'react-router-dom';
import Home from './Home.js';
import Search from './Search.js';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class App extends Component {
  state = {
    bookshelfs: [
      { id: "currentlyReading", name: "Currently Reading" },
      { id: "wantToRead", name: "Want to read" },
      { id: "read", name: "Read" }
    ],
    books: [],
    isLoaded: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((result) => {
        this.setState(() => ({
          books: result,
          isLoaded: true
        }));
      })
  }

  handleChangeBookshelf = (bookId, newBookshelf) => {
    var stateCopy = Object.assign({}, this.state);

    if(stateCopy.books.filter( (book) => { return book.id === bookId } ).length === 0) {
      var newBook = {};
      
      BooksAPI.get(bookId)
      .then((result) => {
        newBook = result;
      });

      stateCopy[stateCopy.length -1] = newBook;
    }

    stateCopy.books.map( (book) => {
      if(book.id === bookId) {
        book.shelf = newBookshelf;
      }
      return true;
    });

    this.setState(stateCopy);

    BooksAPI.update({ id: bookId }, newBookshelf)
      .then((response) => {
        console.log(response);
        console.log("Updated !");
      });

    this.forceUpdate();
  }

  render() {
    if(this.state.isLoaded) {
      return (
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h3">
                MyReads
              </Typography>
            </Toolbar>
          </AppBar>
          <Route exact path='/' render={() => (
            <div className="home">
              <Home books={this.state.books} bookshelfs={this.state.bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} />
              <Link to="/search">Go to Search</Link>
            </div>
          )} />
          <Route exact path='/search' render={() => (
            <div className="search">
              <Search bookshelfs={this.state.bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} books={this.state.books} />
              <p>Search page : <Link to="/">Return to home</Link></p>
            </div>
          )} />
        </div>
      )
    }
    return (<p>"Loading"</p>);
  }
}

export default App;
