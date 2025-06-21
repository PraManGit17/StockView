const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');
dotenv.config();

const app = express();

// const allowedOrigins = ['http://localhost:5173', 'https://your-react-app.vercel.app'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));



app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
const PORT = process.env.PORT;


app.use('/api/', itemRoutes);


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
