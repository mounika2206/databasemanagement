const express = require("express");

const database = require("./database/index1");

const booky = express();

booky.use(express.json());
/*
ROUTE          /
DESCRIPTION    GET ALL BOOKS
ACCESS         PUBLIC
PARAMENTER     NONE
METHOD         GET
*/

booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
ROUTE          /is
DESCRIPTION    Get specific books based on ISBN
ACCESS         PUBLIC
PARAMENTER     NONE
METHOD         GET
*/

booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.send(`<h1>No Book Found with ISBN of ${req.params.isbn}</h1>`);
  }

  return res.json({ books: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/

booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.send(`<h1>No Book Found of Category of ${req.params.isbn}</h1>`);
  }

  return res.json({ books: getSpecificBook });
});
/*
Route           /lang
Description     Get list of books based on languages
Access          PUBLIC
Parameter       language
Methods         GET
*/
booky.get("/lang/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );

  if (getSpecificBook.length === 0) {
    return res.send(`<h1>No Book Found in Language  ${req.params.isbn}</h1>`);
  }

  return res.json({ books: getSpecificBook });
});
/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});

/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificBook = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `<h1>No Author found for the book of ${req.params.isbn}</h1>`,
    });
  }

  return res.json({ author: getSpecificBook });
});
/*
Route           /author/id
Description     get all publications
Access          PUBLIC
Parameter       id
Methods         GET
*/
booky.get("/author/id/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the id of ${req.params.id}`,
    });
  }

  return res.json({ author: getSpecificAuthor });
});
/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publication });
});
/*
Route           /publications/name
Description     Get specific publication
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/publications/name/:name", (req, res) => {
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.name === req.params.name
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No Publication found of name  ${req.params.id}`,
    });
  }
  return res.json({ publication: getSpecificPublication });
});

// get list of publication based on book
/*
Route           /publications/book
Description     get list of publication based on book
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/publications/book/:isbn", (req, res) => {
  const getSpecificBook = database.publication.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No publication found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ publication: getSpecificBook });
});

/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/book/add", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({ books: database.books });
});

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({ author: database.author });
});
/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn" , (req,res) => {
  database.books.forEach((book) => {
    if(book.ISBN == req.params.isbn){
      book.title = req.body.newBookTitle;
      return;

    }
  })
  return res.json({ books: database.books });
})
/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put('/book/update/author/:isbn/:authorId',(req,res) => {
  database.books.forEach((book) => {
    if(book.ISBN == req.params.isbn){
      
      return book.author.push(parseInt(req.params.authorId)); 

    }
  })
  database.author.forEach((author) => {
    if(author.id === parseInt(req.params.authorId)){
      return author.books.push(req.params.isbn);
    }
  })
  return res.json({books :database.books , author: database.author})
})
/*
Route           /author/update/
Description     update/add new author for a book
Access          PUBLIC
Parameter       id
Methods         PUT
*/
booky.put('/author/update/:id/:name' , (req,res) => {
  database.author.forEach((author) => {
    if(author.id === parseInt(req.params.id)){
      return author.name =  req.params.name;
    }
  })
  res.json({author : database.author});
})
/*
Route           /publication/update/
Description     UPdate the publication name using it's id
Access          PUBLIC
Parameter       id
Methods         PUT
*/
booky.put('/publication/update/:id/:name' , (req,res) => {
  database.publication.forEach((publication) => {
    if(publication.id === parseInt(req.params.id)){
      return publication.name =  req.params.name;
    }
  })
  res.json({publication : database.publication});
})


booky.listen(3000);