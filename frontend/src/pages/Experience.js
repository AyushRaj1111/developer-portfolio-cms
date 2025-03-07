import React, { useState, useEffect } from 'react';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [githubContributions, setGithubContributions] = useState([]);
  const [codingStats, setCodingStats] = useState({});

  useEffect(() => {
    // Fetch work experiences, internships, hackathons, and recognitions
    fetch('/api/experiences')
      .then(response => response.json())
      .then(data => setExperiences(data));

    // Fetch GitHub contributions
    fetch('/api/github/contributions')
      .then(response => response.json())
      .then(data => setGithubContributions(data));

    // Fetch coding stats from HackerRank, Codeforces, LeetCode
    fetch('/api/coding-stats')
      .then(response => response.json())
      .then(data => setCodingStats(data));
  }, []);

  return (
    <div>
      <h1>Experience & Achievements</h1>
      <div>
        <h2>Work Experiences, Internships, Hackathons, and Recognitions</h2>
        {experiences.map(exp => (
          <div key={exp.id}>
            <h3>{exp.title}</h3>
            <p>{exp.description}</p>
            <p>{exp.date}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>GitHub Contributions</h2>
        {githubContributions.map(contribution => (
          <div key={contribution.id}>
            <p>{contribution.repoName}: {contribution.contributions} contributions</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Coding Stats</h2>
        <div>
          <h3>HackerRank</h3>
          <p>Score: {codingStats.hackerrank?.score}</p>
          <p>Rank: {codingStats.hackerrank?.rank}</p>
        </div>
        <div>
          <h3>Codeforces</h3>
          <p>Rating: {codingStats.codeforces?.rating}</p>
          <p>Rank: {codingStats.codeforces?.rank}</p>
        </div>
        <div>
          <h3>LeetCode</h3>
          <p>Problems Solved: {codingStats.leetcode?.problemsSolved}</p>
          <p>Rank: {codingStats.leetcode?.rank}</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
