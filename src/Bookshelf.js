import React, { Component } from 'react'
import Book from './Book.js';

class Bookshelf extends Component {

    componentDidMount() {
        this.setState( { books: this.props.books } )
    }

    state = {
        books: this.props.books
    }

    handleChangeBookshelf = (bookId, newBookshelf) => {
        var stateCopy = Object.assign({}, this.state);
        console.log(bookId);
        stateCopy.books.map( (book) => {
            if(book.id === bookId) {
                book.shelf = newBookshelf;
            }
        });

        this.setState(stateCopy);
        
        this.props.handleChangeBookshelf(bookId, newBookshelf);
    }
    
    render() {
        return (
            <div className="bookshelf">
                <div className="bookshelf-name">{this.props.name}</div>
                <div className="bookshelf-books">
                    { this.state.books.map( (book) => {
                        if(book.shelf === this.props.id ) {
                            return ( <Book  
                            key={book.id} 
                            book={book} 
                            currentBookshelf={this.props.name} 
                            bookshelfs={this.props.bookshelfs} 
                            handleChangeBookshelf={ this.handleChangeBookshelf } /> )
                        }
                    })}    
                </div>
            </div>
        )
    }
}

export default Bookshelf;