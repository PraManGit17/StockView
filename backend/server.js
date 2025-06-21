const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.get('/api/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.use('/api/items', itemRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("StockView DB Connected");
    app.listen(PORT, () => {
      console.log(`Server Successfully on PORT: ${PORT}`)
    });
  })
  .catch(err => {
    console.error(err)
  });
