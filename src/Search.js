import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI.js';
import Book from './Book.js';
import { Input, FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';


class Search extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;

        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        query: '',
        queriedBooks: [],
        loading: false
    }

    handleChange = (event) => {
        this.setState({query: event.target.value, loading: true});

        if(this.timeout) clearTimeout(this.timeout);
        
        this.timeout = setTimeout(() => {
            BooksAPI.search(this.state.query)
            .then((result) => {
                if(result === undefined || result.error === "empty query") {
                    this.setState( (prevState) => ({
                        ...prevState,
                        queriedBooks: []
                    }));
                    return;
                }

                result.map( (searchedBook) => {
                    var index = this.props.books.findIndex( (book) => { return book.id === searchedBook.id; });
                    if (index !== -1) {
                        searchedBook.shelf = this.props.books[index].shelf;
                    };
                    return true;
                });

                this.setState(() => ({loading: false}));

                this.setState(() => ({
                    queriedBooks: result,
                }));
            })
        }, 300);       
    }

    render() {
        return (
            <div className="search-module">
                <div className="search-form">
                    <p>Type a query to search for new books or <Link to="/">return to homepage</Link></p>
                    <FormControl fullWidth className="search-input">
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
                            : <p>No books loaded at the moment</p>
                        }
                    </div>
                : <div className="loading"><Loader type="Circles" color="#57D312" height={80} width={80}/></div>
                }
            </div>
        )
    }
}

export default Search;