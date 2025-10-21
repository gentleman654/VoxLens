# PostgreSQL Setup Guide for VoxLens

## Step 1: Download and Install PostgreSQL

### Option A: Using Official Installer (Recommended for Windows)

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Choose the latest version (PostgreSQL 16.x)
   - Download the Windows x86-64 installer

2. **Run the Installer:**
   - Double-click the downloaded `.exe` file
   - Click "Next" through the welcome screen
   - **Installation Directory:** Keep default (`C:\Program Files\PostgreSQL\16`)
   - **Select Components:** Check all (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
   - **Data Directory:** Keep default
   - **Password:** Set a password for the `postgres` superuser
     - **IMPORTANT:** Remember this password! You'll need it for the `.env` file
     - Example: `your_secure_password_123`
   - **Port:** Keep default (`5432`)
   - **Locale:** Keep default
   - Click "Next" and then "Finish"

### Option B: Using Chocolatey (Alternative)

```powershell
# If you have Chocolatey installed
choco install postgresql
```

## Step 2: Verify Installation

Open PowerShell and verify PostgreSQL is installed:

```powershell
# Check PostgreSQL version
psql --version

# If not found, add to PATH:
# C:\Program Files\PostgreSQL\16\bin
```

## Step 3: Create VoxLens Database

### Using psql Command Line:

```powershell
# Connect to PostgreSQL as superuser
psql -U postgres

# You'll be prompted for the password you set during installation
```

Once connected, run these SQL commands:

```sql
-- Create the voxlens database
CREATE DATABASE voxlens;

-- Create a dedicated user for the application (optional but recommended)
CREATE USER voxlens_user WITH PASSWORD 'voxlens_password_123';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE voxlens TO voxlens_user;

-- Connect to the voxlens database
\c voxlens

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO voxlens_user;

-- List databases to verify
\l

-- Exit psql
\q
```

### Using pgAdmin 4 (GUI):

1. Open **pgAdmin 4** (installed with PostgreSQL)
2. Connect to the PostgreSQL server (use your postgres password)
3. Right-click "Databases" → "Create" → "Database"
4. **Database name:** `voxlens`
5. **Owner:** `postgres`
6. Click "Save"

## Step 4: Configure Backend .env File

Navigate to the backend directory and create `.env`:

```powershell
cd "d:\PORTFOLIO\ELECTION PREDICTION\backend"
cp .env.example .env
```

Edit the `.env` file with your PostgreSQL credentials:

```env
# Database - Update with your PostgreSQL password
DATABASE_URL=postgresql+asyncpg://postgres:your_secure_password_123@localhost:5432/voxlens

# OR if you created a dedicated user:
# DATABASE_URL=postgresql+asyncpg://voxlens_user:voxlens_password_123@localhost:5432/voxlens
```

## Step 5: Install Python Dependencies

```powershell
cd "d:\PORTFOLIO\ELECTION PREDICTION\backend"

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Step 6: Setup Database Migrations with Alembic

```powershell
# Make sure you're in the backend directory
cd "d:\PORTFOLIO\ELECTION PREDICTION\backend"

# Initialize Alembic (creates alembic/ folder and alembic.ini)
alembic init alembic
```

This will create:
- `alembic/` directory with migration files
- `alembic.ini` configuration file

## Step 7: Configure Alembic

Edit `alembic.ini` and update the database URL:

Find this line (around line 63):
```ini
sqlalchemy.url = driver://user:pass@localhost/dbname
```

Replace with:
```ini
# Comment out or delete this line, we'll use env.py instead
# sqlalchemy.url = postgresql+asyncpg://postgres:your_password@localhost:5432/voxlens
```

Edit `alembic/env.py`:

Add these imports at the top:
```python
from app.core.config import settings
from app.db.session import Base
from app.db.models import *  # Import all models
```

Find the `config.set_main_option()` line and update:
```python
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
```

Find `target_metadata` and update:
```python
target_metadata = Base.metadata
```

## Step 8: Create and Run Initial Migration

```powershell
# Create initial migration
alembic revision --autogenerate -m "Initial database schema"

# Apply the migration to create tables
alembic upgrade head
```

## Step 9: Verify Database Setup

Connect to PostgreSQL and verify tables were created:

```powershell
psql -U postgres -d voxlens
```

```sql
-- List all tables
\dt

-- Should see:
-- users
-- searches
-- tweets
-- sentiments
-- saved_searches
-- reports
-- alembic_version

-- Exit
\q
```

## Step 10: Start the Backend Server

```powershell
cd "d:\PORTFOLIO\ELECTION PREDICTION\backend"

# Make sure virtual environment is activated
.\venv\Scripts\activate

# Start the server
python -m app.main

# Or with uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Visit: http://localhost:8000/docs to see the API documentation!

## Troubleshooting

### Issue: "psql is not recognized"
**Solution:** Add PostgreSQL to PATH:
1. Search "Environment Variables" in Windows
2. Edit "Path" in System Variables
3. Add: `C:\Program Files\PostgreSQL\16\bin`
4. Restart PowerShell

### Issue: "Connection refused"
**Solution:** Check if PostgreSQL service is running:
```powershell
# Check service status
Get-Service postgresql*

# Start service if stopped
Start-Service postgresql-x64-16
```

### Issue: "password authentication failed"
**Solution:** Double-check your password in `.env` matches your PostgreSQL password

### Issue: "database does not exist"
**Solution:** Create the database using the SQL commands in Step 3

### Issue: Alembic migration errors
**Solution:** 
1. Make sure all models are imported in `alembic/env.py`
2. Check `DATABASE_URL` in `.env` is correct
3. Delete `alembic/versions/` folder and re-create migration

## Quick Reference Commands

```powershell
# Connect to PostgreSQL
psql -U postgres

# Connect to voxlens database
psql -U postgres -d voxlens

# List databases
\l

# List tables
\dt

# Describe table
\d users

# Drop database (if you need to start over)
DROP DATABASE voxlens;

# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Next Steps After Setup

1. ✅ PostgreSQL installed and running
2. ✅ voxlens database created
3. ✅ Backend .env configured
4. ✅ Dependencies installed
5. ✅ Database tables created via Alembic
6. ✅ Backend server running

**Now you can:**
- Test API endpoints at http://localhost:8000/docs
- Register a user via the API
- Connect the frontend to the backend
- Start building the sentiment analysis features!
