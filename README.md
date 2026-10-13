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

---

## Run everything with Docker (one command)
```bash
docker compose up --build
```
Frontend: http://localhost:3000 · API: http://localhost:8080/api/notes · Health: http://localhost:8080/health

## Environment variables

| Where | Variable | Purpose |
|-------|----------|---------|
| Backend | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | MySQL connection (or Railway's `MYSQLHOST/PORT/DATABASE/USER/PASSWORD`, read automatically) |
| Backend | `CORS_ALLOWED_ORIGINS` | Frontend URL(s), comma separated, wildcards allowed |
| Backend | `PORT` | Set automatically by Render/Railway |
| Frontend | `VITE_API_URL` | Backend URL ending in `/api` (baked in at build time) |

See `backend/.env.example` and `frontend/.env.example`. Never commit real `.env` files.

## Deploy

**Recommended: Railway (backend + MySQL) + Vercel (frontend)**

1. Push to GitHub (see below).
2. Railway: New Project > Deploy from GitHub repo > set **Root Directory** to `backend`. Then **+ New > Database > MySQL**. In the backend service, add variable references to the MySQL service (`MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`) and `CORS_ALLOWED_ORIGINS` (set after step 3). Settings > Networking > Generate Domain.
3. Vercel: Add New Project > import repo > **Root Directory** `frontend` > env var `VITE_API_URL=https://<railway-domain>/api` > Deploy.
4. Copy the Vercel URL into Railway's `CORS_ALLOWED_ORIGINS`, e.g. `https://your-app.vercel.app,https://*.vercel.app`, and redeploy.

**Alternative: Render.** `render.yaml` defines the backend (Docker) and the frontend (static site). Render has no managed MySQL, so use Railway MySQL, Aiven or TiDB Cloud and set `DB_URL` / `DB_USERNAME` / `DB_PASSWORD`. Free instances sleep after inactivity, so the first request can be slow.

## Push to GitHub
```bash
git add -A
git commit -m "Add deployment configuration"
git push origin main
```
CI (`.github/workflows/ci.yml`) runs backend tests and the frontend build on every push.
