import React, { useState } from 'react';
import ProbabilityClassForm from './ProbabilityClassForm';

function ClassList({ classes, onUpdate, onRemove }) {
  const [editingIndex, setEditingIndex] = useState(null);
  
  if (classes.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No drop classes configured yet. Add one using the form above.
      </div>
    );
  }
  
  const handleEdit = (index) => {
    setEditingIndex(index);
  };
  
  const handleUpdate = (updatedClass) => {
    onUpdate(editingIndex, updatedClass);
    setEditingIndex(null);
  };
  
  return (
    <div className="space-y-6">
      {classes.map((probClass, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          {editingIndex === index ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Class</h3>
              <ProbabilityClassForm 
                initialData={probClass} 
                onSubmit={handleUpdate} 
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => setEditingIndex(null)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{probClass.classLabel}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(index)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-sm font-medium text-gray-700">Base Probability:</span> 
                  <span className="ml-1">{probClass.initialProbability}%</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-sm font-medium text-gray-700">Bias Rate:</span> 
                  <span className="ml-1">{probClass.incrementalBiasRate}%/failure</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-sm font-medium text-gray-700">Deterministic After:</span> 
                  <span className="ml-1">{probClass.deterministicLimit} failures</span>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-700">Current Failures:</span> 
                <span className="ml-1">{probClass.consecutiveFailures}</span>
                
                <div className="mt-2 bg-blue-50 p-2 rounded">
                  <span className="text-sm font-medium text-blue-700">Current Adjusted Probability:</span> 
                  <span className="ml-1">
                    {Math.min(100, probClass.initialProbability + (probClass.consecutiveFailures * probClass.incrementalBiasRate)).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Possible Outcomes:</h4>
                <ul className="space-y-1">
                  {probClass.categoryOutcomes.map((outcome, outcomeIndex) => (
                    <li key={outcomeIndex} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>{outcome.label}</span>
                      <span className="text-gray-500">Weight: {outcome.weight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ClassList; 