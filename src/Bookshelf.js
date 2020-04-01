import React from 'react'
import Book from './Book.js';

function Bookshelf(props) {
    const { name, id, books, bookshelfs } = props;

    return (
        <div className="bookshelf">
            <div className="bookshelf-name">{name}</div>
            <div className="bookshelf-books">
                { books.map( (book) => {
                    if(book.shelf === id ) {
                        return ( <Book  
                        key={book.id} 
                        book={book} 
                        currentBookshelf={name} 
                        bookshelfs={bookshelfs} 
                        handleChangeBookshelf={ props.handleChangeBookshelf } /> )
                    }
                    return true;
                })}    
            </div>
        </div>
    )
}


export default Bookshelf;