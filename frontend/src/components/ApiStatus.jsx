import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';

function ApiStatus() {
  const [status, setStatus] = useState('checking');
  
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await checkHealth();
        setStatus('online');
      } catch (error) {
        setStatus('offline');
      }
    };
    
    checkApiStatus();
    
    const interval = setInterval(checkApiStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4">
      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
        status === 'online' 
          ? 'bg-green-100 text-green-800' 
          : status === 'offline' 
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
      }`}>
        <span className={`w-2 h-2 rounded-full mr-1 ${
          status === 'online' 
            ? 'bg-green-500' 
            : status === 'offline' 
              ? 'bg-red-500'
              : 'bg-yellow-500'
        }`}></span>
        API {status}
      </div>
    </div>
  );
}

export default ApiStatus; 