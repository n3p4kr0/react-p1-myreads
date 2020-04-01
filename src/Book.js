import React, { Component } from 'react'
import { Menu, MenuItem, Fab, ListItemIcon } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import ImageUnfound from './gray.jpg';


class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book,
            menuAnchorEl: null,
        };
    }

    // Fires when the Floating Action Button (material-ui) is clicked
    handleOpenFAB = (event) => {
        var el = event.currentTarget;
        this.setState( (prevState) => ({
            ...prevState,
            menuAnchorEl: el
        }));
    }

    // Fires when the Floating Action Button is closed (by the user clicking on an item of the list or outside the modal)
    handleCloseFAB = (event) => {
        // We close the list
        this.setState( (prevState) => ({
            ...prevState,
            menuAnchorEl: null
        }));
        
        // If the user has clicked on a list item THAT IS NOT the current selected item, we update the book shelf
        if(event.currentTarget.dataset.valueShelf !== undefined && event.currentTarget.dataset.valueShelf !== this.props.book.shelf) {
            this.props.handleChangeBookshelf(this.props.book, event.currentTarget.dataset.valueShelf);
            this.forceUpdate();
        }
    };

    render() {
        const { book, bookshelfs } = this.props;
        return (
            <div className="book-item">
                <div className="book-image">
                    {book.hasOwnProperty('imageLinks') 
                    ? <img src={book.imageLinks.smallThumbnail} alt={book.title} />
                    : <img src={ImageUnfound} alt={book.title} />}
                    <div className="book-menu-btn">
                        <Fab color="primary" size="small" onClick={this.handleOpenFAB}>
                            <AddIcon />
                        </Fab>
                        <Menu
                            className="simple-menu"
                            anchorEl={this.state.menuAnchorEl}
                            keepMounted
                            open={Boolean(this.state.menuAnchorEl)}
                            onClose={this.handleCloseFAB}
                        >
                            <MenuItem name="none" key="none" data-value-shelf="none" onClick={this.handleCloseFAB}>
                                { (book.shelf === undefined || book.shelf === "none") && (
                                    <ListItemIcon className="icon-current-bookshelf">
                                        <ArrowRightIcon />
                                    </ListItemIcon>
                                ) }
                                None
                            </MenuItem>
                            { bookshelfs.map( (bookshelf) => 
                                (<MenuItem key={bookshelf.id} onClick={this.handleCloseFAB} data-value-shelf={bookshelf.id}>
                                    { bookshelf.id === book.shelf && (
                                        <ListItemIcon className="icon-current-bookshelf">
                                            <ArrowRightIcon />
                                        </ListItemIcon>
                                    ) }
                                    {bookshelf.name}
                                </MenuItem>) 
                            ) }
                        </Menu>
                    </div>
                </div>  
                <div className="book-infos">
                    <div className="book-title"><b>{book.title}</b></div>  
                    <div className="book-author">
                        {book.hasOwnProperty('authors') 
                        ? book.authors.toString()
                        : "Author unknown" }
                    </div>   
                </div>
            </div>
        )
    }
}

export default Book;