import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      className="reset-button bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-500"
      onClick={onReset}
    >
      Reset Conversation and Ideas
    </button>
  );
}

export default ResetButton;
