import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookshelf: this.props.currentBookshelf,
            book: this.props.book
        };
    
        this.handleChangeBookshelf = this.handleChangeBookshelf.bind(this);
    }

    handleChangeBookshelf(event) {
        console.log(event.target.value);
        this.setState({
            selectedBookshelf: event.target.value
        });

        this.setState( (prevState) => ({
            ...prevState,
            book: {
                ...prevState.book,
                shelf: this.state.selectedBookshelf
            }
        }));
        console.log(this.state.book.id);
        this.props.handleChangeBookshelf(this.state.book.id, event.target.value);
    }

    render() {
        const { book, bookshelfs } = this.props;
        return (
            <div className="book-item">
                <div className="book-image">
                    {this.state.book.hasOwnProperty('imageLinks') 
                    ? <img src={this.state.book.imageLinks.smallThumbnail} alt={this.state.book.title} />
                    : <img src={"../public/gray.jpg"} alt={this.state.book.title} />}
                </div>  
                <div className="book-title"> <b>{book.title}</b> </div>  
                <div className="book-author">
                    {this.state.book.hasOwnProperty('authors') 
                    ? book.authors.toString()
                    : "Author unknown" }
                </div>   
                
                <select name="book-select-bookshelf" defaultValue={this.state.book.shelf} onChange={this.handleChangeBookshelf}>
                    { bookshelfs.map( (bookshelf) => (<option key={bookshelf.id} value={bookshelf.id}>{bookshelf.name}</option>) ) }
                </select>
            </div>
        )
    }
}

export default Book;