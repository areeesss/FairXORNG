import React, { useState, useEffect } from 'react';
import ProbabilityClassForm from './components/ProbabilityClassForm';
import ClassList from './components/ClassList';
import RollButton from './components/RollButton';
import ResultDisplay from './components/ResultDisplay';
import ApiStatus from './components/ApiStatus';
import { evaluateOutcome } from './services/api';

function App() {
  const [classes, setClasses] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Load classes from localStorage on initial load
  useEffect(() => {
    const savedClasses = localStorage.getItem('fairxorng_classes');
    if (savedClasses) {
      try {
        setClasses(JSON.parse(savedClasses));
      } catch (error) {
        console.error('Error parsing saved classes:', error);
      }
    }
  }, []);
  
  // Save classes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fairxorng_classes', JSON.stringify(classes));
  }, [classes]);
  
  const addProbabilityClass = (newClass) => {
    setClasses([...classes, newClass]);
  };
  
  const updateProbabilityClass = (index, updatedClass) => {
    const updatedClasses = [...classes];
    updatedClasses[index] = updatedClass;
    setClasses(updatedClasses);
  };
  
  const removeProbabilityClass = (index) => {
    const updatedClasses = classes.filter((_, i) => i !== index);
    setClasses(updatedClasses);
  };

  const handleRoll = async () => {
    if (classes.length === 0) return;
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await evaluateOutcome(classes);
      
      setResult({
        result: response.result,
        isDeterministic: response.isDeterministic,
        classLabel: response.classLabel,
        probability: response.updatedClasses.find(c => c.classLabel === response.classLabel)?.initialProbability
      });
      
      setClasses(response.updatedClasses);
    } catch (error) {
      console.error('Error rolling:', error);
      setErrorMessage('Failed to communicate with the API. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all classes? This cannot be undone.')) {
      setClasses([]);
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-10">
      <h1 className="text-3xl font-bold text-center mb-8">FairXORNG Drop Simulator</h1>
      
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Drop Class</h2>
          <ProbabilityClassForm onSubmit={addProbabilityClass} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <ResultDisplay result={result} />
          <div className="mt-4">
            <RollButton onRoll={handleRoll} loading={loading} disabled={classes.length === 0} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Configured Drop Classes</h2>
          {classes.length > 0 && (
            <button
              onClick={handleReset}
              className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              Reset All
            </button>
          )}
        </div>
        <ClassList 
          classes={classes} 
          onUpdate={updateProbabilityClass} 
          onRemove={removeProbabilityClass} 
        />
      </div>
      
      <ApiStatus />
    </div>
  );
}

export default App; 