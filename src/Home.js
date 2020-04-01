import React from 'react';
import Bookshelf from './Bookshelf.js';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Fab } from '@material-ui/core';


function Home (props) {
  const { books, bookshelfs } = props;

  return (
    <div>
      <div className="btn-search">
        <Fab color="primary" component={Link} to="/search">
          <SearchIcon />
        </Fab>
      </div>
      { bookshelfs.map( (bookshelf) => (
        <Bookshelf 
          books={books}
          key={bookshelf.id} 
          id={bookshelf.id} 
          name={bookshelf.name} 
          bookshelfs={bookshelfs}
          handleChangeBookshelf={ props.handleChangeBookshelf } />
      )) }
    </div>
  )
}

export default Home;