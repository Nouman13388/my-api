const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Placeholder data (simulating a database)
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' }
];

// Routes for CRUD operations
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const book = { id: books.length + 1, title, author };
  books.push(book);
  res.status(201).json(book);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  const { title, author } = req.body;
  book.title = title;
  book.author = author;

  res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
  books = books.filter(book => book.id !== parseInt(req.params.id));
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Example of using callbacks
function getBookByIdCallback(id, callback) {
    setTimeout(() => {
      const book = books.find(book => book.id === parseInt(id));
      if (!book) {
        callback('Book not found', null);
      } else {
        callback(null, book);
      }
    }, 1000);
  }
  
  getBookByIdCallback(1, (error, book) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Callback - Found book:', book);
    }
  });
  
  // Example of using promises
  function getBookByIdPromise(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books.find(book => book.id === parseInt(id));
        if (!book) {
          reject('Book not found');
        } else {
          resolve(book);
        }
      }, 1000);
    });
  }
  
  getBookByIdPromise(2)
    .then(book => {
      console.log('Promise - Found book:', book);
    })
    .catch(error => {
      console.error(error);
    });
  
  // Example of using async/await
  async function findBook(id) {
    try {
      const book = await getBookByIdPromise(id);
      console.log('Async/Await - Found book:', book);
    } catch (error) {
      console.error(error);
    }
  }
  
  findBook(1);
  