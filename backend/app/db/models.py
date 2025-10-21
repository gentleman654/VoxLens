from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, Text, Float, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import uuid
from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(50), unique=True, nullable=True)
    password_hash = Column(String(255), nullable=True)  # NULL for OAuth users
    full_name = Column(String(100), nullable=True)
    avatar_url = Column(Text, nullable=True)
    tier = Column(String(20), default="free")  # free, pro, admin
    credits_remaining = Column(Integer, default=50)
    credits_reset_date = Column(DateTime, nullable=True)
    oauth_provider = Column(String(50), nullable=True)  # google, github, null
    oauth_id = Column(String(255), nullable=True)
    email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, server_default=func.now())

    # Relationships
    searches = relationship("Search", back_populates="user", cascade="all, delete-orphan")
    saved_searches = relationship("SavedSearch", back_populates="user", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="user", cascade="all, delete-orphan")


class Search(Base):
    __tablename__ = "searches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    query = Column(Text, nullable=False)
    status = Column(String(20), default="pending")  # pending, processing, completed, failed
    total_tweets = Column(Integer, default=0)
    sentiment_summary = Column(JSON, nullable=True)  # {positive: 45, negative: 30, neutral: 20, sarcastic: 5}
    emotion_summary = Column(JSON, nullable=True)
    entities = Column(JSON, nullable=True)
    time_range = Column(String(10), default="7d")  # 24h, 7d, 30d
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="searches")
    tweets = relationship("Tweet", back_populates="search", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="search", cascade="all, delete-orphan")


class Tweet(Base):
    __tablename__ = "tweets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    search_id = Column(UUID(as_uuid=True), ForeignKey("searches.id", ondelete="CASCADE"), nullable=False)
    tweet_id = Column(String(50), unique=True, nullable=True)
    text = Column(Text, nullable=False)
    author_username = Column(String(100), nullable=True)
    author_name = Column(String(100), nullable=True)
    created_at_twitter = Column(DateTime, nullable=True)
    retweet_count = Column(Integer, default=0)
    like_count = Column(Integer, default=0)
    reply_count = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    location = Column(String(255), nullable=True)
    raw_data = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())

    # Relationships
    search = relationship("Search", back_populates="tweets")
    sentiments = relationship("Sentiment", back_populates="tweet", cascade="all, delete-orphan")


class Sentiment(Base):
    __tablename__ = "sentiments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tweet_id = Column(UUID(as_uuid=True), ForeignKey("tweets.id", ondelete="CASCADE"), nullable=False)
    model_name = Column(String(50), nullable=False)  # vader, roberta, custom
    sentiment_label = Column(String(20), nullable=False)  # positive, negative, neutral
    confidence_score = Column(Float, nullable=True)
    is_sarcastic = Column(Boolean, default=False)
    sarcasm_score = Column(Float, nullable=True)
    emotions = Column(JSON, nullable=True)  # {joy: 0.8, anger: 0.2, ...}
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())

    # Relationships
    tweet = relationship("Tweet", back_populates="sentiments")


class SavedSearch(Base):
    __tablename__ = "saved_searches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    query = Column(Text, nullable=False)
    alert_enabled = Column(Boolean, default=False)
    alert_threshold = Column(Float, nullable=True)
    last_checked = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="saved_searches")


class Report(Base):
    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    search_id = Column(UUID(as_uuid=True), ForeignKey("searches.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    format = Column(String(10), nullable=False)  # pdf, csv, json
    file_url = Column(Text, nullable=True)
    file_size_kb = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    expires_at = Column(DateTime, nullable=True)  # Auto-delete after 7 days

    # Relationships
    search = relationship("Search", back_populates="reports")
    user = relationship("User", back_populates="reports")
