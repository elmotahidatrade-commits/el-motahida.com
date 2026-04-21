import { useState, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({
        method,
        url,
        data,
        ...options,
      });
      return { data: response.data, error: null };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (!options.hideToast) {
        toast.error(errorMessage);
      }
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export default useApi;
