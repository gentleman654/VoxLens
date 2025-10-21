from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, func
from typing import Optional
from uuid import UUID
from app.db.session import get_db
from app.db.models import User, Search, SavedSearch
from app.schemas.schemas import (
    SearchCreate,
    SearchResponse,
    SearchListResponse,
    SavedSearchCreate,
    SavedSearchUpdate,
    SavedSearchResponse,
    MessageResponse
)
from app.api.v1.auth import get_current_user

router = APIRouter()


@router.post("/", response_model=SearchResponse, status_code=status.HTTP_201_CREATED)
async def create_search(
    search_data: SearchCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new sentiment analysis search"""
    # Check if user has credits
    if current_user.credits_remaining <= 0:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="No credits remaining. Please upgrade to continue."
        )
    
    # Create search
    new_search = Search(
        user_id=current_user.id,
        query=search_data.query,
        time_range=search_data.time_range,
        status="pending"
    )
    
    db.add(new_search)
    
    # Deduct credit
    current_user.credits_remaining -= 1
    
    await db.commit()
    await db.refresh(new_search)
    
    # TODO: Trigger async analysis task with Celery
    # celery_app.send_task("analyze_sentiment", args=[str(new_search.id)])
    
    return new_search


@router.get("/", response_model=SearchListResponse)
async def get_searches(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    query: Optional[str] = None,
    status_filter: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's search history"""
    # Build query
    stmt = select(Search).filter(Search.user_id == current_user.id)
    
    if query:
        stmt = stmt.filter(Search.query.ilike(f"%{query}%"))
    
    if status_filter:
        stmt = stmt.filter(Search.status == status_filter)
    
    # Get total count
    count_stmt = select(func.count()).select_from(stmt.subquery())
    total_result = await db.execute(count_stmt)
    total = total_result.scalar()
    
    # Apply pagination
    stmt = stmt.order_by(desc(Search.created_at))
    stmt = stmt.offset((page - 1) * page_size).limit(page_size)
    
    result = await db.execute(stmt)
    searches = result.scalars().all()
    
    return {
        "searches": searches,
        "total": total,
        "page": page,
        "page_size": page_size
    }


@router.get("/{search_id}", response_model=SearchResponse)
async def get_search(
    search_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific search by ID"""
    result = await db.execute(
        select(Search).filter(
            Search.id == search_id,
            Search.user_id == current_user.id
        )
    )
    search = result.scalar_one_or_none()
    
    if not search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Search not found"
        )
    
    return search


@router.delete("/{search_id}", response_model=MessageResponse)
async def delete_search(
    search_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a search"""
    result = await db.execute(
        select(Search).filter(
            Search.id == search_id,
            Search.user_id == current_user.id
        )
    )
    search = result.scalar_one_or_none()
    
    if not search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Search not found"
        )
    
    await db.delete(search)
    await db.commit()
    
    return {
        "message": "Search deleted successfully",
        "success": True
    }


# Saved Searches
@router.get("/saved/all", response_model=list[SavedSearchResponse])
async def get_saved_searches(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all saved searches for the user"""
    result = await db.execute(
        select(SavedSearch)
        .filter(SavedSearch.user_id == current_user.id)
        .order_by(desc(SavedSearch.created_at))
    )
    saved_searches = result.scalars().all()
    return saved_searches


@router.post("/saved", response_model=SavedSearchResponse, status_code=status.HTTP_201_CREATED)
async def create_saved_search(
    saved_search_data: SavedSearchCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Save a search for monitoring"""
    # Check if already saved
    result = await db.execute(
        select(SavedSearch).filter(
            SavedSearch.user_id == current_user.id,
            SavedSearch.query == saved_search_data.query
        )
    )
    existing = result.scalar_one_or_none()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This search is already saved"
        )
    
    new_saved_search = SavedSearch(
        user_id=current_user.id,
        query=saved_search_data.query,
        alert_enabled=saved_search_data.alert_enabled,
        alert_threshold=saved_search_data.alert_threshold
    )
    
    db.add(new_saved_search)
    await db.commit()
    await db.refresh(new_saved_search)
    
    return new_saved_search


@router.patch("/saved/{saved_search_id}", response_model=SavedSearchResponse)
async def update_saved_search(
    saved_search_id: UUID,
    update_data: SavedSearchUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update a saved search"""
    result = await db.execute(
        select(SavedSearch).filter(
            SavedSearch.id == saved_search_id,
            SavedSearch.user_id == current_user.id
        )
    )
    saved_search = result.scalar_one_or_none()
    
    if not saved_search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Saved search not found"
        )
    
    if update_data.alert_enabled is not None:
        saved_search.alert_enabled = update_data.alert_enabled
    if update_data.alert_threshold is not None:
        saved_search.alert_threshold = update_data.alert_threshold
    
    await db.commit()
    await db.refresh(saved_search)
    
    return saved_search


@router.delete("/saved/{saved_search_id}", response_model=MessageResponse)
async def delete_saved_search(
    saved_search_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a saved search"""
    result = await db.execute(
        select(SavedSearch).filter(
            SavedSearch.id == saved_search_id,
            SavedSearch.user_id == current_user.id
        )
    )
    saved_search = result.scalar_one_or_none()
    
    if not saved_search:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Saved search not found"
        )
    
    await db.delete(saved_search)
    await db.commit()
    
    return {
        "message": "Saved search deleted successfully",
        "success": True
    }
