import React from 'react';
import './App.css';
import Bookshelf from './Bookshelf.js';

const bookshelfs = [
  { name: "Currently Reading" },
  { name: "Want to read" },
  { name: "Read" },
];

function App() {
  return (
    <div className="App">
      { bookshelfs.map( (bookshelf) => (<Bookshelf name={bookshelf.name} bookshelfs={bookshelfs} />) ) }
    </div>
  );
}

export default App;
