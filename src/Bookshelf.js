import React from 'react'
import Book from './Book.js';

function Bookshelf(props) {
    return (
        <div className="bookshelf">
            <div className="bookshelf-name">{props.name}</div>
            <div className="bookshelf-books">
                { props.books.map( (book) => {
                    if(book.shelf === props.id ) {
                        return ( <Book  
                        key={book.id} 
                        book={book} 
                        currentBookshelf={props.name} 
                        bookshelfs={props.bookshelfs} 
                        handleChangeBookshelf={ props.handleChangeBookshelf } /> )
                    }
                    return true;
                })}    
            </div>
        </div>
    )
}


export default Bookshelf;