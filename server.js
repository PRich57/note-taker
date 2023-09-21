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

// Create api route for /api/notes
app.get('/api/notes', (req, res) => {
  res.json(notesData);
});

app.post('/api/notes', (req, res) => {
  // Let the user know that their POST request was received
  console.info(`${req.method} request received`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object to be saved
    const newNote = {
      title,
      text,
    };
    
    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});