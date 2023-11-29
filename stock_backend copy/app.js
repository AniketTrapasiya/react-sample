const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { fetchData, data, sma, vwap, pattern } = require('./service');
const httpLogger = require('./middlewares');

const app = express();
const port = process.env.PORT || 5050;

// Enable CORS for all routes
app.use(cors());

// Set security headers using Helmet middleware
app.use(helmet());

// Body parsing middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// Define your API routes here
app.post('/data/data', async (req, res) => {
    await fetchData(req, res);
});

app.post('/data/prediction', async (req, res) => {
    await data(req, res);
});

app.post('/data/sma', async (req, res) => {
    await sma(req, res);
});

app.post('/data/vwap', async (req, res) => {
    await vwap(req, res);
});

app.post('/data/pattern', async (req, res) => {
    await pattern(req, res);
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
