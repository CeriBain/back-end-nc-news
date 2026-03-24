# Northcoders News API
 
A RESTful API serving articles, topics, users, and comments — built as the back-end for a Reddit-style news aggregation app.
 
## Built With
 
- **Node.js** — runtime environment
- **Express** — web framework
- **PostgreSQL** — relational database
- **node-postgres (pg)** — database interaction
- **Jest & Supertest** — testing
 
## Getting Started
 
### Prerequisites
 
- Node.js (v18+)
- PostgreSQL (v14+)
 
### Installation
 
1. Clone the repo:
 
```bash
git clone https://github.com/<your-username>/nc-news.git
cd nc-news
```
 
2. Install dependencies:
 
```bash
npm install
```
 
3. Create environment files:
 
You'll need two `.env` files in the project root:
 
**.env.development**
 
```
PGDATABASE=nc_news
```
 
**.env.test**
 
```
PGDATABASE=nc_news_test
```
 
4. Set up and seed the databases:
 
```bash
npm run setup-dbs
npm run seed
```
 
5. Run the server:
 
```bash
npm start
```
 
## API Endpoints
 
| Method | Endpoint                               | Description                          |
| ------ | -------------------------------------- | ------------------------------------ |
| GET    | `/api`                                 | Serves a JSON of all available endpoints |
| GET    | `/api/topics`                          | Returns all topics                   |
| GET    | `/api/articles`                        | Returns all articles (supports queries) |
| GET    | `/api/articles/:article_id`            | Returns a single article by ID (includes comment count) |
| GET    | `/api/articles/:article_id/comments`   | Returns comments for an article      |
| POST   | `/api/articles/:article_id/comments`   | Adds a comment to an article         |
| PATCH  | `/api/articles/:article_id`            | Updates an article's vote count      |
| DELETE | `/api/comments/:comment_id`            | Deletes a comment                    |
| GET    | `/api/users`                           | Returns all users                    |
 
### Query Parameters (GET /api/articles)
 
| Query      | Description                        | Default        |
| ---------- | ---------------------------------- | -------------- |
| `sort_by`  | Column to sort by                  | `created_at`   |
| `order`    | `asc` or `desc`                    | `desc`         |
| `topic`    | Filters articles by topic slug     | —              |
 
## Running Tests
 
```bash
npm test
```
 
## Project Structure
 
```
├── __tests__/       # Integration tests
├── controllers/     # Request handlers
├── db/
│   ├── data/        # Dev and test seed data
│   ├── seeds/       # Seed functions
│   └── setup.sql    # Database creation
├── models/          # Database queries
├── routes/          # Express routers
├── app.js           # Express app setup
├── listen.js        # Server entry point
└── endpoints.json   # API documentation
```
 
---
 
This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).
