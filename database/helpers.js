const path = require('path');
const fs = require('fs');
const fs2 = require('fs/promises');
const express = require('express');

const filePath = path.join(__dirname, 'data.json');

//functions

function getAllBooks(cb) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const { books } = JSON.parse(data);
    cb(books);
  });
}

// function getAllBooksAsync(cb) {
//   fs2
//     .readFile(filePath)
//     .then(data => {
//       const { books } = JSON.parse(data);
//       cb(books);
//     })
//     .catch(err => console.log(err.message));
// }

// async function getAllBooksAsync2(cb) {
//   try {
//     const { books } = await fs2.readFile(filePath);
//     cb(books);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

function getBookById(id, cb) {
  getAllBooks(books => {
    const foundBook = books.find(element => element.id === id);
    console.log(foundBook);
    cb(foundBook);
  });
}

module.exports = { getAllBooks, getBookById };
