import React, { Component } from 'react';
import './App.css';
import Bookshelf from './Bookshelf.js';
import * as BooksAPI from './utils/BooksAPI.js'

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
    console.log(bookId);
    stateCopy.books.map( (book) => {
      if(book.id === bookId) {
        book.shelf = newBookshelf;
      }
    });

    this.setState(stateCopy);
  }

  render() {
    if(this.state.isLoaded) {
      return (
        <div className="App">
          <header>MyBooks</header>
          { this.state.bookshelfs.map( (bookshelf) => (
            <Bookshelf 
            books={this.state.books.filter((book) => { return book.shelf === bookshelf.id })} 
            key={bookshelf.id} 
            id={bookshelf.id} 
            name={bookshelf.name} 
            bookshelfs={this.state.bookshelfs}
            handleChangeBookshelf={ this.handleChangeBookshelf } />
          ))}
        </div>
      );
    }
    else {
      return (<p>Loading...</p>);
    }
  }
}

export default App;
