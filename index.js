const express = require("express");
const app = express();
const port = 3000;

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
    const bookInfo = req.body;
    console.log(bookInfo);
    res.status(200).json(bookInfo);
  } catch (error) {
    res.json({ messeage: "invalid data" });
  }
});
// delete single book
app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.status(200).json({ messeage: `delete single product ${id}` });
  } catch (error) {
    res.json({ messeage: "invalid data" });
  }
});
// update single book
app.put("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.status(200).json({ messeage: `update single product ${id}` });
  } catch (error) {
    res.json({ messeage: "invalid data" });
  }
});











app.listen(port, () => {
  console.log(`Example app listeninggf on port ${port}`);
});
