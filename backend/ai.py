from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

class AIFeatures:
    def __init__(self):
        self.summarizer = pipeline("summarization")
        self.vectorizer = TfidfVectorizer()

    def summarize_blog(self, blog_content: str) -> str:
        summary = self.summarizer(blog_content, max_length=130, min_length=30, do_sample=False)
        return summary[0]['summary_text']

    def recommend_projects(self, user_projects: list, all_projects: list) -> list:
        user_projects_text = " ".join(user_projects)
        all_projects_text = [" ".join(project) for project in all_projects]

        user_vector = self.vectorizer.fit_transform([user_projects_text])
        all_vectors = self.vectorizer.transform(all_projects_text)

        similarities = cosine_similarity(user_vector, all_vectors).flatten()
        recommended_indices = similarities.argsort()[-5:][::-1]

        return [all_projects[i] for i in recommended_indices]

    def generate_resume(self, user_data: dict) -> str:
        resume_template = """
        Name: {name}
        Email: {email}
        Phone: {phone}

        Experience:
        {experience}

        Projects:
        {projects}

        Education:
        {education}

        Skills:
        {skills}
        """
        resume = resume_template.format(
            name=user_data.get("name", ""),
            email=user_data.get("email", ""),
            phone=user_data.get("phone", ""),
            experience="\n".join(user_data.get("experience", [])),
            projects="\n".join(user_data.get("projects", [])),
            education="\n".join(user_data.get("education", [])),
            skills=", ".join(user_data.get("skills", []))
        )
        return resume
