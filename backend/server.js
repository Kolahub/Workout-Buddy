require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts.js');
const userRoutes = require('./routes/user.js');

// express app
const app = express();

app.use(bodyParser.json());

// CORS middleware
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });