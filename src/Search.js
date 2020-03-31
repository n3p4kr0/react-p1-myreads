import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI.js';
import Book from './Book.js';
import { Input, FormControl } from '@material-ui/core';



class Search extends Component {
    constructor(props) {
        super(props);
        this.error = '';
        this.timeout = 0;

        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        query: '',
        queriedBooks: [],
        typingTimeout: 0,
        loading: false
    }

    handleChange = (event) => {
        this.setState({query: event.target.value, loading: true});

        if(this.timeout) clearTimeout(this.timeout);
        
        this.timeout = setTimeout(() => {
            BooksAPI.search(this.state.query)
            .then((result) => {
                this.setState(() => ({loading: false}));

                if(result === undefined) {
                    console.log('undefined result');
                    return;
                }

                if(result.error === "empty query") {
                    console.log('Empty query');
                    return;
                }

                result.map( (searchedBook) => {
                    var index = this.props.books.findIndex( (book) => { return book.id === searchedBook.id; });
                    if (index !== -1) {
                        searchedBook.shelf = this.props.books[index].shelf;
                    };
                    return true;
                });

                this.setState(() => ({
                    queriedBooks: result,
                }));
            })
        }, 300);

       
    }

    handleChangeBookshelf = (bookId, newBookshelf) => {
        var stateCopy = Object.assign({}, this.state);

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
                { !this.state.loading
                 ? 
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
                : <div>Loading...</div>
                }
            </div>
        )
    }
}

export default Search;