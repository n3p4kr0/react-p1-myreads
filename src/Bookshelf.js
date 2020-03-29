import React, { Component } from 'react'
import Book from './Book.js';

class Bookshelf extends Component {
    state = {
        books: [
            { title: 'Book 1', author: 'Test' },
            { title: 'Book 2', author: 'Test' },
            { title: 'Book 3', author: 'Test' },
        ]
    }
    
    render() {
        return (
            <div className="bookshelf">
                <div className="bookshelf-name">{this.props.name}</div>
                <div className="bookshelf-books">
                    { this.state.books.map( (book) => ( <Book  key={book.title} book={book} currentBookshelf={this.props.name} bookshelfs={this.props.bookshelfs} /> )) }    
                </div>
            </div>
        )
    }
}

export default Bookshelf;