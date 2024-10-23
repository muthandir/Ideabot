import React from 'react';
import { Idea } from '../types/idea';

interface IdeaListProps {
  ideas: Idea[];
  onDeleteIdea: (id: number) => void;
}

function IdeaList({ ideas, onDeleteIdea }: IdeaListProps) {
  return (
    <div className="idea-list">
      <h2>Saved Ideas</h2>
      {ideas.length === 0 ? (
        <p>No ideas saved.</p>
      ) : (
        <ul>
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className={idea.isRecent ? 'recent-idea' : ''} // Apply class if isRecent is true
            >
              <p>{idea.content}</p>
              <small>{new Date(idea.createdAt!).toLocaleString()}</small>
              {idea.isRecent && <span className="badge">New Idea</span>}{' '}
              {/* Badge for recent ideas */}
              <button onClick={() => onDeleteIdea(idea.id!)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IdeaList;
