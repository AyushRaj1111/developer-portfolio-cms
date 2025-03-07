# Developer Portfolio CMS

## Project Description
A Developer Portfolio CMS (Content Management System) that allows you to dynamically manage your blogs, projects, learning progress, achievements, and experiences.

## Features
### User Dashboard
- Secure authentication (OAuth, JWT, Magic Link, etc.).
- A dashboard where you can easily add/edit/delete blogs, projects, achievements, and experiences.

### Dynamic Blog System
- Markdown support for writing technical blogs.
- Tags and categories for better organization.
- Comments & reactions (like GitHub discussions).
- SEO-friendly blog pages with social media sharing.

### Project Showcase
- Auto-fetch project details from GitHub (stars, forks, README).
- Live demo links & GitHub repository links.
- Tech stack badges.
- Screenshots and videos for project highlights.

### Learning Tracker
- Add topics you're learning (with timestamps).
- Progress tracking (percentage completed).
- A timeline view to visualize your learning journey.

### Experience & Achievements
- Add work experiences, internships, hackathons, and recognitions.
- Auto-fetch GitHub contributions.
- Auto-fetch HackerRank, Codeforces, LeetCode stats.

### AI-Powered Features
- AI Blog Summarizer: Generates summaries for your blogs.
- Project Recommendation System: Suggests projects based on past work.
- AI Resume Builder: Auto-generates resumes from your data.

### Technical Stack
- Frontend: React + Tailwind CSS
- Backend: FastAPI (Python)
- Database: PostgreSQL + Redis (for caching)
- Storage: S3 for images
- Authentication: NextAuth, Firebase, or Supabase
- Deployment: Docker + Kubernetes

## Setting Up the Development Environment
1. Clone the repository:
   ```bash
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

## Running the Project
1. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

2. Start the backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

## Deploying the Project
1. Using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Using Kubernetes:
   ```bash
   kubectl apply -f kubernetes/
   ```

## Setting Up CI/CD Pipeline
1. Create a new file named `ci-cd-pipeline.yml` in the root directory of the project.
2. Add the following configuration to the file:
   ```yaml
   name: CI/CD Pipeline

   on:
     push:
       branches:
         - main
     pull_request:
       branches:
         - main

   jobs:
     build:
       runs-on: ubuntu-latest

       services:
         docker:
           image: docker:19.03.12
           options: --privileged

       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Set up Docker Buildx
           uses: docker/setup-buildx-action@v1

         - name: Cache Docker layers
           uses: actions/cache@v2
           with:
             path: /tmp/.buildx-cache
             key: ${{ runner.os }}-buildx-${{ github.sha }}
             restore-keys: |
               ${{ runner.os }}-buildx-

         - name: Build and push Docker images
           uses: docker/build-push-action@v2
           with:
             context: .
             push: true
             tags: user/repo:latest

         - name: Deploy to Kubernetes
           run: |
             kubectl apply -f kubernetes/
   ```

3. Commit and push the changes to the repository.
4. The CI/CD pipeline will automatically run on every push to the `main` branch and on every pull request to the `main` branch.
