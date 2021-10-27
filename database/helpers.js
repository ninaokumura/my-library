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
  console.log({ id });
  getAllBooks(books => {
    const foundBook = books.find(element => element.id === id);
    console.log({ foundBook });
    cb(foundBook);
  });
}

function bookSearch(searchTerm, cb) {
  getAllBooks(books => {
    const foundBooks = books.filter(
      element =>
        element.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    cb(foundBooks);
  });
}

function editBook(book, cb) {
  const filePath = path.join(__dirname, 'data.json');
  getAllBooks(books => {
    // find index
    const foundIndex = books.findIndex(element => element.id === book.id);
    // console.log(foundIndex);

    // Replace book in the array - use array method?
    books.splice(foundIndex, 1, book);

    // Write the entire array back into the JSON file
    const string = JSON.stringify({ books });
    fs.writeFile(filePath, string, err => {
      if (err) {
        // handling errors
        console.error('Error, please try again');
        return;
      }
      cb();
    });
  });
}

module.exports = { getAllBooks, getBookById, bookSearch, editBook };
