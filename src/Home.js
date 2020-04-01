import React, { Component } from 'react';
import Bookshelf from './Bookshelf.js';

class Home extends Component {
  render() {
      return (
        <div>
          { this.props.bookshelfs.map( (bookshelf) => (
            <Bookshelf 
              books={this.props.books}
              key={bookshelf.id} 
              id={bookshelf.id} 
              name={bookshelf.name} 
              bookshelfs={this.props.bookshelfs}
              handleChangeBookshelf={ this.props.handleChangeBookshelf } />
          ))}
        </div>
     );
  }
}

export default Home;