import React from 'react';
import { Idea } from '../types/idea';

interface IdeaListProps {
  ideas: Idea[];
}

function IdeaList({ ideas }: IdeaListProps) {
  return (
    <div className="idea-list">
      <h2>Saved Ideas</h2>
      {ideas.length === 0 ? (
        <p>No ideas saved.</p>
      ) : (
        <ul>
          {ideas.map(idea => (
            <li key={idea.id}>
              <p>{idea.content}</p>
              <small>{new Date(idea.createdAt!).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IdeaList;
