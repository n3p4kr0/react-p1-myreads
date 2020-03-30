import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './utils/BooksAPI.js'
import { Link, Route } from 'react-router-dom';
import Home from './Home.js';
import Search from './Search.js';

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
    stateCopy.books.map( (book) => {
      if(book.id === bookId) {
        book.shelf = newBookshelf;
      }
      return true;
    });

    this.setState(stateCopy);
    this.forceUpdate();
  }

  render() {
    if(this.state.isLoaded) {
      return (
        <div className="App">
          <header>MyBooks</header>
          <Route exact path='/' render={() => (
            <div className="home">
              <Home books={this.state.books} bookshelfs={this.state.bookshelfs} handleChangeBookshelf={this.handleChangeBookshelf} />
              <Link to="/search">Go to Search</Link>
            </div>
          )} />
          <Route exact path='/search' render={() => (
            <div className="search">
              <Search bookshelfs={this.state.bookshelfs} />
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
