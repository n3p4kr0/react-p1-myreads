import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI.js';
import Book from './Book.js';
import { Input, FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import CloseIcon from '@material-ui/icons/Close';
import { Fab } from '@material-ui/core';


class Search extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;

        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        query: '',
        queriedBooks: [],
        loading: false, 
        info: "No books loaded at the moment."
    }

    handleChange = (event) => {
        // We save the user's query and set the module on "Loading Mode"
        this.setState({query: event.target.value, loading: true});

        // TImeout management (the search is only done when the user has stopped typing (300ms))
        if(this.timeout) clearTimeout(this.timeout);
        
        this.timeout = setTimeout(() => {
            BooksAPI.search(this.state.query)
            .then((result) => {
                // If the query was empty or an error happens, we stop and empty the book list
                if(result === undefined || result.hasOwnProperty("error")) {
                    this.setState( (prevState) => ({
                        ...prevState,
                        loading: false,
                        queriedBooks: [],
                        info: "Impossible to load any book at the moment. Please try again later."
                    }));

                    return;
                }

                // For each book found, we check if the user has already assigned it to a bookshelf
                result.map( (searchedBook) => {
                    var index = this.props.books.findIndex( (book) => { return book.id === searchedBook.id; });
                    if (index !== -1) {
                        searchedBook.shelf = this.props.books[index].shelf;
                    };
                    return true;
                });

                // We leave the "Loading mode" and load the book list saved in the state
                this.setState(() => ({
                    loading: false, 
                    queriedBooks: result,
                    info: ""
                }));
            })
        }, 300);       
    }

    render() {
        return (
            <div className="search-module">
                <div className="home-btn">
                    <Fab color="secondary" component={Link} to="/">
                        <CloseIcon />
                    </Fab>
                </div>
                <div className="search-form">
                    <p>Type a query to search for new books :</p>
                    <FormControl className="search-input">
                        <Input
                            name="query"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </div>
                { !this.state.loading
                 ? 
                    <div className="search-results">
                        { this.state.queriedBooks.length > 0
                            ? this.state.queriedBooks.map( (book) => (
                                <Book  
                                key={book.id}
                                book={book} 
                                bookshelfs={this.props.bookshelfs} 
                                handleChangeBookshelf={ this.props.handleChangeBookshelf } />
                            ))
                            : this.state.info
                        }
                    </div>
                : <div className="loading"><Loader type="Circles" color="#57D312" height={80} width={80}/></div>
                }
            </div>
        )
    }
}

export default Search;