const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));