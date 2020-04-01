import React from 'react';
import Bookshelf from './Bookshelf.js';

function Home (props) {
  const { books, bookshelfs } = props;

  return (
    <div>
      { bookshelfs.map( (bookshelf) => (
        <Bookshelf 
          books={books}
          key={bookshelf.id} 
          id={bookshelf.id} 
          name={bookshelf.name} 
          bookshelfs={bookshelfs}
          handleChangeBookshelf={ props.handleChangeBookshelf } />
      ))}
    </div>
  )
}

export default Home;