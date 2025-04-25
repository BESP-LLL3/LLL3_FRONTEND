import React, { memo } from 'react';

const NameResultPopup = ({ name, onClose }) => {
  if (!name) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.popupContainer}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={styles.nameTitle}>{name}</h2>
        
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>상호명 분석</h3>
          <div style={styles.analysisContent}>
            <p>선택하신 상호명 <strong>{name}</strong>에 대한 분석 결과입니다.</p>
            <ul style={styles.analysisList}>
              <li>브랜드 인지도: <span style={styles.highlight}>높음</span></li>
              <li>기억하기 쉬움: <span style={styles.highlight}>매우 좋음</span></li>
              <li>경쟁 상호명 수: <span style={styles.highlight}>적음</span></li>
              <li>특허 등록 가능성: <span style={styles.highlight}>높음</span></li>
            </ul>
          </div>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>추천 도메인</h3>
          <div style={styles.domainList}>
            <div style={styles.domainItem}>
              <span style={styles.domain}>{name.replace(/\s+/g, '')}.com</span>
              <button style={styles.checkButton}>확인</button>
            </div>
            <div style={styles.domainItem}>
              <span style={styles.domain}>{name.replace(/\s+/g, '')}.co.kr</span>
              <button style={styles.checkButton}>확인</button>
            </div>
            <div style={styles.domainItem}>
              <span style={styles.domain}>{name.replace(/\s+/g, '')}.kr</span>
              <button style={styles.checkButton}>확인</button>
            </div>
          </div>
        </div>
        
        <div style={styles.actionButtons}>
          <button style={styles.saveButton}>상호명 저장하기</button>
          <button style={styles.shareButton}>공유하기</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
    padding: '2.5rem',
    width: '90%',
    maxWidth: '600px',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#aaa',
    cursor: 'pointer',
  },
  nameTitle: {
    fontSize: '2rem',
    color: '#357552',
    textAlign: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e2e8f0',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    color: '#357552',
    fontSize: '1.3rem',
    marginBottom: '1rem',
    borderLeft: '4px solid #8BC34A',
    paddingLeft: '0.8rem',
  },
  analysisContent: {
    padding: '0 0.8rem',
  },
  analysisList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '0.8rem',
    lineHeight: '1.8',
  },
  highlight: {
    backgroundColor: '#f0f9eb',
    color: '#67c23a',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    fontWeight: '500',
  },
  domainList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  domainItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem 1rem',
    backgroundColor: '#f7f9f7',
    borderRadius: '6px',
  },
  domain: {
    fontWeight: '500',
    fontFamily: 'monospace',
    fontSize: '1rem',
  },
  checkButton: {
    backgroundColor: '#8BC34A',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2.5rem',
  },
  saveButton: {
    backgroundColor: '#357552',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.7rem 1.4rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  shareButton: {
    backgroundColor: '#8BC34A',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.7rem 1.4rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default memo(NameResultPopup); 