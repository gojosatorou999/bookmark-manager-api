# Bookmark Manager API

A backend service built with Node.js, Express, and SQLite for managing bookmarks.

## Features
- Save bookmarks with title, URL, and optional tags.
- List all bookmarks or search by keyword/tag.
- Delete bookmarks by ID.

## Data Model
- **id**: (Integer, Primary Key) Autoincremented identifier.
- **title**: (String, Required) The title of the bookmark.
- **url**: (String, Required) The destination URL.
- **tags**: (String, Optional) Comma-separated list of tags.
- **created_at**: (Datetime) Automatic timestamp.

## Getting Started

### 1. Installation
Install the necessary dependencies:
```bash
npm install
```

### 2. Run the Server
Start the application:
```bash
node server.js
```
The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Create Bookmark
`POST /api/bookmarks`
- **Body**: `{ "title": "Google", "url": "https://google.com", "tags": "search,web" }`
- **Response**: Details of the created bookmark (including ID).

### 2. List Bookmarks
`GET /api/bookmarks`
- **Query Params**:
  - `search`: Filter by title or URL (optional).
  - `tag`: Filter by tags (optional).
- **Response**: Array of bookmark objects.

### 3. Delete Bookmark
`DELETE /api/bookmarks/:id`
- **Response**: Success message.

## Example Requests

### Save a Bookmark
```bash
curl -X POST http://localhost:3000/api/bookmarks \
     -H "Content-Type: application/json" \
     -d '{"title": "OpenAI", "url": "https://openai.com", "tags": "ai,tools"}'
```

### List All Bookmarks
```bash
curl http://localhost:3000/api/bookmarks
```

### Search by Keyword
```bash
curl http://localhost:3000/api/bookmarks?search=AI
```

### Search by Tag
```bash
curl http://localhost:3000/api/bookmarks?tag=tools
```

### Delete a Bookmark
```bash
curl -X DELETE http://localhost:3000/api/bookmarks/1
```
