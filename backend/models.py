from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    tags = relationship("Tag", back_populates="blog")
    comments = relationship("Comment", back_populates="blog")

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    blog_id = Column(Integer, ForeignKey("blogs.id"))
    blog = relationship("Blog", back_populates="tags")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    created_at = Column(DateTime)
    blog_id = Column(Integer, ForeignKey("blogs.id"))
    blog = relationship("Blog", back_populates="comments")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    github_url = Column(String)
    demo_url = Column(String)
    stars = Column(Integer)
    forks = Column(Integer)
    tech_stack = Column(String)
    screenshots = relationship("Screenshot", back_populates="project")

class Screenshot(Base):
    __tablename__ = "screenshots"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project", back_populates="screenshots")

class Learning(Base):
    __tablename__ = "learning"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, index=True)
    progress = Column(Float)
    timestamp = Column(DateTime)

class Experience(Base):
    __tablename__ = "experience"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String)
    description = Column(Text)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    github_contributions = Column(Integer)
    hackerrank_stats = Column(Integer)
    codeforces_stats = Column(Integer)
    leetcode_stats = Column(Integer)

class AI(Base):
    __tablename__ = "ai"
    id = Column(Integer, primary_key=True, index=True)
    blog_summary = Column(Text)
    project_recommendation = Column(Text)
    resume = Column(Text)
