const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse POST request JSON data
app.use(bodyParser.json());

app.post('/runscript', async (req, res) => {
  try {
    const cardData = req.body.card;  // This extracts the "card" data from the POST request
    if (!cardData) {
      return res.status(400).send("Card data is missing.");
    }
    const result = await require('./fluidpay.js')(cardData);
    res.send(result);
  } catch (error) {
    res.status(500).send(`Error executing script: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});