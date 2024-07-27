const express = require("express");
const app = express();
const port = 3000;
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
// middleware
app.use(express.json());

// routes
app.get("/books", async (req, res) => {
  try {
    const books=await pool.query("SELECT * FROM book1")
    res.status(200).json({ messeage: `all data`,data:books.rows },);
  } catch (error) {}
});
// get single book
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book=await pool.query("SELECT * FROM book1 WHERE id=$1",[id])
    console.log(id);
    res.status(200).json({ messeage: `single product`,data:book.rows });
  } catch (error) {
    res.json({ messeage: "invalid data" });
  }
});
// add single book
app.post("/book", async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    console.log(id);
    // inser a book postgresSQL
    const newBook = await pool.query(
      "INSERT INTO book1(id,name,description) VALUES($1,$2,$3) RETURNING*",
      [id, name, description]
    );
    res.status(200).json({ messeage: `book was created`, data: newBook.rows });
  } catch (error) {
    res.json({ messeage: `${error}` });
  }
});
// delete single book
app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM book1 WHERE id=$1",[id])
  
    res.status(200).json({ messeage: `delete success`});
  } catch (error) {
    res.json({ messeage: `${error}` });
  }
});
// update single book
app.put("/book/:id", async (req, res) => {
  try {
    const { id} = req.params;
    const { name,description} = req.body;
    const updateBook=await pool.query("UPDATE book1 SET name=$1,description=$2 WHERE id=$3 RETURNING*",[name,description,id])
    res.status(200).json({ messeage: `update success`,data:updateBook.rows });
  } catch (error) {
    res.json({ messeage: `${error}` });
  }
});

app.listen(port, () => {
  console.log(`Example app listeninggf on port ${port}`);
});
