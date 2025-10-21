---
applyTo: '**'
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# VoxLens - Real-Time Sentiment Analysis Platform

## Project Overview

**VoxLens** is a full-stack web application that allows users to analyze public sentiment on any topic using real-time Twitter data. The platform uses advanced AI/ML models to classify sentiment, detect sarcasm, identify emotions, and extract key entities from tweets.

**Target Audience:** Portfolio project to demonstrate advanced full-stack development, AI/ML integration, and real-time systems architecture.

**Tagline:** "Real-Time Public Sentiment Analysis on Any Topic"

---

## Core Concept

Users can input ANY search query (political figure, policy, brand, event, trend) and receive:

- Real-time sentiment analysis (Positive, Negative, Neutral, Sarcastic)
- Live tweet streaming via WebSockets
- Multi-model AI comparison (VADER, RoBERTa, Custom)
- Emotion detection (joy, anger, fear, surprise, sadness)
- Entity extraction (people, places, organizations)
- Historical trend analysis
- Downloadable reports (PDF/CSV)
- Comparison mode (compare multiple topics side-by-side)

---

## Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Charts:** Recharts (primary) + D3.js (advanced visualizations)
- **State Management:** Zustand (global state) + TanStack Query (server state)
- **Real-time:** Socket.io-client
- **Authentication:** NextAuth.js (Email, Google OAuth, GitHub OAuth)
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui (Button, Card, Dialog, Select, etc.)

### Backend

- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+ (via SQLAlchemy async ORM)
- **Cache/Queue:** Redis (rate limiting, caching, Celery broker)
- **Task Queue:** Celery (async tweet processing)
- **Authentication:** JWT tokens + OAuth2 + PassLib
- **Validation:** Pydantic v2
- **Rate Limiting:** slowapi + Redis
- **WebSockets:** FastAPI WebSocket support
- **Migrations:** Alembic

### AI/ML Stack

- **Sentiment Analysis:**
  - VADER (vaderSentiment) - Rule-based, fast
  - RoBERTa (cardiffnlp/twitter-roberta-base-sentiment-latest) - Transformer-based
  - DistilBERT (optional custom fine-tuned model)
- **Sarcasm Detection:** helinivan/sarcasm-detection-model (Hugging Face)
- **Emotion Classification:** SamLowe/roberta-base-go_emotions
- **Entity Extraction:** spaCy (en_core_web_trf)
- **Libraries:** transformers, torch, spacy, nltk, vaderSentiment

### Data Source

- **Primary:** nitter-scraper (free, no API key needed)
- **Fallback:** snscrape
- **Data Processing:** pandas, numpy

### Report Generation

- **PDF:** WeasyPrint (HTML to PDF) + Jinja2 templates
- **Charts in PDF:** matplotlib (static charts)
- **Export Formats:** PDF (full report), CSV (raw data), JSON (API export)

### Deployment

- **Frontend:** Vercel (Next.js optimized, automatic SSL)
- **Backend:** Railway (FastAPI + Celery worker)
- **Database:** Railway PostgreSQL
- **Redis:** Railway Redis
- **Storage:** Vercel Blob (for PDF reports)
- **Monitoring:** Sentry (error tracking)
- **Domain:** Custom domain via Vercel

---

## Project Structure

```
voxlens/
├── frontend/                    # Next.js frontend
│   ├── app/
│   │   ├── (auth)/             # Auth routes
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── verify/
│   │   ├── (dashboard)/        # Protected routes
│   │   │   ├── analyze/        # Main analysis page
│   │   │   ├── dashboard/      # User dashboard
│   │   │   ├── history/        # Search history
│   │   │   ├── saved/          # Saved searches
│   │   │   └── settings/       # User settings
│   │   ├── api/                # API routes (NextAuth, etc.)
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── charts/             # Chart components
│   │   ├── analysis/           # Analysis-specific components
│   │   ├── auth/               # Auth components
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   ├── auth.ts             # NextAuth config
│   │   ├── socket.ts           # Socket.io client
│   │   └── utils.ts            # Utilities
│   ├── store/                  # Zustand stores
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── public/
│
├── backend/                     # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── auth.py     # Auth endpoints
│   │   │   │   ├── analyze.py  # Analysis endpoints
│   │   │   │   ├── searches.py # Search history
│   │   │   │   ├── reports.py  # Report generation
│   │   │   │   └── users.py    # User management
│   │   │   └── deps.py         # Dependencies
│   │   ├── core/
│   │   │   ├── config.py       # Settings
│   │   │   ├── security.py     # JWT, passwords
│   │   │   └── rate_limit.py   # Rate limiting
│   │   ├── db/
│   │   │   ├── models.py       # SQLAlchemy models
│   │   │   ├── session.py      # Database session
│   │   │   └── init_db.py      # Database initialization
│   │   ├── ml/
│   │   │   ├── sentiment.py    # Sentiment models
│   │   │   ├── sarcasm.py      # Sarcasm detection
│   │   │   ├── emotion.py      # Emotion classification
│   │   │   └── entities.py     # Entity extraction
│   │   ├── scraper/
│   │   │   ├── nitter.py       # Nitter scraper
│   │   │   └── processor.py    # Tweet processing
│   │   ├── tasks/
│   │   │   └── celery_tasks.py # Celery async tasks
│   │   ├── websocket/
│   │   │   └── manager.py      # WebSocket manager
│   │   ├── reports/
│   │   │   ├── generator.py    # Report generation
│   │   │   └── templates/      # Jinja2 templates
│   │   ├── schemas/
│   │   │   └── *.py            # Pydantic schemas
│   │   └── main.py             # FastAPI app
│   ├── alembic/                # Database migrations
│   ├── tests/
│   └── requirements.txt
│
├── docs/                        # Documentation
└── README.md
```

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255),      -- NULL for OAuth users
  full_name VARCHAR(100),
  avatar_url TEXT,
  tier VARCHAR(20) DEFAULT 'free', -- free, pro, admin
  credits_remaining INTEGER DEFAULT 50,
  credits_reset_date TIMESTAMP,
  oauth_provider VARCHAR(50),      -- google, github, null
  oauth_id VARCHAR(255),
  email_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Searches Table

```sql
CREATE TABLE searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  status VARCHAR(20),              -- pending, processing, completed, failed
  total_tweets INTEGER DEFAULT 0,
  sentiment_summary JSONB,         -- {positive: 45, negative: 30, neutral: 20, sarcastic: 5}
  emotion_summary JSONB,
  entities JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

### Tweets Table

```sql
CREATE TABLE tweets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
  tweet_id VARCHAR(50) UNIQUE,
  text TEXT NOT NULL,
  author_username VARCHAR(100),
  author_name VARCHAR(100),
  created_at_twitter TIMESTAMP,
  retweet_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  location VARCHAR(255),
  raw_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Sentiments Table

```sql
CREATE TABLE sentiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tweet_id UUID REFERENCES tweets(id) ON DELETE CASCADE,
  model_name VARCHAR(50),          -- vader, roberta, custom
  sentiment_label VARCHAR(20),     -- positive, negative, neutral
  confidence_score FLOAT,
  is_sarcastic BOOLEAN DEFAULT false,
  sarcasm_score FLOAT,
  emotions JSONB,                  -- {joy: 0.8, anger: 0.2, ...}
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Saved Searches Table

```sql
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  alert_enabled BOOLEAN DEFAULT false,
  alert_threshold FLOAT,
  last_checked TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Reports Table

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  format VARCHAR(10),              -- pdf, csv, json
  file_url TEXT,
  file_size_kb INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP             -- Auto-delete after 7 days
);
```

---

## Key Features

### 1. Universal Topic Analysis

- User inputs any search query
- System fetches recent tweets (last 7 days default)
- Analyzes sentiment: Positive, Negative, Neutral, Sarcastic
- Shows overall sentiment breakdown with confidence scores

### 2. Real-Time Data Stream

- Live tweet feed via WebSockets
- Auto-refresh every 30 seconds (configurable)
- Shows individual tweets with sentiment labels
- Filters: time range, sentiment type, verified accounts only

### 3. Multi-Model AI Comparison

- Run 3 sentiment models simultaneously:
  - VADER (rule-based, fast)
  - RoBERTa (transformer, accurate)
  - Custom fine-tuned model
- Display accuracy comparison
- Toggle between models in UI
- Show confidence scores per model

### 4. Sarcasm & Emotion Detection

- Detect sarcasm (separate from positive/negative)
- Multi-emotion classification: joy, anger, fear, surprise, sadness
- Emotion intensity scores
- Highlight sarcastic tweets separately

### 5. Entity & Aspect Analysis

- Extract mentioned entities (people, places, organizations)
- Show most mentioned entities
- Aspect-based sentiment (if applicable)

### 6. Interactive Visualizations

- Sentiment pie chart (Positive/Negative/Neutral/Sarcastic)
- Timeline chart (sentiment trends over time)
- Word cloud (most mentioned words)
- Top influential tweets (most retweets/likes)
- Emotion bar chart
- Entity frequency chart

### 7. Historical Tracking

- Save search queries to database
- Compare sentiment over time for same topic
- Show "sentiment shift" indicators
- Export historical data as CSV

### 8. User Authentication & Dashboard

- Sign up/login (Email + Google OAuth + GitHub OAuth)
- User dashboard with saved searches
- Search history
- Usage statistics
- Profile settings

### 9. Rate Limiting & Credits System

- Free tier: 50 searches/month, 5/hour
- Pro tier: 500 searches/month, 50/hour
- Display remaining credits
- Auto-reset monthly
- Rate limiting per user and per IP

### 10. Report Generation

- Auto-generate PDF reports
- Include charts, key insights, top tweets
- CSV export (raw data)
- JSON export (API format)
- Shareable links (7-day expiry)

### 11. Comparison Mode

- Compare 2-3 topics side-by-side
- Show relative sentiment differences
- Comparative visualizations

### 12. WebSocket Live Updates

- Real-time dashboard refresh
- Live tweet feed
- Progress updates during analysis
- Sentiment updates as tweets are processed

---

## User Tiers & Rate Limiting

### Free Tier

- **Credits:** 50 searches/month
- **Rate Limit:** 5 searches/hour
- **Features:**
  - Basic sentiment analysis (VADER only)
  - 7-day historical data
  - Standard visualizations
  - Email alerts (1 topic)
  - CSV export only

### Pro Tier (Optional - for showcase)

- **Credits:** 500 searches/month
- **Rate Limit:** 50 searches/hour
- **Features:**
  - All AI models (VADER + RoBERTa + Custom)
  - 30-day historical data
  - Sarcasm detection
  - Emotion analysis
  - Entity extraction
  - Unlimited email alerts
  - PDF + CSV export
  - Priority processing
  - API access

### Admin Tier

- **Unlimited access** for development and demos

---

## Authentication Providers

1. **Email/Password**

   - Email verification required
   - Password reset via email
   - bcrypt hashing

2. **Google OAuth**

   - One-click signup
   - Auto-fills name, email, avatar

3. **GitHub OAuth**
   - Developer-friendly
   - Auto-fills profile data

---

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login (returns JWT)
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/verify-email` - Verify email

### Analysis

- `POST /api/v1/analyze` - Start new analysis
- `GET /api/v1/analyze/{search_id}` - Get analysis results
- `GET /api/v1/analyze/{search_id}/tweets` - Get analyzed tweets
- `DELETE /api/v1/analyze/{search_id}` - Delete analysis

### Searches

- `GET /api/v1/searches` - Get user's search history
- `GET /api/v1/searches/saved` - Get saved searches
- `POST /api/v1/searches/save` - Save a search
- `DELETE /api/v1/searches/{search_id}` - Delete saved search

### Reports

- `POST /api/v1/reports/generate` - Generate report
- `GET /api/v1/reports/{report_id}` - Download report
- `GET /api/v1/reports` - List user reports

### Users

- `GET /api/v1/users/me` - Get current user
- `PATCH /api/v1/users/me` - Update profile
- `GET /api/v1/users/me/credits` - Get credit balance

### WebSocket

- `WS /ws/analyze/{search_id}` - Live analysis updates

---

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Backend (.env)

```env
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/voxlens
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your-jwt-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# OAuth (if needed for backend validation)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email (for verification/password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Storage
STORAGE_URL=your-vercel-blob-url
```

---

## Development Guidelines

### Code Style

- **Frontend:** ESLint + Prettier
- **Backend:** Black (code formatter) + isort + flake8
- **TypeScript:** Strict mode enabled
- **Python:** Type hints required

### Git Workflow

- **Main branch:** Production-ready code
- **Develop branch:** Integration branch
- **Feature branches:** `feature/feature-name`
- **Commit format:** Conventional Commits

### Testing

- **Frontend:** Jest + React Testing Library
- **Backend:** pytest + pytest-asyncio
- **Coverage target:** >80%

### Performance

- **Frontend:**
  - Code splitting (Next.js automatic)
  - Image optimization (next/image)
  - Lazy loading
  - Debouncing search inputs
- **Backend:**
  - Database query optimization
  - Redis caching (24hr TTL for tweets)
  - Async processing (Celery)
  - Connection pooling

### Security

- **Authentication:** JWT with refresh tokens
- **Passwords:** bcrypt hashing
- **Rate limiting:** Per user + per IP
- **Input validation:** Pydantic + Zod
- **SQL injection:** ORM protection
- **CORS:** Frontend domain only
- **CSRF:** Protection enabled

---

## User Flow

### New User Journey

1. **Landing Page**

   - Hero section: "Analyze Public Sentiment on Any Topic"
   - Feature highlights
   - Sample analyses
   - CTA: "Try Free" or "Sign Up"

2. **Sign Up**

   - Email/password or OAuth (Google/GitHub)
   - Email verification sent

3. **Verify Email**

   - Click verification link
   - Redirect to dashboard

4. **Dashboard**

   - Welcome message
   - Quick start guide
   - "New Analysis" button prominent

5. **Create First Analysis**

   - Enter topic (e.g., "climate change")
   - Select time range (7 days default)
   - Click "Analyze"
   - Loading animation

6. **View Results**

   - Live tweet feed (right sidebar)
   - Sentiment breakdown (pie chart)
   - Timeline graph
   - Word cloud
   - Top tweets
   - Model comparison toggle
   - Save search button
   - Download report button

7. **Save Search**

   - Add to saved searches
   - Enable alerts (optional)

8. **Download Report**
   - Choose format (PDF/CSV)
   - Generate and download

### Returning User Journey

1. **Login**

   - Email/password or OAuth

2. **Dashboard**

   - View saved searches
   - Recent analyses
   - Usage statistics (credits remaining)

3. **Quick Re-analyze**
   - Click saved search
   - See updated results

---

## Deployment Steps

### Frontend (Vercel)

1. Connect GitHub repository
2. Configure environment variables
3. Deploy (automatic)
4. Add custom domain (optional)

### Backend (Railway)

1. Create new project
2. Add PostgreSQL database
3. Add Redis service
4. Deploy FastAPI app
5. Deploy Celery worker (separate service)
6. Configure environment variables
7. Run database migrations

### Post-Deployment

1. Test all API endpoints
2. Test OAuth flows
3. Test WebSocket connections
4. Monitor error rates (Sentry)
5. Set up uptime monitoring

---

## Success Metrics

### Technical Metrics

- **Response Time:** < 2s for analysis start
- **WebSocket Latency:** < 100ms
- **Database Queries:** < 50ms average
- **Uptime:** > 99%
- **Error Rate:** < 1%

### Feature Metrics

- **Sentiment Accuracy:** > 85% (compared to manual labeling)
- **Sarcasm Detection:** > 75% accuracy
- **Entity Extraction:** > 90% precision

### User Metrics

- **User Signups:** Track for portfolio showcase
- **Active Searches:** Daily/weekly/monthly
- **Report Downloads:** Track usage
- **Average Session Duration:** Target > 5 minutes

---

## Portfolio Showcase Points

This project demonstrates:

✅ **Full-Stack Development**

- Next.js 14 with App Router (latest best practices)
- TypeScript for type safety
- FastAPI async backend
- PostgreSQL database design

✅ **AI/ML Integration**

- Multiple sentiment analysis models
- Sarcasm detection (advanced NLP)
- Emotion classification
- Entity extraction
- Model comparison and evaluation

✅ **Real-Time Systems**

- WebSocket implementation
- Live data streaming
- Async task processing (Celery)

✅ **System Design**

- Database schema design
- API design (RESTful)
- Rate limiting implementation
- Caching strategy (Redis)

✅ **Authentication & Authorization**

- JWT tokens
- OAuth2 (Google + GitHub)
- Role-based access control

✅ **DevOps**

- Docker containerization
- CI/CD pipeline
- Production deployment
- Monitoring and logging

✅ **User Experience**

- Responsive design
- Interactive visualizations
- Report generation
- Real-time feedback

---

## Development Phases

### Phase 1: Foundation (Week 1)

- [ ] Set up Next.js frontend
- [ ] Set up FastAPI backend
- [ ] Configure PostgreSQL + Redis
- [ ] Implement basic authentication
- [ ] Create database models
- [ ] Set up development environment

### Phase 2: Core Features (Week 2)

- [ ] Implement nitter-scraper integration
- [ ] Build VADER sentiment analysis
- [ ] Create basic analysis API endpoint
- [ ] Build analysis dashboard UI
- [ ] Implement basic visualizations
- [ ] Add WebSocket support

### Phase 3: Advanced AI/ML (Week 3)

- [ ] Integrate RoBERTa model
- [ ] Implement sarcasm detection
- [ ] Add emotion classification
- [ ] Implement entity extraction
- [ ] Create model comparison UI
- [ ] Add multi-model toggle

### Phase 4: User Features (Week 4)

- [ ] Implement OAuth (Google + GitHub)
- [ ] Build user dashboard
- [ ] Add saved searches
- [ ] Implement rate limiting
- [ ] Create credits system
- [ ] Build comparison mode

### Phase 5: Reports & Polish (Week 5)

- [ ] Implement PDF report generation
- [ ] Add CSV/JSON export
- [ ] Create email alerts
- [ ] Build admin panel
- [ ] Performance optimization
- [ ] UI/UX polish

### Phase 6: Deployment (Week 6)

- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Set up monitoring (Sentry)
- [ ] Configure custom domain
- [ ] Load testing
- [ ] Documentation

---

## Important Notes for AI Coding Assistants

### When Building This Project:

1. **Use TypeScript Strictly**

   - All frontend code must be TypeScript
   - Define proper interfaces/types
   - No `any` types unless absolutely necessary

2. **Follow Next.js 14 App Router Patterns**

   - Use Server Components by default
   - Add 'use client' only when needed
   - Leverage Server Actions where appropriate

3. **Database Operations**

   - Always use async/await with SQLAlchemy
   - Use transactions for multi-step operations
   - Add proper indexes for performance

4. **Error Handling**

   - Use try/catch blocks
   - Return proper HTTP status codes
   - Log errors to Sentry
   - User-friendly error messages

5. **Security First**

   - Validate all inputs (Pydantic + Zod)
   - Sanitize user-generated content
   - Rate limit all public endpoints
   - Never expose sensitive data in logs

6. **Performance**

   - Cache frequently accessed data (Redis)
   - Use database connection pooling
   - Implement pagination for lists
   - Lazy load heavy components

7. **Testing**

   - Write tests for critical paths
   - Mock external services (Twitter scraper)
   - Test authentication flows
   - Test rate limiting

8. **Documentation**
   - Comment complex logic
   - Document all API endpoints
   - Keep this instructions file updated
   - Write clear commit messages

---

## Example User Queries to Test

- "Donald Trump"
- "Joe Biden"
- "Climate change policies"
- "Taylor Swift"
- "Israel Palestine conflict"
- "Apple iPhone 16"
- "ChatGPT"
- "Elon Musk Twitter"
- "Bitcoin price"
- "COVID-19 vaccines"

---

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Hugging Face Models](https://huggingface.co/models)
- [spaCy Documentation](https://spacy.io/usage)

### Tutorials

- Next.js App Router: https://nextjs.org/docs/app
- FastAPI + SQLAlchemy: https://fastapi.tiangolo.com/tutorial/sql-databases/
- NextAuth.js: https://next-auth.js.org/
- Socket.io: https://socket.io/docs/v4/

---

## License

MIT License (for portfolio purposes)

---

## Contact

Developer: [Your Name]
Portfolio: [Your Portfolio URL]
GitHub: [Your GitHub URL]
Email: [Your Email]

---

**This is a learning/portfolio project built with AI-assisted coding to demonstrate full-stack development, AI/ML integration, and modern web technologies.**
