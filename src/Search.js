import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI.js';
import Book from './Book.js';
import { Input, FormControl } from '@material-ui/core';



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

    handleChangeBookshelf = (bookId, newBookshelf) => {
        var stateCopy = Object.assign({}, this.state);

        console.log(stateCopy);

        // On récupère l'index du Book actuellement modifié et on change le Bookshelf

        stateCopy.queriedBooks.find( (book) => book.id === bookId ).shelf = newBookshelf;

        // On passe à l'App pour qu'elle fasse les modifs nécessaires
    
        this.setState(stateCopy);

        this.props.handleChangeBookshelf(bookId, newBookshelf);
    
        this.forceUpdate();
      }

    render() {
        return (
            <div className="search-module">                
                <FormControl fullWidth className="search-input">
                    <Input
                        name="query"
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <div className="search-results">
                    {this.state.queriedBooks.map( (book) => (
                        <Book  
                        key={book.id}
                        book={book} 
                        //currentBookshelf={this.props.name} 
                        bookshelfs={this.props.bookshelfs} 
                        handleChangeBookshelf={ this.handleChangeBookshelf } />
                    ))}
                </div>
            </div>
        )
    }
}

export default Search;