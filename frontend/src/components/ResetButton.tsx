import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button className="reset-button" onClick={onReset}>
      Reset Conversation and Ideas
    </button>
  );
}

export default ResetButton;
