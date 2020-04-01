import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './utils/BooksAPI.js'
import { Route } from 'react-router-dom';
import Home from './Home.js';
import Search from './Search.js';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';

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

  /**
   * When the app is launched, tries to load the user's book from the API
   */
  componentDidMount() {
    BooksAPI.getAll()
    .then((result) => {
      this.setState(() => ({
        books: result,
        isLoaded: true
      }));
    })
  }

  /**
   * When a book is moved to a shelf, this handler function is called
   */
  handleChangeBookshelf = (changedBook, newBookshelf) => {
    // Adds the shelf to the book
    changedBook.shelf = newBookshelf;

    // Updates the API
    BooksAPI.update({ id: changedBook.id }, newBookshelf)
    .then((response) => {
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));
    });

    this.forceUpdate();
  }

  render() {
    const { books, bookshelfs } = this.state;

    // The app only renders when the books have been loaded from the API
    if(this.state.isLoaded) {
      return (
        <div className="App">
          <AppBar className="app-header" position="static">
            <Toolbar>
              <Typography variant="h3">
                MyReads
              </Typography>
            </Toolbar>
          </AppBar>
          <Route exact path='/' render={() => (
            <div className="home">
              <Home books={books} bookshelfs={bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} />
            </div>
          )} />
          <Route exact path='/search' render={() => (
            <div className="search">
              <Search books={books} bookshelfs={bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} />
            </div>
          )} />
        </div>
      )
    }
    // Shows a spin loader while the book infos have not been retrieved from the API
    return (<div className="loading"><Loader type="Circles" color="#57D312" height={80} width={80}/></div>);
  }
}

export default App;
