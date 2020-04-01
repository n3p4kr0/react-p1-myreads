# MyReads

This project is my implementation of the first project of Udacity's "React" Nanodegree program.

It is a simple library management. The user can find books from a database, and add them to one of the book shelves on the home page ("Currently reading", "Want to read" or "Read"). The user can change a book's shelf when they want.

The app connects to an API (Internet connection is thus required for its use), and persists its state from it.


## Installation

Installation is simple and can be done through npm or Yarn.

`git clone https://github.com/sarah-maris/reactnd-project-myreads.git`

`yarn install OR npm install`

`yarn start OR npm start`

It will then be accessible through [http://localhost:3000](http://localhost:3000) in the browser.

## Usage

Usage is also quite straightforward.

The homepage is your library, with its three bookshelves ("Currently reading", "Want to read" or "Read"). From there, you can move a book from one shelf to another, or delete the book from your library (selecting "None" in its menu).

The search page allows you to type a custom query, in order to find new books through an API. Any book you already have in your library that happens to be part of your custom search will have its current and updated status on the search page (you will be able to move the book to another shelf directly from there, or even to remove it from your library).

