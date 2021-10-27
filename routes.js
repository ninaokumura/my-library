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
  helpers.getBookById(id, foundBook => {
    const templateData = { ...foundBook };
    res.render('details', templateData);
  });
});

module.exports = router;
