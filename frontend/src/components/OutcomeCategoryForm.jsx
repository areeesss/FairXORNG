import React, { useState } from 'react';

function OutcomeCategoryForm({ onSubmit }) {
  const [label, setLabel] = useState('');
  const [weight, setWeight] = useState(1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!label) {
      alert('Please provide a category label');
      return;
    }
    
    onSubmit({
      label,
      weight: parseInt(weight)
    });
    
    // Reset form
    setLabel('');
    setWeight(1);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Dragon Sword"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight</label>
          <input
            type="number"
            min="1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default OutcomeCategoryForm; 