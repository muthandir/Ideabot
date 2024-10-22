import React from 'react';
import { Idea } from '../types/idea';

interface Chat {
  content: string;
}

interface IdeaListProps {
  ideas: Idea[];
}

function IdeaList({ ideas }: IdeaListProps) {
  return (
    <div className="idea-list">
      <h2>Saved Ideas</h2>
      <ul>
        {ideas.map(idea => (
          <li key={idea.id}>
            <p>{idea.content}</p>
            <small>Created at: {new Date(idea.createdAt!).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IdeaList;
