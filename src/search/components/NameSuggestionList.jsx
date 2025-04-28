import React, { memo, useState } from 'react';
import Page3DButton from './Page3DButton';

const ITEMS_PER_PAGE = 5;

const NameSuggestionList = ({ suggestions, onSelect }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((suggestions?.length || 0) / ITEMS_PER_PAGE);

  if (!suggestions || suggestions.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <p>워드 클라우드에서 키워드를 선택하면 추천 상호명이 표시됩니다.</p>
        </div>
      </div>
    );
  }

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = suggestions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div style={styles.container}>
      <div style={styles.title}>추천 상호명</div>
      <div style={styles.table}>
        {pageItems.map((suggestion, index) => (
          <div
            key={startIdx + index}
            style={styles.row}
          >
            <div style={styles.nameCell}>{suggestion}</div>
            <button
              style={styles.selectButton}
              onClick={() => onSelect && onSelect(suggestion)}
            >
              선택
            </button>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={styles.paginationWrapper}>
          <Page3DButton
            direction="left"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          />
          <div style={styles.pageNumberBlock}>
            <div style={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    ...styles.pageNumberBtn,
                    ...(page === i + 1 ? styles.pageNumberActive : {})
                  }}
                  aria-label={`${i + 1}페이지로 이동`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <Page3DButton
            direction="right"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem 1.5rem 1.5rem 1.5rem',
    borderRadius: '12px',
    boxShadow: 'none',
    marginTop: '2rem',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '370px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
    color: '#357552',
    fontSize: '2.3rem',
    marginBottom: '1.5rem',
    letterSpacing: '-1px',
  },
  table: {
    width: '100%',
    minHeight: '330px',
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: 'none',
    padding: '0.5rem 0',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #A7C7A3',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    background: '#fff',
    minHeight: 54,
    transition: 'background 0.2s',
    cursor: 'pointer',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  nameCell: {
    flex: 1,
    fontSize: '1.25rem',
    color: '#222',
    padding: '0.8rem 1.2rem',
    fontWeight: 500,
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  selectButton: {
    background: '#A7C7A3',
    color: '#fff',
    border: 'none',
    borderRadius: '0 8px 8px 0',
    padding: '0.8rem 2.2rem',
    fontWeight: 600,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    borderLeft: '1.5px solid #A7C7A3',
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem',
    gap: '1.2rem',
  },
  pageNumberBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
    minWidth: '70px',
  },
  pageInfoSmall: {
    fontWeight: 400,
    color: '#7a9b87',
    fontSize: '0.95rem',
    marginTop: '0.1rem',
    letterSpacing: '-1px',
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    color: '#718096',
  },
  pageNumbers: {
    display: 'inline-flex',
    gap: '0.3rem',
    margin: '0 0.7rem',
    verticalAlign: 'middle',
  },
  pageNumberBtn: {
    border: 'none',
    background: 'none',
    color: '#357552',
    fontWeight: 600,
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: 0,
    width: '2em',
    height: '2em',
    minWidth: '2.8em',
    minHeight: '2.8em',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, color 0.2s',
    margin: '0 2px',
  },
  pageNumberActive: {
    background: '#A7C7A3',
    color: '#fff',
    fontWeight: 800,
  },
};

export default memo(NameSuggestionList); 