import api from '../../app/api/api';

export const getKeywordSuggestions = async (keyword) => {
  try {
    const response = await api.get(`/keyword`, {
      params: { keyword }
    });
    return response.data;
  } catch (error) {
    console.error('키워드 추천 API 호출 실패:', error);
    throw error;
  }
};

export const getKeywordTrend = async (keyword) => {
  try {
    const response = await api.get(`/trend`, {
      params: { keyword }
    });
    return response.data;
  } catch (error) {
    console.error('트렌드 데이터 API 호출 실패:', error);
    throw error;
  }
};

export const getTrendData = async (keyword) => {
  try {
    const response = await api.get('/trend', {
      params: { keyword, limit: 30 }
    });
    return response.data;
  } catch (error) {
    console.error('트렌드 데이터 API 호출 실패:', error);
    throw error;
  }
};

// 워드 클라우드 데이터 포맷 변환 함수
export const formatWordCloudData = (data) => {
  if (!data || !data.payload) return [];
  
  return data.payload.map(item => ({
    text: item.keyword,
    value: item.recentCrtrYmRelevance
  }));
};

// 그래프 데이터 포맷 변환 함수
export const formatGraphData = (keyword, data) => {
  if (!data || !data.payload) return null;
  
  const keywordData = data.payload.find(item => item.keyword === keyword);
  if (!keywordData) return null;
  
  const quarterData = keywordData.quarterRevelance;
  return Object.entries(quarterData).map(([quarter, value]) => ({
    quarter,
    value
  }));
};