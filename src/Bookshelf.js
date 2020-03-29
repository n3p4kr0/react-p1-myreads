import React, { Component } from 'react'
import Book from './Book.js';

class Bookshelf extends Component {
    render() {
        const books = [
            { title: 'Book 1', author: 'Test' },
            { title: 'Book 2', author: 'Test' },
            { title: 'Book 3', author: 'Test' },
          ];

        return (
            <div className="bookshelf">
                <div class="bookshelf-name">{this.props.name}</div>
                <div class="bookshelf-books">
                    { books.map( (book) => ( <Book book={book} bookshelfs={this.props.bookshelfs} /> )) }    
                </div>
            </div>
        )
    }
}

export default Bookshelf;