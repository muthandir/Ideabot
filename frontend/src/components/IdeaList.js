import React from 'react';

function IdeaList({ ideas }) {
  return (
    <div className="idea-list">
      <h2>Saved Ideas</h2>
      <ul>
      {ideas.map(idea => (
            <li key={idea.id}>
              <h4>{idea.chat.content}</h4>
              <p>{idea.description}</p>
              <small>Created at: {new Date(idea.createdAt).toLocaleString()}</small>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default IdeaList;
