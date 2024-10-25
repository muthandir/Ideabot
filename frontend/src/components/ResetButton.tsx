import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

function ResetButton({ onReset }: ResetButtonProps) {
  const handleClick = () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to reset the conversation and ideas?',
    );
    if (confirmed) {
      onReset(); // Call the onReset function if confirmed
    }
  };

  return (
    <button
      className="relative flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full transition-all duration-50 hover:bg-red-800 hover:w-80 hover:h-10 group"
      onClick={handleClick}
    >
      <span className="text-xl group-hover:opacity-0">!</span>
      <span className="absolute left-12 opacity-0 w-auto transition-opacity duration-0 group-hover:opacity-100">
        Reset Conversation and Ideas
      </span>
    </button>
  );
}

export default ResetButton;
