import express from "express";
const app = express();
const port = 3000;

let stocks = [];

app.use(express.json());

// POST
app.post("/stocks", (req, res) => {
  if (req.body == undefined) {
    res.status(500).send("Empty fields are provided. Please try again");
    return;
  }
  const { name, qty } = req.body;
  if (name === "" || qty === "") {
    res.status(500).send("Please provid all fields");
    return;
  }

  let newStock = {
    id: Date.now(),
    name: name,
    qty: qty,
  };
  stocks.push(newStock);
  res.status(200).send("New stock added succesfully");
});

// GET all
app.get("/stocks", (req, res) => {
  if (stocks.length == 0) {
    res.status(200).send("Stock is empty.");
    return;
  }
  res.status(200).send(stocks);
});

// GET one by ID
app.get("/stocks/:id", (req, res) => {
  let stockID = parseInt(req.params.id);
  let StockByID = stocks.find((stock) => (stock.id = stockID));
  if (!StockByID) {
    res.status(404).send(`Stock with id ${stockID} not found.`);
  }
  res.status(200).send(StockByID);
});

// Update
app.put("/stocks/:id", (req, res) => {
  let stockId = req.params.id;
  let toUpdateStock = stocks.find((stock) => stock.id === parseInt(stockId));

  if (!toUpdateStock) {
    res.status(404).send(`Stock with id ${stockId} is not found.`);
  }
  if (req.body == undefined) {
    res.status(500).send("Update filds are not provided");
  }
  let { name, qty } = req.body;
  toUpdateStock.name = name;
  toUpdateStock.qty = qty;
  res.status(200).send(`Stock with id ${stockId} has been updated`);
});

// Delete by ID
app.delete("/stocks/:id", (req, res) => {
  let stockID = parseInt(req.params.id);

  let index = stocks.findIndex((stock) => stock.id === stockID);
  if (index === -1) {
    return res.status(404).send("Not Found");
  }
  stocks.splice(index, 1);
  res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
