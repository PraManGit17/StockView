// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const itemRoutes = require('./routes/itemRoutes');
// const cors = require('cors');

// dotenv.config();

// const app = express();

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://stock-view-puce.vercel.app'
// ];

// app.use(cors({
//   origin: function (origin, calalback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// app.use(express.json());
// const PORT = process.env.PORT || 5000;

// app.use('/api/', itemRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ StockView DB Connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on PORT: ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("DB Connection Error:", err);
//   });


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Setup: Allow local + Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://stock-view-puce.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('✅ StockView backend is running!');
});

// ✅ API Routes
app.use('/api/', itemRoutes);

// ✅ MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ StockView DB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on PORT: ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB Connection Error:", err);
  });
