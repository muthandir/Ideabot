import React from 'react';

function ResetButton({ onReset }) {
  return (
    <button className="reset-button" onClick={onReset}>
      Reset Conversation and Ideas
    </button>
  );
}

export default ResetButton;
