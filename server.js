const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const app = express();
connectDb();
const port = process.env.PORT || 5000;

// to parse the datastream:
app.use(express.json());

// Routes:
app.use('/api/users', require('./routes/userRoutes'));

// Error Handler middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});