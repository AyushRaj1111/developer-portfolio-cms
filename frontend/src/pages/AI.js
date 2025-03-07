import React, { useState, useEffect } from 'react';

const AI = () => {
  const [blogSummary, setBlogSummary] = useState('');
  const [projectRecommendations, setProjectRecommendations] = useState([]);
  const [resume, setResume] = useState('');

  useEffect(() => {
    // Fetch AI Blog Summarizer data
    fetch('/api/ai/blog-summarizer')
      .then(response => response.json())
      .then(data => setBlogSummary(data.summary));

    // Fetch Project Recommendation System data
    fetch('/api/ai/project-recommendations')
      .then(response => response.json())
      .then(data => setProjectRecommendations(data.recommendations));

    // Fetch AI Resume Builder data
    fetch('/api/ai/resume-builder')
      .then(response => response.json())
      .then(data => setResume(data.resume));
  }, []);

  return (
    <div>
      <h1>AI-Powered Features</h1>
      <div>
        <h2>AI Blog Summarizer</h2>
        <p>{blogSummary}</p>
      </div>
      <div>
        <h2>Project Recommendation System</h2>
        <ul>
          {projectRecommendations.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>AI Resume Builder</h2>
        <pre>{resume}</pre>
      </div>
    </div>
  );
};

export default AI;
