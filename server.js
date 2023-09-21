const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

// Route to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// Fallback to index.html when user attempts to visit routes that don't exist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});