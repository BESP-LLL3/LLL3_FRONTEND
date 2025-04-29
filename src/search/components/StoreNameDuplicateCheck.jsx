import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import Card from './Card';
import searchIcon from '../assets/images/search-icon.png';

// 검은 줄 우울 이펙트 오버레이 컴포넌트
const SadEffectOverlay = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    pointerEvents: 'none',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }}>
    <div className="sad-lines-overlay" style={{ width: '100%', height: '100%' }}>
      {[...Array(30)].map((_, i) => {
        const randomDelay = (Math.random() * 1.5).toFixed(2);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(i * 3.3)}vw`,
              width: '2px',
              height: '120px',
              background: 'linear-gradient(to bottom, #111 80%, transparent)',
              opacity: 0.7,
              animation: `sadLineWave 2.5s ease-in-out infinite`,
              animationDelay: `${randomDelay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes sadLineWave {
          0% { transform: translateY(0); }
          20% { transform: translateY(-20px); }
          50% { transform: translateY(20px); }
          80% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  </div>
);

// 구름+천둥번개 우울 효과 오버레이 컴포넌트
const ThunderCloudEffectOverlay = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'rgba(0,0,0,0.05)'
  }}>
    <div style={{ position: 'relative', marginTop: '100px', width: 320, height: 220 }}>
      {/* 구름 SVG */}
      <svg width="320" height="140" viewBox="0 0 320 140" style={{ position: 'absolute', left: 0, top: 0 }}>
        <g className="cloud-group">
          <ellipse cx="110" cy="90" rx="90" ry="55" fill="#d1d5db" />
          <ellipse cx="210" cy="70" rx="70" ry="40" fill="#e5e7eb" />
          <ellipse cx="170" cy="110" rx="130" ry="55" fill="#f3f4f6" />
        </g>
      </svg>
      {/* 번개 SVG (애니메이션) */}
      <svg width="80" height="120" viewBox="0 0 40 60" style={{ position: 'absolute', left: 120, top: 110 }}>
        <g className="thunder-group">
          <polygon className="thunder-bolt" points="20,0 25,25 15,25 25,60 10,35 20,35" fill="#facc15" stroke="#fbbf24" strokeWidth="2" />
        </g>
      </svg>
      <style>{`
        .cloud-group {
          animation: cloudShake 1.8s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes cloudShake {
          0%,100% { transform: translateX(0); }
          10% { transform: translateX(-8px); }
          20% { transform: translateX(8px); }
          30% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          50% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          70% { transform: translateX(0); }
        }
        .thunder-bolt {
          opacity: 0;
          animation: thunderFlash 1.8s linear both;
        }
        @keyframes thunderFlash {
          0% { opacity: 0; }
          10% { opacity: 1; }
          18% { opacity: 0; }
          28% { opacity: 1; }
          36% { opacity: 0; }
          50% { opacity: 1; }
          60% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  </div>
);

const StoreNameDuplicateCheck = ({ isVisible }) => {
  const [storeName, setStoreName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [error, setError] = useState(null);
  const [showThunderEffect, setShowThunderEffect] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState(0);
  const [cooldownMsg, setCooldownMsg] = useState('');

  const handleCheck = async () => {
    const now = Date.now();
    if (now - lastCheckedAt < 3000) {
      setCooldownMsg('3초 후 다시 시도하세요.');
      setTimeout(() => setCooldownMsg(''), 1500);
      return;
    }
    setLastCheckedAt(now);

    if (!storeName.trim()) {
      setError('가게 이름을 입력해주세요.');
      return;
    }
    
    setIsChecking(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/patent?storeNm=${encodeURIComponent(storeName)}`);
      const result = await response.json();
      console.log('중복성 검사 API 응답:', {
        storeName,
        response: result,
        isDuplicate: result
      });

      const isDuplicateValue = result.payload;
      setIsDuplicate(isDuplicateValue);

      if (isDuplicateValue) {
        setShowThunderEffect(true);
        setTimeout(() => setShowThunderEffect(false), 1800);
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      setError('중복 검사 중 오류가 발생했습니다.');
      console.error('중복 검사 에러:', err);
    } finally {
      setIsChecking(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {showThunderEffect && <ThunderCloudEffectOverlay />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div style={{ padding: '32px 24px 24px 24px' }}>
            <div style={{ textAlign: 'center', fontWeight: 700, color: '#357552', fontSize: '1.5rem', marginBottom: '18px', letterSpacing: '-1px' }}>
              상호명 중복 검사
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid #A7C7A3',
              borderRadius: '9999px',
              padding: '10px 18px',
              background: '#fff',
              marginBottom: '20px',
              boxShadow: 'none',
              width: '100%',
              maxWidth: 600,
              height: 45,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              <img src={searchIcon} alt="검색" style={{ width: 22, height: 22, marginRight: 10, opacity: 0.7 }} />
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="검사할 상호명을 입력해주세요."
                onKeyDown={(e) => { if (e.key === 'Enter') handleCheck(); }}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '1rem',
                  color: '#222',
                  fontFamily: 'inherit',
                  padding: 0,
                }}
              />
            </div>

            <AnimatePresence>
              {isDuplicate !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    marginTop: '20px',
                    padding: '15px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: isDuplicate ? '#FFEBEE' : '#E8F5E9',
                    color: isDuplicate ? '#C62828' : '#2E7D32'
                  }}
                >
                  {isDuplicate ? (
                    <>
                      <FaTimes style={{ fontSize: '20px' }} />
                      <span>이미 사용 중인 상호명입니다.</span>
                    </>
                  ) : (
                    <>
                      <FaCheck style={{ fontSize: '20px' }} />
                      <span>사용 가능한 상호명입니다!</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#FFEBEE',
                color: '#C62828',
                borderRadius: '5px'
              }}>
                {error}
              </div>
            )}

            <div style={{ textAlign: 'center', minHeight: 24, color: '#C62828', fontSize: '1rem', fontWeight: 500 }}>
              {cooldownMsg}
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default StoreNameDuplicateCheck; 