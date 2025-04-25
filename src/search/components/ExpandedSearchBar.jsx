import React from 'react';
import Loader from './Loader';

const ExpandedSearchBar = ({ keyword, recommendKeyword, setKeyword, setRecommendKeyword, onSearch, onClose, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    onSearch({ keyword, recommendKeyword });
  };

  return (
    <div style={{
      ...styles.container,
      ...(loading && styles.loadingContainer)
    }}>
      <form onSubmit={handleSubmit} style={styles.searchForm}>
        <div style={styles.inputsContainer}>
          <div style={{
            ...styles.inputWrapper,
            ...(loading && styles.loadingInputWrapper)
          }}>
            <img 
              src={require('../assets/images/search-icon.png')} 
              alt="검색 아이콘" 
              style={{
                ...styles.searchIcon,
                ...(loading && styles.loadingIcon)
              }}
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어 입력 (필수)"
              style={{
                ...styles.input,
                ...(loading && styles.loadingInput)
              }}
              required
              disabled={loading}
            />
          </div>
          <div style={{
            ...styles.inputWrapper,
            ...(loading && styles.loadingInputWrapper)
          }}>
            <img 
              src={require('../assets/images/search-icon.png')} 
              alt="검색 아이콘" 
              style={{
                ...styles.searchIcon,
                ...(loading && styles.loadingIcon)
              }}
            />
            <input
              type="text"
              value={recommendKeyword}
              onChange={(e) => setRecommendKeyword(e.target.value)}
              placeholder="추천된 이름에 들어갈 키워드 입력 (선택)"
              style={{
                ...styles.input,
                ...(loading && styles.loadingInput)
              }}
              disabled={loading}
            />
          </div>
        </div>
        <button 
          type="submit" 
          style={{
            ...styles.searchButton,
            ...(loading && styles.loadingButton)
          }} 
          disabled={loading}
        >
          {loading ? (
            <div style={styles.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            '검색'
          )}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '1000px',
    backgroundColor: '#fff',
    borderRadius: '70px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    border: '1px solid #B2C9A5',
    transition: 'all 0.3s ease',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(5px)',
  },
  searchForm: {
    width: '100%',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '35px',
    backgroundColor: '#fff',
    border: '1px solid #B2C9A5',
    transition: 'all 0.3s ease',
  },
  loadingInputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(178, 201, 165, 0.5)',
  },
  searchIcon: {
    width: '40px',
    height: '40px',
    marginRight: '20px',
    marginLeft: '25px',
    opacity: 0.6,
    transition: 'all 0.3s ease',
  },
  loadingIcon: {
    opacity: 0.3,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    backgroundColor: 'transparent',
    fontFamily: 'B_pro',
    transition: 'all 0.3s ease',
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
  },
  loadingInput: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  searchButton: {
    width: '100%',
    padding: '15px',
    marginTop: '15px',
    backgroundColor: '#357552',
    color: '#fff',
    border: 'none',
    borderRadius: '35px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#2a5d42'
    },
    '&:disabled': {
      backgroundColor: '#a8c3b8',
      cursor: 'not-allowed'
    }
  },
  loadingButton: {
    backgroundColor: 'rgba(53, 117, 82, 0.7)',
  },
  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '24px'
  }
};

export default ExpandedSearchBar; 