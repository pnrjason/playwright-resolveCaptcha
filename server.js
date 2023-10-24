const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse POST request JSON data
app.use(bodyParser.json());

app.post('/runscript', async (req, res) => {
  try {
    const result = await require('./resolveCaptcha.js');
    res.send(result);
  } catch (error) {
    res.status(500).send(`Error executing script: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
