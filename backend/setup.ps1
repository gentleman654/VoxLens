# Quick Setup Script for VoxLens Backend
# Run this after installing PostgreSQL

Write-Host "VoxLens Backend Setup Script" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✓ PostgreSQL found: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ PostgreSQL not found!" -ForegroundColor Red
    Write-Host "Please install PostgreSQL first. See DATABASE_SETUP.md" -ForegroundColor Yellow
    exit 1
}

# Navigate to backend directory
$backendPath = "d:\PORTFOLIO\ELECTION PREDICTION\backend"
if (Test-Path $backendPath) {
    Set-Location $backendPath
    Write-Host "✓ Backend directory found" -ForegroundColor Green
} else {
    Write-Host "✗ Backend directory not found at: $backendPath" -ForegroundColor Red
    exit 1
}

# Check if .env exists
Write-Host ""
Write-Host "Checking .env configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠ IMPORTANT: Edit .env and update your PostgreSQL password!" -ForegroundColor Yellow
    Write-Host "   Find this line: DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/voxlens" -ForegroundColor White
    Write-Host "   Replace 'password' with your actual PostgreSQL password" -ForegroundColor White
    Write-Host ""
    $continue = Read-Host "Press Enter when you've updated .env (or Ctrl+C to exit)"
} else {
    Write-Host "✓ .env file exists" -ForegroundColor Green
}

# Check if virtual environment exists
Write-Host ""
Write-Host "Setting up Python virtual environment..." -ForegroundColor Yellow
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "✓ Virtual environment created" -ForegroundColor Green
} else {
    Write-Host "✓ Virtual environment already exists" -ForegroundColor Green
}

# Activate virtual environment and install dependencies
Write-Host ""
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"
pip install -r requirements.txt
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Prompt for database creation
Write-Host ""
Write-Host "Database Setup" -ForegroundColor Cyan
Write-Host "==============" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step: Create the PostgreSQL database" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1: Run these SQL commands manually:" -ForegroundColor White
Write-Host "  psql -U postgres" -ForegroundColor Gray
Write-Host "  CREATE DATABASE voxlens;" -ForegroundColor Gray
Write-Host "  \q" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 2: Let this script try to create it (requires postgres password)" -ForegroundColor White
Write-Host ""
$createDb = Read-Host "Create database automatically? (y/n)"

if ($createDb -eq "y" -or $createDb -eq "Y") {
    Write-Host ""
    Write-Host "Creating database..." -ForegroundColor Yellow
    $env:PGPASSWORD = Read-Host "Enter PostgreSQL postgres user password" -AsSecureString | ConvertFrom-SecureString
    psql -U postgres -c "CREATE DATABASE voxlens;"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database created successfully" -ForegroundColor Green
    } else {
        Write-Host "⚠ Database creation failed. It might already exist." -ForegroundColor Yellow
    }
}

# Initialize Alembic
Write-Host ""
Write-Host "Setting up database migrations..." -ForegroundColor Yellow
if (-not (Test-Path "alembic")) {
    Write-Host "Initializing Alembic..." -ForegroundColor Yellow
    alembic init alembic
    Write-Host "✓ Alembic initialized" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠ IMPORTANT: You need to configure Alembic manually" -ForegroundColor Yellow
    Write-Host "   See DATABASE_SETUP.md Step 7 for instructions" -ForegroundColor White
} else {
    Write-Host "✓ Alembic already initialized" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "Setup Summary" -ForegroundColor Cyan
Write-Host "=============" -ForegroundColor Cyan
Write-Host "✓ PostgreSQL checked" -ForegroundColor Green
Write-Host "✓ .env configured" -ForegroundColor Green
Write-Host "✓ Virtual environment created" -ForegroundColor Green
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Configure alembic/env.py (see DATABASE_SETUP.md Step 7)" -ForegroundColor White
Write-Host "2. Create initial migration: alembic revision --autogenerate -m 'Initial schema'" -ForegroundColor White
Write-Host "3. Apply migration: alembic upgrade head" -ForegroundColor White
Write-Host "4. Start server: python -m app.main" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see DATABASE_SETUP.md" -ForegroundColor Cyan
