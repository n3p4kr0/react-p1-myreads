import React, { Component } from 'react'

class Book extends Component {
    render() {
        const { book } = this.props;
        return (
            <div className="book-item">
                <div className="book-image">  </div>  
                <div className="book-title"> {book.title} </div>  
                <div className="book-author"> {book.author} </div>            
            </div>
        )
    }
}

export default Book;