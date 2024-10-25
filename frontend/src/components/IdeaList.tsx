import React from 'react';
import { Idea } from '../types/idea';

interface IdeaListProps {
  ideas: Idea[];
  onDeleteIdea: (id: number) => void;
}

function IdeaList({ ideas, onDeleteIdea }: IdeaListProps) {
  return (
    <div className="idea-list mt-4">
      <h2 className="text-xl text-white">Saved Ideas</h2>
      {ideas.length === 0 ? (
        <p className="text-gray-400">No ideas saved.</p>
      ) : (
        <ul className="list-none p-0">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className={`relative p-3 mb-2 rounded-lg bg-gray-700 ${idea.isRecent ? 'border border-blue-500' : ''}`} // Apply class if isRecent is true
            >
              <button
                onClick={() => onDeleteIdea(idea.id!)}
                className="absolute top-2 right-0.5 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-500"
              >
                <span className="text-sm">X</span> {/* Smaller X */}
              </button>
              <p className="text-white">{idea.content}</p>
              <small className="text-gray-400">
                {new Date(idea.createdAt!).toLocaleString()}
              </small>
              {idea.isRecent && (
                <span className="bg-green-600 text-white rounded px-2 py-1 text-xs ml-2 inline-block animate-pulse">
                  New Idea
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IdeaList;
