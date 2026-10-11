# Notes App

**Name:** Saicharan Mallarapu  
**Roll No:** 24EG110A28  
**Department:** CSE-DS(A)

A simple web-based digital notebook to create, view, edit and delete notes.
Full-stack project: **React.js** (frontend) + **Spring Boot** (REST API) + **MySQL** (database).

## Features
- Create a note with title and content
- View all saved notes (newest first)
- Edit and update existing notes
- Delete notes (with confirmation)
- Live search by title or content
- Form validation (frontend and backend)
- Responsive UI, success/error toasts

## Project structure
```
notes-app/
├── backend/    Spring Boot (controller, service, repository, model, exception, config)
├── frontend/   React + Vite (components, API layer, styles)
└── database/   schema.sql (optional, Hibernate also creates the table)
```

## Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

## Setup

### 1. Database
Start MySQL. The database `notes_db` is created automatically on first run.
Edit the credentials in `backend/src/main/resources/application.properties`:
```
spring.datasource.username=root
spring.datasource.password=root
```
(Optional: run `database/schema.sql` yourself to create the table with sample notes.)

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
API runs at `http://localhost:8080`.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## REST API

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| GET    | `/api/notes`                 | List all notes                   |
| GET    | `/api/notes?search=keyword`  | Search by title or content       |
| GET    | `/api/notes/{id}`            | Get one note                     |
| POST   | `/api/notes`                 | Create a note                    |
| PUT    | `/api/notes/{id}`            | Update a note                    |
| DELETE | `/api/notes/{id}`            | Delete a note                    |

Request body for POST / PUT:
```json
{ "title": "My note", "content": "Some text" }
```

## Run tests
```bash
cd backend
mvn test
```
Tests use an in-memory H2 database, so MySQL is not needed for them.

## Troubleshooting
- **"Cannot reach the server"**: backend is not running, or port 8080 is busy.
- **Access denied for user**: fix MySQL username/password in `application.properties`.
- **CORS error**: if the frontend runs on a different port, add it to `app.cors.allowed-origins`.
