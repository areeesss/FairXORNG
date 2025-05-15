import React, { useState } from 'react';
import OutcomeCategoryForm from './OutcomeCategoryForm';

function ProbabilityClassForm({ onSubmit, initialData }) {
  const [classLabel, setClassLabel] = useState(initialData?.classLabel || '');
  const [initialProbability, setInitialProbability] = useState(initialData?.initialProbability || 10);
  const [incrementalBiasRate, setIncrementalBiasRate] = useState(initialData?.incrementalBiasRate || 5);
  const [deterministicLimit, setDeterministicLimit] = useState(initialData?.deterministicLimit || 5);
  const [categoryOutcomes, setCategoryOutcomes] = useState(initialData?.categoryOutcomes || []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!classLabel || categoryOutcomes.length === 0) {
      alert('Please provide a class label and at least one outcome category');
      return;
    }
    
    onSubmit({
      classLabel,
      initialProbability: parseFloat(initialProbability),
      incrementalBiasRate: parseFloat(incrementalBiasRate),
      deterministicLimit: parseInt(deterministicLimit),
      consecutiveFailures: initialData?.consecutiveFailures || 0,
      categoryOutcomes
    });
    
    // Reset form if it's not being used for editing
    if (!initialData) {
      setClassLabel('');
      setInitialProbability(10);
      setIncrementalBiasRate(5);
      setDeterministicLimit(5);
      setCategoryOutcomes([]);
    }
  };
  
  const addOutcomeCategory = (category) => {
    setCategoryOutcomes([...categoryOutcomes, category]);
  };
  
  const removeOutcomeCategory = (index) => {
    setCategoryOutcomes(categoryOutcomes.filter((_, i) => i !== index));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Class Label</label>
        <input
          type="text"
          value={classLabel}
          onChange={(e) => setClassLabel(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Legendary Items"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Probability (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={initialProbability}
            onChange={(e) => setInitialProbability(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Bias Rate (%/failure)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={incrementalBiasRate}
            onChange={(e) => setIncrementalBiasRate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Deterministic Limit</label>
          <input
            type="number"
            min="1"
            value={deterministicLimit}
            onChange={(e) => setDeterministicLimit(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900">Outcome Categories</h3>
        <OutcomeCategoryForm onSubmit={addOutcomeCategory} />
        
        {categoryOutcomes.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Added Categories:</h4>
            <ul className="space-y-2">
              {categoryOutcomes.map((category, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>
                    <span className="font-medium">{category.label}</span> (Weight: {category.weight})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeOutcomeCategory(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update Class' : 'Add Class'}
        </button>
      </div>
    </form>
  );
}

export default ProbabilityClassForm; 