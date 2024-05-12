/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export function useFetching(callback: (...args: any[]) => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args: any[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        return;
      }
      setError('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return { fetching, isLoading, error };
}
