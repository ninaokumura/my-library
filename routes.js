const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const helpers = require('./database/helpers');

router.get('/', (req, res) => {
  helpers.getAllBooks(books => {
    const viewData = { books };
    res.render('home', viewData);
  });
});

router.post('/', (req, res) => {
  const searchTerm = req.body.searchTerm;
  helpers.bookSearch(searchTerm, books => {
    const viewData = { books };
    res.render('home', viewData);
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    helpers.getAllBooks(books => {
      const viewData = { books };
      res.render('home', viewData);
    });
    return;
  }
  helpers.getBookById(id, foundBook => {
    const templateData = { ...foundBook };
    res.render('details', templateData);
  });
});

// We are going to need GET a form to edit/update the book information.
//view form
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  helpers.getBookById(id, foundBook => {
    res.render('edit', foundBook);
  });
});

//Edit form
router.post('/:id/edit', (req, res) => {
  const bookId = Number(req.params.id);
  helpers.getBookById(bookId, foundBook => {
    console.log({ bookId });
    //Create an object of the updated puppy data from the request body
    const updatedBook = {
      ...foundBook,
      title: req.body.title,
      author: req.body.author,
    };
    // Update the book in the array
    helpers.editBook(updatedBook, err => {
      res.redirect(`/${bookId}`);
    });
  });
});

module.exports = router;
