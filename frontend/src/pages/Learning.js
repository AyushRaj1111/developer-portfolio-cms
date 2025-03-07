import React, { useState, useEffect } from 'react';

const Learning = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [progress, setProgress] = useState({});
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    // Fetch learning topics
    fetch('/api/learning')
      .then(response => response.json())
      .then(data => {
        setTopics(data.topics);
        setProgress(data.progress);
        setTimeline(data.timeline);
      });
  }, []);

  const handleAddTopic = (e) => {
    e.preventDefault();
    // Add new topic
    fetch('/api/learning', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ topic: newTopic })
    })
      .then(response => response.json())
      .then(data => {
        setTopics([...topics, data]);
        setNewTopic('');
      });
  };

  const handleProgressChange = (topic, value) => {
    // Update progress
    fetch(`/api/learning/${topic}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress: value })
    })
      .then(response => response.json())
      .then(data => {
        setProgress({ ...progress, [topic]: data.progress });
      });
  };

  return (
    <div>
      <h1>Learning Tracker</h1>
      <form onSubmit={handleAddTopic}>
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add a new topic"
        />
        <button type="submit">Add Topic</button>
      </form>
      <div>
        <h2>Topics</h2>
        {topics.map(topic => (
          <div key={topic}>
            <h3>{topic}</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={progress[topic] || 0}
              onChange={(e) => handleProgressChange(topic, e.target.value)}
            />
            <span>{progress[topic] || 0}%</span>
          </div>
        ))}
      </div>
      <div>
        <h2>Timeline</h2>
        {timeline.map((entry, index) => (
          <div key={index}>
            <p>{entry.timestamp}: {entry.topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
