import React from 'react';

function IdeaList({ ideas }) {
  return (
    <div className="idea-list">
      <h2>Saved Ideas</h2>
      <ul>
        {ideas.map((idea, index) => (
          <li key={index}>{idea}</li>
        ))}
      </ul>
    </div>
  );
}

export default IdeaList;
