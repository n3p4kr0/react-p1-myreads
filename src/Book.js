import React, { Component } from 'react'
import { Fab, ListItemIcon } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookshelf: this.props.currentBookshelf,
            book: this.props.book,
            menuAnchorEl: null,
        };
    
        this.handleChangeBookshelf = this.handleChangeBookshelf.bind(this);
    }

    handleChangeBookshelf(newShelf) {

        this.setState((prevState) => ({
            ...prevState,
            selectedBookshelf: newShelf,
            book: {
                ...prevState.book,
                shelf: this.state.selectedBookshelf
            }
        }));
        
        console.log(this.state.book.id);
        this.props.handleChangeBookshelf(this.state.book.id, newShelf);
    }

    handleOpenFAB = (event) => {
        var el = event.currentTarget;
        this.setState( (prevState) => ({
            ...prevState,
            menuAnchorEl: el
        }));
    }

    handleCloseFAB = (event) => {
        console.log(event.currentTarget.dataset.valueShelf);

        this.setState( (prevState) => ({
            ...prevState,
            menuAnchorEl: null
        }));
        
        if(event.currentTarget.dataset.valueShelf !== undefined) {
            this.handleChangeBookshelf(event.currentTarget.dataset.valueShelf);
            this.forceUpdate();
        }
    };

    render() {
        const { book, bookshelfs } = this.props;
        return (
            <div className="book-item">
                <div className="book-image">
                    {this.state.book.hasOwnProperty('imageLinks') 
                    ? <img src={this.state.book.imageLinks.smallThumbnail} alt={this.state.book.title} />
                    : <img src={process.env.PUBLIC_URL + "/public/gray.jpg"} alt={this.state.book.title} />}
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
                                { this.state.book.shelf === undefined && (
                                    <ListItemIcon className="icon-current-bookshelf">
                                        <ArrowRightIcon />
                                    </ListItemIcon>
                                ) }
                                None
                            </MenuItem>
                            { bookshelfs.map( (bookshelf) => 
                                (<MenuItem key={bookshelf.id} onClick={this.handleCloseFAB} data-value-shelf={bookshelf.id}>
                                    { bookshelf.id === this.state.book.shelf && (
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
                        {this.state.book.hasOwnProperty('authors') 
                        ? book.authors.toString()
                        : "Author unknown" }
                    </div>   
                </div>
            </div>
        )
    }
}

export default Book;