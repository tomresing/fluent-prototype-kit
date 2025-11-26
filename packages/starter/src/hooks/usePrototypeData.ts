import { useState, useEffect, useCallback } from 'react';

interface UsePrototypeDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  setData: (data: T) => Promise<void>;
  clearData: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function usePrototypeData<T = unknown>(key: string): UsePrototypeDataResult<T> {
  const [data, setDataState] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/prototype-data/${key}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      
      const result = await response.json();
      setDataState(result.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error fetching prototype data:', err);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const setData = useCallback(
    async (newData: T) => {
      try {
        setError(null);
        const response = await fetch(`/api/prototype-data/${key}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ data: newData }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save data: ${response.statusText}`);
        }

        const result = await response.json();
        setDataState(result.data);
        return result.data;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error saving prototype data:', err);
        throw err;
      }
    },
    [key]
  );

  const clearData = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`/api/prototype-data/${key}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to clear data: ${response.statusText}`);
      }

      setDataState(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error clearing prototype data:', err);
      throw err;
    }
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    setData,
    clearData,
    refresh: fetchData,
  };
}
