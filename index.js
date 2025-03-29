const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Jenkins CI!' });
});

app.get('/notfound', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = app; // Export the app for testing
