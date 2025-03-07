from fastapi import FastAPI
from .routers import blogs, projects, learning, experience, ai

app = FastAPI()

app.include_router(blogs.router)
app.include_router(projects.router)
app.include_router(learning.router)
app.include_router(experience.router)
app.include_router(ai.router)
