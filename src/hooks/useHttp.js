import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { url, method, headers, body } = requestConfig;
      const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};

export default useHttp;
