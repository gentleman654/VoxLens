# VoxLens Backend

FastAPI backend for the VoxLens sentiment analysis platform.

## Features

- ✅ User authentication (JWT + OAuth)
- ✅ RESTful API endpoints
- ✅ PostgreSQL database with async SQLAlchemy
- ✅ Pydantic validation
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Search history management
- ✅ Saved searches with alerts
- ✅ Credits system

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 3. Setup Database

Install PostgreSQL and create database:

```sql
CREATE DATABASE voxlens;
```

### 4. Run Migrations

```bash
# Initialize Alembic (first time only)
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 5. Start Server

```bash
# Development
python -m app.main

# Or with uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py          # Authentication endpoints
│   │       └── searches.py      # Search & saved search endpoints
│   ├── core/
│   │   ├── config.py            # Configuration settings
│   │   └── security.py          # JWT & password utilities
│   ├── db/
│   │   ├── models.py            # SQLAlchemy models
│   │   └── session.py           # Database session
│   ├── schemas/
│   │   └── schemas.py           # Pydantic schemas
│   └── main.py                  # FastAPI application
├── requirements.txt             # Python dependencies
└── .env.example                 # Environment variables template
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout user

### Searches

- `POST /api/v1/searches/` - Create new analysis
- `GET /api/v1/searches/` - Get search history
- `GET /api/v1/searches/{id}` - Get specific search
- `DELETE /api/v1/searches/{id}` - Delete search

### Saved Searches

- `GET /api/v1/searches/saved/all` - Get all saved searches
- `POST /api/v1/searches/saved` - Save a search
- `PATCH /api/v1/searches/saved/{id}` - Update saved search
- `DELETE /api/v1/searches/saved/{id}` - Delete saved search

## Database Models

- **User**: User accounts with authentication
- **Search**: Sentiment analysis searches
- **Tweet**: Individual tweets from searches
- **Sentiment**: Sentiment analysis results per tweet
- **SavedSearch**: User's saved search topics
- **Report**: Generated reports (PDF/CSV)

## Development

### Run Tests

```bash
pytest
```

### Format Code

```bash
black app/
isort app/
```

### Type Checking

```bash
mypy app/
```

## Next Steps

- [ ] Implement Twitter/X scraping (nitter-scraper)
- [ ] Add Celery for async tasks
- [ ] Implement sentiment analysis models (VADER, RoBERTa)
- [ ] Add sarcasm detection
- [ ] Add emotion classification
- [ ] Add entity extraction
- [ ] Implement report generation (PDF/CSV)
- [ ] Add WebSocket support for real-time updates
- [ ] Add email notifications
- [ ] Add rate limiting with Redis
- [ ] Add comprehensive tests

## License

MIT
