import React from 'react';

const SearchBar = ({ keyword, setKeyword, onSearch, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img 
          src={require('../assets/images/logo2.png')} 
          alt="로고" 
          style={styles.logo}
        />
        <p style={styles.mainSubtitle}>나만의 완벽한 상호명 추천의 시작!</p>
      </div>
      
      <form onSubmit={handleSubmit} style={styles.searchForm}>
        <div style={styles.inputContainer}>
          <img 
            src={require('../assets/images/search-icon.png')} 
            alt="검색 아이콘" 
            style={styles.searchIcon}
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="원하시는 사업 아이템과 키워드를 입력해주세요"
            style={styles.input}
          />
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    padding: '0',
    backgroundColor: '#fff',
    overflow: 'auto'
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '5rem',
  },
  logo: {
    width: '200px',
    height: 'auto',
  },
  mainSubtitle: {
    color: '#357552',
    fontSize: '1.5rem',
    margin: 0
  },
  searchForm: {
    width: '1000px'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '70px',
    borderRadius: '70px',
    padding: '10px 20px',
    border: '1px solid #B2C9A5',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  searchIcon: {
    width: '40px',
    height: '40px',
    marginRight: '20px',
    marginLeft: '25px',
    opacity: 0.6
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '20px',
    backgroundColor: 'transparent',
    fontFamily: 'B_pro'
  }
};

export default SearchBar; 