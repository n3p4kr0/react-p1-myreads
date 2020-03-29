import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedBookshelf: this.props.currentBookshelf};
    
        this.handleChangeBookshelf = this.handleChangeBookshelf.bind(this);
    }

    handleChangeBookshelf(event) {
        console.log(event.target.value);
        this.setState({ selectedBookshelf: event.target.value });
    }

    render() {
        const { book, bookshelfs, currentBookshelf } = this.props;
        return (
            <div className="book-item">
                <div className="book-image"></div>  
                <div className="book-title"> {book.title} </div>  
                <div className="book-author"> {book.author} </div>  
                <select name="book-select-bookshelf" value={this.state.selectedBookshelf} onChange={this.handleChangeBookshelf}>
                    { bookshelfs.map( (bookshelf) => (<option key={bookshelf.name} value={bookshelf.name}>{bookshelf.name}</option>) ) }
                </select>          
            </div>
        )
    }
}

export default Book;