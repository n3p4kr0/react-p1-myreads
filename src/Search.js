import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI.js';
import Book from './Book.js';


class Search extends Component {
    state = {
        query: '',
        queriedBooks: []
    }

    handleChange = (event) => {
        this.setState({query: event.target.value});

        BooksAPI.search("Android")
        .then((result) => {
          console.log(result);

          result.map( (searchedBook) => {
            var index = this.props.books.findIndex( (book) => { return book.id === searchedBook.id; });
              if (index !== -1) {
                  searchedBook.shelf = this.props.books[index].shelf;
              };
              return true;
          });

          this.setState(() => ({
            queriedBooks: result
          }));
        })

        
    }

    render() {
        return (
            <div className="search-module">
                <input type="text" name="query" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}></input>
                <div className="search-results">
                    {this.state.queriedBooks.map( (book) => (
                        <Book  
                        key={book.id}
                        book={book} 
                        //currentBookshelf={this.props.name} 
                        bookshelfs={this.props.bookshelfs} 
                        handleChangeBookshelf={ this.props.handleChangeBookshelf } />
                    ))}
                </div>
            </div>
        )
    }
}

export default Search;