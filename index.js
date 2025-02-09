const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
    console.log("Hello");
    res.json({ message: 'Server is running' });
});

// Query endpoint
app.post('/api/query', async (req, res) => {
  console.log("Hello again");
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'sqpass@123',
      database: 'testdb'
    });
    const [results] = await connection.execute(req.body.query);
    await connection.end();
    res.json(results);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});