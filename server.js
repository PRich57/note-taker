const express = require('express');
const path = require('path');
const fsUtils = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid')
const notesData = require('./db/db.json');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Route to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// Create api route for /api/notes
app.get('/api/notes', (req, res) => {
  fsUtils.readFromFile('./db/db.json')
  .then((data) => {
    res.json(JSON.parse(data))
  })
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const userNote = {
    title: title,
    text: text,
    id: uuid()
  }
  fsUtils.readAndAppend(userNote, "./db/db.json")
  console.log(userNote)
  res.json("Note was added")
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});