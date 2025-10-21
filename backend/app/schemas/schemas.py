from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None


class UserResponse(UserBase):
    id: UUID
    username: Optional[str] = None
    avatar_url: Optional[str] = None
    tier: str
    credits_remaining: int
    email_verified: bool
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Token Schemas
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[UUID] = None
    email: Optional[str] = None


# Search Schemas
class SearchCreate(BaseModel):
    query: str
    time_range: str = "7d"  # 24h, 7d, 30d


class SearchResponse(BaseModel):
    id: UUID
    user_id: UUID
    query: str
    status: str
    total_tweets: int
    sentiment_summary: Optional[dict] = None
    emotion_summary: Optional[dict] = None
    entities: Optional[dict] = None
    time_range: str
    created_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class SearchListResponse(BaseModel):
    searches: list[SearchResponse]
    total: int
    page: int
    page_size: int


# Tweet Schemas
class TweetResponse(BaseModel):
    id: UUID
    search_id: UUID
    tweet_id: Optional[str] = None
    text: str
    author_username: Optional[str] = None
    author_name: Optional[str] = None
    created_at_twitter: Optional[datetime] = None
    retweet_count: int
    like_count: int
    reply_count: int
    is_verified: bool
    location: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Sentiment Schemas
class SentimentResponse(BaseModel):
    id: UUID
    tweet_id: UUID
    model_name: str
    sentiment_label: str
    confidence_score: Optional[float] = None
    is_sarcastic: bool
    sarcasm_score: Optional[float] = None
    emotions: Optional[dict] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Saved Search Schemas
class SavedSearchCreate(BaseModel):
    query: str
    alert_enabled: bool = False
    alert_threshold: Optional[float] = None


class SavedSearchUpdate(BaseModel):
    alert_enabled: Optional[bool] = None
    alert_threshold: Optional[float] = None


class SavedSearchResponse(BaseModel):
    id: UUID
    user_id: UUID
    query: str
    alert_enabled: bool
    alert_threshold: Optional[float] = None
    last_checked: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Report Schemas
class ReportCreate(BaseModel):
    search_id: UUID
    format: str = "pdf"  # pdf, csv, json


class ReportResponse(BaseModel):
    id: UUID
    search_id: UUID
    user_id: UUID
    format: str
    file_url: Optional[str] = None
    file_size_kb: Optional[int] = None
    created_at: datetime
    expires_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Generic Response
class MessageResponse(BaseModel):
    message: str
    success: bool = True
