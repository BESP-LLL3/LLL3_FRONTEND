import React from 'react';
import { useLocation } from 'react-router-dom';
import { useKeywordTrend } from '../hooks/useKeywordTrend';
import TrendChart from '../../trend/components/KeywordTrendChart';

const TrendPage = () => {
  const location = useLocation();
  const keyword = location.state?.keyword || '커피';
  const { data, loading } = useKeywordTrend(keyword);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>📊 키워드 트렌드 분석</h2>
      
      {loading ? (
        <p>데이터를 불러오는 중입니다...</p>
      ) : (
        <TrendChart keyword={keyword} data={data} />
      )}
    </div>
  );
};

export default TrendPage;