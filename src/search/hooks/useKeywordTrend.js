import { useState, useEffect } from 'react';
import api from '../../app/api/api';

export const useKeywordTrend = (keyword) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendData = async (searchKeyword) => {
    if (!searchKeyword) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/api/trend', {
        params: { keyword: searchKeyword }
      });
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendData(keyword);
  }, [keyword]);

  return { data, loading, error, refresh: () => fetchTrendData(keyword) };
}; 