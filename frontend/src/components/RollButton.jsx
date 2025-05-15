import React from 'react';

function RollButton({ onRoll, loading, disabled }) {
  return (
    <button
      onClick={onRoll}
      disabled={disabled || loading}
      className={`w-full py-3 text-lg font-medium rounded-md ${
        disabled || loading
          ? 'bg-gray-300 cursor-not-allowed text-gray-500'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      } transition-colors duration-200`}
    >
      {loading ? 'Rolling...' : 'Roll for Outcome'}
    </button>
  );
}

export default RollButton; 