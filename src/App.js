import React, { Component } from 'react';
import './App.css';
import Bookshelf from './Bookshelf.js';

class App extends Component {
  state = {
    bookshelfs: [
      { name: "Currently Reading" },
      { name: "Want to read" },
      { name: "Read" }
    ]
  }


  render() {
    return (
      <div className="App">
        { this.state.bookshelfs.map( (bookshelf) => (
          <Bookshelf  key={bookshelf.name} name={bookshelf.name} bookshelfs={this.state.bookshelfs} />
        ))}
      </div>
    );
  }
}

export default App;
