const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
const customerRouts = require('./routes/customerRoutes');
const historyRouts = require('./routes/historyNoteRoutes');
const categoryRouts = require('./routes/categoryRoutes');
const notes = require('./data/notes');
const app = express();
dotenv.config();

app.use(express.json());

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongDB Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};
connect();

app.get('/', (req, res) => {
  res.send('server is running');
});

app.get('nt', (res, req) => {
  res.json(notes);
});

app.use('/notes', noteRoutes);
app.use('/customers', customerRouts);
app.use('/history', historyRouts);
app.use('/category', categoryRouts);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`running on PORT ${PORT}`));
