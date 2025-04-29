import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import ExpandedSearchBar from '../components/ExpandedSearchBar';
import TrendChart from '../../trend/components/KeywordTrendChart';
import { getTrendData, getBrandSuggestions } from '../../trend/api/keywordApi';
import D3WordCloud from '../components/D3WordCloud';
import BigWordCloud from '../components/BigWordCloud';
import NameSuggestionList from '../components/NameSuggestionList';
import NameResultPopup from '../components/NameResultPopup';
import Loader from '../components/Loader';
import Card from '../components/Card';
import StoreNameDuplicateCheck from '../components/StoreNameDuplicateCheck';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendKeyword, setRecommendKeyword] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupName, setPopupName] = useState('');
  const [showDetailView, setShowDetailView] = useState(false);

  const handleSearch = async (searchData) => {
    if (searchData) {
      setKeyword(searchData.keyword);
      setRecommendKeyword(searchData.recommendKeyword);
      setSelectedKeyword('');
      setNameSuggestions([]);
      setShowResults(false);
      setShowDetailView(false);
      
      try {
        setLoading(true);
        
        // 1. 트렌드 데이터 조회
        const trendResponse = await getTrendData(searchData.keyword);
        setTrendData(trendResponse);
        
        // 2. 브랜드 이름 추천 API 호출
        const trendKeywords = trendResponse.payload.map(item => item.keyword);
        const brandResponse = await getBrandSuggestions(
          searchData.keyword,
          trendKeywords,
          searchData.recommendKeyword
        );
        
        if (brandResponse.success && brandResponse.payload) {
          setNameSuggestions(brandResponse.payload);
        }
        
        setShowResults(true);
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
        setError('데이터를 불러오는데 실패했습니다.');
        setTrendData(null);
        setNameSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
    setIsExpanded(false);
  };

  const handleSearchBarClick = () => {
    setIsExpanded(true);
  };

  const handleWordClick = useCallback((word) => {
    setSelectedKeyword(word);
    setShowDetailView(true);
  }, []);

  const handleNameSelect = useCallback((name) => {
    setPopupName(name);
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupName('');
  };

  // 워드 클라우드용 데이터 포맷팅을 useMemo로 감싸서 메모이제이션
  const wordCloudData = useMemo(() => {
    if (!trendData) return [];
    return trendData.payload.map(k => ({
      text: k.keyword,
      value: k.recentCrtrYmRelevance
    }));
  }, [trendData]);

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        {isExpanded && (
          <div style={{
            ...styles.logoContainer,
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.5s ease-in-out',
          }}>
            <img 
              src={require('../assets/images/logo2.png')} 
              alt="로고" 
              style={styles.logo}
            />
            <p style={styles.mainSubtitle}>나만의 완벽한 상호명 추천의 시작!</p>
          </div>
        )}
        
        {isExpanded ? (
          <div style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.5s ease-in-out',
          }}>
            <ExpandedSearchBar
              keyword={keyword}
              recommendKeyword={recommendKeyword}
              setKeyword={setKeyword}
              setRecommendKeyword={setRecommendKeyword}
              onSearch={handleSearch}
              onClose={() => setIsExpanded(false)}
              loading={loading}
            />
          </div>
        ) : (
          <div onClick={handleSearchBarClick} style={styles.searchBarWrapper}>
            <SearchBar
              keyword={keyword}
              setKeyword={setKeyword}
              onSearch={() => {}}
              loading={loading}
            />
          </div>
        )}
      </div>
      
      {showResults && (
        <div id="results-section" style={styles.resultsSection}>
          <AnimatePresence mode="wait">
            {!showDetailView ? (
              <motion.div
                key="big-wordcloud"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <BigWordCloud 
                    words={wordCloudData}
                    onWordClick={handleWordClick}
                  />
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="detail-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                style={styles.resultsContainer}
              >
                <div style={styles.wordCloudWrapper}>
                  <Card>
                    <div style={styles.wordCloudContainer}>
                      {loading ? (
                        <div style={styles.loaderContainer}>
                          <Loader />
                        </div>
                      ) : error ? (
                        <div style={styles.errorContainer}>
                          <p>{error}</p>
                        </div>
                      ) : wordCloudData.length > 0 ? (
                        <>
                          <D3WordCloud 
                            words={wordCloudData}
                            onWordClick={handleWordClick}
                          />
                          <div style={styles.infoBox}>
                            <p style={styles.infoText}>키워드를 클릭하여 트렌드를 확인하세요</p>
                          </div>
                        </>
                      ) : (
                        <div style={styles.emptyContainer}>
                          <p>검색 결과가 없습니다.</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
                <div style={styles.chartWrapper}>
                  <Card>
                    <div style={styles.chartContainer}>
                      {loading ? (
                        <div style={styles.loaderContainer}>
                          <Loader />
                        </div>
                      ) : error ? (
                        <div style={styles.errorContainer}>
                          <p>{error}</p>
                        </div>
                      ) : selectedKeyword && trendData ? (
                        <TrendChart keyword={selectedKeyword} data={trendData} />
                      ) : (
                        <div style={styles.emptyContainer}>
                          <p>{selectedKeyword ? '트렌드 데이터를 불러오는 중이거나 오류가 발생했습니다.' : '워드클라우드에서 키워드를 선택하면 트렌드 분석 결과가 표시됩니다.'}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {nameSuggestions.length > 0 && (
            <motion.div 
              style={styles.nameSuggestionSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <NameSuggestionList 
                  suggestions={nameSuggestions}
                  onSelect={handleNameSelect}
                />
              </Card>
            </motion.div>
          )}

          <StoreNameDuplicateCheck 
            isVisible={showResults}
          />
        </div>
      )}

      {showPopup && (
        <NameResultPopup 
          name={popupName} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff'
  },
  searchSection: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '5rem',
    animation: 'fadeInDown 0.5s ease-in-out'
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
  searchBarWrapper: {
    cursor: 'pointer',
    width: '1000px'
  },
  resultsSection: {
    width: '100%',
    maxWidth: '1400px',
    padding: '2rem',
    marginTop: '2rem',
    marginBottom: '4rem',
  },
  resultsContainer: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'stretch',
  },
  wordCloudWrapper: {
    flex: 1.5,
    minWidth: '350px',
  },
  chartWrapper: {
    flex: 3,
    minWidth: '450px',
  },
  wordCloudContainer: {
    height: '500px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    position: 'relative',
  },
  chartContainer: {
    height: '500px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '2rem',
  },

  loaderContainer: {
    width: '100%',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff3f3',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#ff6b6b',
  },
  emptyContainer: {
    width: '100%',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#666',
  },
  nameSuggestionSection: {
    width: '100%',
    marginTop: '2rem',
  },
  infoBox: {
    position: 'absolute',
    bottom: '50px',
    right: '16px',
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    border: '1px solid #e0e0e0',
    zIndex: 10,
  },
  infoText: {
    color: '#666666',
    fontSize: '13px',
    margin: 0,
    fontFamily: 'Pretendard',
  },
};

export default SearchPage; 