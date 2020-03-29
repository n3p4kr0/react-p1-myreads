import React, { Component } from 'react'

class Book extends Component {
    render() {
        const { book, bookshelfs } = this.props;
        return (
            <div className="book-item">
                <div className="book-image"></div>  
                <div className="book-title"> {book.title} </div>  
                <div className="book-author"> {book.author} </div>  
                <select>
                    { bookshelfs.map( (bookshelf) => (<option>{bookshelf.name}</option>) ) }
                </select>          
            </div>
        )
    }
}

export default Book;