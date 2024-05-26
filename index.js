const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const boardRoutes = require('./src/routes/boardRoutes');
const listRoutes = require('./src/routes/listRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();



const app = express();
app.use(cors());

// Middleware

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes);



// Connect to MongoDB
console.log("waiting to connect: ",process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});