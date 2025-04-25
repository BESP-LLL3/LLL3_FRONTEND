import { useEffect, useState, useCallback } from 'react';
import { getKeywordTrend } from '../api/getKeywordTrend';

export const useKeywordTrend = (keyword) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchTrend = useCallback(async () => {
      if (!keyword) return;
      
      setLoading(true);
      try {
        const result = await getKeywordTrend(keyword);
        setData(result?.trendData || []); // 안전하게 접근
      } catch (error) {
        console.error('트렌드 데이터를 가져오는 데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    }, [keyword]);

    useEffect(() => {
      fetchTrend();
    }, [fetchTrend]);
  
    return { data, loading, refresh: fetchTrend };
};