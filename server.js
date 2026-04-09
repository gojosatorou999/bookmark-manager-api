const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
// 1. Create a bookmark
app.post('/api/bookmarks', (req, res) => {
  const { title, url, tags } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' });
  }

  const query = `INSERT INTO bookmarks (title, url, tags) VALUES (?, ?, ?)`;
  db.run(query, [title, url, tags || ''], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create bookmark', details: err.message });
    }
    res.status(201).json({ id: this.lastID, title, url, tags: tags || '' });
  });
});

// 2. List bookmarks (with optional search by keyword or tag)
app.get('/api/bookmarks', (req, res) => {
  const { search, tag } = req.query;
  let query = `SELECT * FROM bookmarks`;
  let params = [];

  if (search || tag) {
    let searchCondition = [];
    if (search) {
      searchCondition.push(`(title LIKE ? OR url LIKE ?)`);
      params.push(`%${search}%`, `%${search}%`);
    }
    if (tag) {
      searchCondition.push(`tags LIKE ?`);
      params.push(`%${tag}%`);
    }
    query += ` WHERE ` + searchCondition.join(' AND ');
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch bookmarks', details: err.message });
    }
    res.json(rows);
  });
});

// 3. Delete a bookmark
app.delete('/api/bookmarks/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM bookmarks WHERE id = ?`;

  db.run(query, id, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete bookmark', details: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json({ message: 'Bookmark deleted' });
  });
});

// Add a test endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
  console.log(`Bookmark Manager API listening at http://localhost:${port}`);
});

