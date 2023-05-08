const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`running on PORT ${PORT}`));
