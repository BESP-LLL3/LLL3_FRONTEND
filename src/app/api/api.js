import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  config => {
    // 요청 전에 수행할 작업
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  response => {
    // 응답에서 Refresh-Token 헤더를 읽어 로컬 스토리지에 저장
    const refreshToken = response.headers['refresh-token'];
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response;
  },
  error => {
    console.error('API 에러:', error);
    return Promise.reject(error);
  }
);

export default api;