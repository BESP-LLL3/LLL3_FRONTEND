import React, { memo } from 'react';

const NameSuggestionList = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <p>워드 클라우드에서 키워드를 선택하면 추천 상호명이 표시됩니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            style={styles.suggestionItem}
            onClick={() => onSelect && onSelect(suggestion)}
          >
            <span style={styles.suggestionText}>{suggestion}</span>
            <button style={styles.selectButton}>선택</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginTop: '2rem',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  suggestionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f7f9f7',
    transition: 'all 0.2s',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#edf3ed',
    }
  },
  suggestionText: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#357552',
  },
  selectButton: {
    backgroundColor: '#8BC34A',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#7CB342',
    }
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    color: '#718096',
  }
};

export default memo(NameSuggestionList); 