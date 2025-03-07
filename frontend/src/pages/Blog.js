import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch blog data by id
    fetch(`/api/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data));

    // Fetch comments for the blog
    fetch(`/api/blogs/${id}/comments`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Post new comment
    fetch(`/api/blogs/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newComment })
    })
      .then(response => response.json())
      .then(data => {
        setComments([...comments, data]);
        setNewComment('');
      });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.summary} />
      </Helmet>
      <h1>{blog.title}</h1>
      <div>
        {blog.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <ReactMarkdown>{blog.content}</ReactMarkdown>
      <div>
        <h2>Comments</h2>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
