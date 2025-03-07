import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project details from GitHub
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      {projects.map(project => (
        <div key={project.id} className="project">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <div>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>}
          </div>
          <div>
            {project.techStack.map(tech => (
              <span key={tech} className="badge">{tech}</span>
            ))}
          </div>
          <div>
            {project.screenshots.map((screenshot, index) => (
              <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
            ))}
          </div>
          {project.video && (
            <div>
              <video controls>
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
