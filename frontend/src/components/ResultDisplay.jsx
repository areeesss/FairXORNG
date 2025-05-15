import React from 'react';

function ResultDisplay({ result }) {
  if (!result) {
    return (
      <div className="text-center py-8 text-gray-500">
        Click the Roll button to generate an outcome
      </div>
    );
  }
  
  return (
    <div className="text-center">
      <div className={`inline-block px-4 py-2 rounded-md ${
        result.isDeterministic
          ? 'bg-purple-100 border border-purple-300'
          : 'bg-green-100 border border-green-300'
      }`}>
        {result.isDeterministic && (
          <span className="block text-xs font-semibold text-purple-800 mb-1">
            DETERMINISTIC DROP
          </span>
        )}
        
        <div className="text-2xl font-bold">
          {result.result}
        </div>
        
        {result.classLabel && (
          <div className="mt-1 text-sm text-gray-700">
            From class: {result.classLabel}
          </div>
        )}
        
        {result.probability && !result.isDeterministic && (
          <div className="mt-1 text-xs text-gray-600">
            Rolled with {result.probability.toFixed(1)}% chance
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultDisplay; 