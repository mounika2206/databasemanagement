// Frame work
require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");

// Database
const database = require("./database/index");

const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");

// Initializing express
const shapeAI = express();

shapeAI.use(express.json());
mongoose.connect(process.env.MONGO_URL,{

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}
).then(()=>console.log("connection established"));

// Configurations
shapeAI.use(express.json());

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});
/*
Route           /c
Description     get specific books based on a author
Access          PUBLIC
Parameters      category
Method          GET
*/


/*shapeAI.get("/a/authors/:id", (req, res) => {
  const getSpecificAuthor = database.authors.filter(
    (book) => book.authors === req.params.name
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No book found for the Author of ${req.params.authors}`,
    });
  }

  return res.json({ book: getSpecificAuthor });
});*/


shapeAI.get("/authors/name/:name", (req, res) => {
  const getSpecificAuthor = database.authors.filter(
    (author) => author.name === req.params.name
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Publication found of name ${req.params.id}`,
    });
  }

  return res.json({ author: getSpecificAuthor });
});

/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
shapeAI.get("/c/:category", (req, res) => {
  const getSpecificBooks = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBooks.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});




shapeAI.get("/lan/:language", (req, res) => {
  const getSpecificBooks = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );

  if (getSpecificBooks.length === 0) {
    return res.json({
      error: `No book found for the language  of ${req.params.language}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});








  
/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/author", (req, res) => {
  return res.json({ authors: database.authors });
});





/*
Route           /author
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/author/:isbn", (req, res) => {
  const getSpecificAuthors = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthors.length === 0) {
    return res.json({
      error: `No author found for the book ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthors });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/publications", (req, res) => {
  return res.json({ publications: database.publications });
});
/*
Route           /p
Description     get specific publications
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/publications/name/:name", (req, res) => {
    const getSpecificPublication = database.publications.filter(
      (publication) => publication.name === req.params.name
    );
  
    if (getSpecificPublication.length === 0) {
      return res.json({
        error: `No Publication found of name ${req.params.id}`,
      });
    }
  
    return res.json({ publication: getSpecificPublication });
  });
  
/*
Route           /author
Description     get a list of publication based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/publications/book/:isbn", (req, res) => {
    const getSpecificBook = database.publications.filter((publication) =>
      publication.books.includes(req.params.isbn)
    );
  
    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No publication found for the book ${req.params.isbn}`,
      });
    }
  
    return res.json({ publication: getSpecificBook });
  });

/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
shapeAI.get("/author/book/:isbn", (req, res) => {
    const getSpecificBook = database.authors.filter((author) =>
      author.books.includes(req.params.isbn)
    );
  
    if (getSpecificBook.length === 0) {
      return res.json({
        error: `No Author found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ author: getSpecificBook });
  });



  //adding new book

  
  shapeAI.post("/book/new",async (req, res) => {
    const { newBook } = req.body;
  
    const addnewBook= BookModel.create(newBook);
   // database.books.push(newBook);
    return res.json({ books: database.books, message: "book was added!" });
  });
  


  shapeAI.post("/author/new/",(req,res)=>{
    const {newAuthor}=req.body;
    database.authors.push(newAuthor);
    return res.json({books:database.authors,message:"Author was added!"});
    
  });

  shapeAI.post("/publications/new/",(req,res)=>{
    const {newPublications}=req.body;
    database.publications.push(newPublications);
    return res.json({books:database.publications,message:
      "Publications was added!"});
    
  });

///book/update/:title

shapeAI.put("/book/update/title/:isbn",(req,res)=>
{
   //foreach directly modifies the array
   database.books.forEach((book)=>
   {
     if(book.ISBN=== req.params.isbn)
     {
     book.title=req.body.bookTitle;
     return;
  
   }
  });
   return res.json({books:database.book});
});


shapeAI.put("/book/author/update/:isbn",(req,res)=>
{
  database.books.forEach((book)=>
  {
    if(book.ISBN=== req.params.isbn) 
    return book.authors.push(req.body.newAuthor);
  });
  database.authors.forEach((author)=>
  {
    if(author.id=== req.body.newAuthor)
    return author.books.push(req.params.isbn);
  });

  return res.json({
    books:database.books,
    authors:database.authors,
    message:"New Author was added",
    
  });
});

shapeAI.put("/author/update/:id/:name",(req,res)=>
{
   //foreach directly modifies the array
   database.books.forEach((author)=>
   {
     if(author.id=== parseInt(req.params.id))
     {
      
     return author.name=req.params.name;
  
   }
  });
   return res.json({author:database.author});
});


shapeAI.put("/publication/update/:id/:name",(req,res)=>
{
   //foreach directly modifies the array
   database.publication.forEach((publication)=>
   {
     if(publication.id=== parseInt(req.params.id))
     {
      
     return publication.name=req.params.name;
  
   }
  });
   return res.json({publication:database.author});
});


//publication /update/book

shapeAI.put("/publication/update/book:isbn",(req,res)=>
{
  database.publications.forEach((publication)=>
  {
    if(publication.id===req.body.pubId)
    {
      return publication.book.push(req.params.isbn);
    }
  });
  database.books.forEach((book) =>
  {
    if(book.ISBN===req.params,isbn)
    {
      book.publication=req.body.pubId;
      return;
    }
    });

return res.json({books:database.books,
publications:database.publications,
message:"Successfully upadted publication",
});
});


///book/delete
shapeAI.delete("/book/delete/:isbn",(req,res)=>
{
  const updatedBookDatabase=database.books.filter((book)=>
  {
  book.ISBN!== req.params.isbn;
});
database.books=updatedBookDatabase;
return res.json({books:database.books});
});

shapeAI.delete("/book/delete/author/:isbn/:authorId",(req,res)=>
{ database.books.forEach((book)=>
  {
    if(book.ISBN=== req.params.isbn)
    {
      const newAuthorList=book.authors.filter((author)=>
      author!==parseInt(req.params.authorId));
      book.authors=newAuthorList;
      return;
    }

  });
  database.authors.forEach((author)=>
  {
    if(author.id=== parseInt(req.params.authorId))
    {
         const newBooksList=author.books.filter((book)=>
         book!==req.params.isbn);
         author.books=newBooksList;
         return;
    }

  });
return res.json({message:"author deleted",
book:database.books,
author:database.authors,

  });
});

  //publication/delete/book

shapeAI.delete("/publication/delete/book/.isbn/:pubId",(req,res)=>
  
  {
    database.publications.forEach((publication)=>
    {
      if(publication.id===parseInt(req.params.pubId))
      {
        const newBooksList=publication.books.filter((book) =>
        book!== req.params.isbn
        );
        publication.books=newBooksList;
        return;

      }
    });
    database.books.forEach((book)=>
    {
      if(book.ISBN===req.params.isbn)
      {
        book.publication=0;
        return;
      }
    });
  


    return res.json({
    books:database.books,
    publications:database.publications,
    
    });
  });

shapeAI.listen(3300,()=>console.log("server running!"));