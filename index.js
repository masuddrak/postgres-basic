const express = require("express");
const app = express();
const port = 3000;
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
// middleware
app.use(express.json());

// routes
app.get("/books", async (req, res) => {
  console.log("helohjh");
  res.send({ messeage: "Hello World!" });
});
// get single book
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.status(200).json({ messeage: `i have a single product ${id}` });
  } catch (error) {
    res.json({ messeage: "invalid data" });
  }
});
// add single book
app.post("/book", async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    console.log(id)
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
    console.log(id);
    res.status(200).json({ messeage: `delete single product ${id}` });
  } catch (error) {
    res.json({ messeage: `${error}` });
  }
});
// update single book
app.put("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({ messeage: `update single product ${id}` });
  } catch (error) {
    res.json({ messeage: "invalid data" });
  }
});

app.listen(port, () => {
  console.log(`Example app listeninggf on port ${port}`);
});
