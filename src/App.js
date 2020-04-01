import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './utils/BooksAPI.js'
import { Link, Route } from 'react-router-dom';
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

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    BooksAPI.getAll()
    .then((result) => {
      this.setState(() => ({
        books: result,
        isLoaded: true
      }));
    })
  }

  handleChangeBookshelf = (changedBook, newBookshelf) => {
    changedBook.shelf = newBookshelf;

    console.log(changedBook);

    BooksAPI.update({ id: changedBook.id }, newBookshelf)
    .then((response) => {
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));

      console.log(response);
    });

    this.forceUpdate();
  }

  render() {
    const { books, bookshelfs } = this.state;

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
          <Route exact path='/' onChange={this.loadBooks} render={() => (
            <div className="home">
              <Link to="/search">Search for new books</Link>
              <Home books={books} bookshelfs={bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} />
            </div>
          )} />
          <Route exact path='/search' onChange={this.loadBooks} render={() => (
            <div className="search">
              <Search bookshelfs={bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} books={books} />
            </div>
          )} />
        </div>
      )
    }
    return (<div className="loading"><Loader type="Circles" color="#57D312" height={80} width={80}/></div>);
  }
}

export default App;
