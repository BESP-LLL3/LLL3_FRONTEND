import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import api from '../../app/api/api';

const NameSuggestionList = ({ suggestions, onSelect }) => {
  const [cardStates, setCardStates] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState(0);
  const [cooldownMsg, setCooldownMsg] = useState('');

  const handleDuplicateCheck = async (storeNm, index) => {
    if (isChecking) return;
    
    try {
      setIsChecking(true);
      setCardStates(prev => ({
        ...prev,
        [index]: { ...prev[index], isChecking: true }
      }));

      // localStorage에서 검색어 가져오기
      const keyword = localStorage.getItem('searchKeyword') || '';
      const custom = localStorage.getItem('searchCustom') || '';

      const response = await api.get('/patent', {
        params: {
          keyword,
          custom,
          storeNm
        }
      });

      setCardStates(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          isChecking: false,
          isDuplicate: response.data.payload,
          hasChecked: true
        }
      }));

      if (!response.data.payload) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error) {
      console.error('중복 검사 실패:', error);
      setCardStates(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          isChecking: false,
          isDuplicate: undefined,
          hasChecked: true,
          error: '중복 검사 중 오류가 발생했습니다.'
        }
      }));
    } finally {
      setIsChecking(false);
    }
  };

  const handlePatentCheck = () => {
    window.open('https://www.patent.go.kr/smart/jsp/kiponet/ma/websolution/OnlineIndex.do?url=main', '_blank');
  };

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>추천 상호명</Title>
      <SwiperContainer>
        <Swiper
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            1024: { 
              slidesPerView: 4,
              spaceBetween: 10
            }
          }}
        >
          {suggestions.map((suggestion, index) => (
            <SwiperSlide key={index}>
              <FlipCard>
                <FlipCardInner>
                  <FlipCardFront>
                    <CardTitle>{suggestion.brandName}</CardTitle>
                    <CardSubtitle>{suggestion.comment}</CardSubtitle>
                  </FlipCardFront>
                  <FlipCardBack>
                    <CardTitle>{suggestion.brandName}</CardTitle>
                    <ButtonGroup>
                      {!cardStates[index]?.hasChecked && (
                        <CheckButton 
                          onClick={() => handleDuplicateCheck(suggestion.brandName, index)}
                          disabled={cardStates[index]?.isChecking}
                        >
                          {cardStates[index]?.isChecking ? '검사 중...' : '중복성 검사'}
                        </CheckButton>
                      )}
                      {cardStates[index]?.isDuplicate === false && (
                        <PatentButton onClick={handlePatentCheck}>
                          특허 등록
                        </PatentButton>
                      )}
                    </ButtonGroup>
                    <AnimatePresence>
                      {cardStates[index]?.isDuplicate !== undefined && (
                        <ResultMessage 
                          $isDuplicate={cardStates[index]?.isDuplicate}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {cardStates[index]?.isDuplicate ? (
                            <>
                              <FaTimes />
                              <span>이미 사용 중인 상호명입니다.</span>
                            </>
                          ) : (
                            <>
                              <FaCheck />
                              <span>사용 가능한 상호명입니다!</span>
                            </>
                          )}
                        </ResultMessage>
                      )}
                    </AnimatePresence>
                    {cardStates[index]?.error && (
                      <ErrorMessage>{cardStates[index]?.error}</ErrorMessage>
                    )}
                    {cooldownMsg && <CooldownMessage>{cooldownMsg}</CooldownMessage>}
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <PaginationContainer className="swiper-pagination" />
      </SwiperContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SwiperContainer = styled.div`
  width: 100%;
  padding: 1rem 0 3rem 0;
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #357552;
    
    &:after {
      font-size: 1.5rem;
    }
  }
`;

const PaginationContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #357552;
    opacity: 0.5;
    margin: 0 6px;
    
    &-active {
      opacity: 1;
    }
  }
`;

const FlipCard = styled.div`
  background-color: transparent;
  width: 280px;
  height: 180px;
  perspective: 1000px;
  margin: 0 auto;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  
  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: linear-gradient(120deg,rgb(242, 255, 240) 60%, #e6f2ff 88%, #d9e9ff 40%,rgb(196, 253, 200) 48%);
  color: #357552;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: linear-gradient(120deg, #357552 30%, #2a5d42 88%, #1d4531 40%, #0f2a1b 78%);
  color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 580;
  margin-bottom: 0.3rem;
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 80%;
`;

const CheckButton = styled.button`
  background: white;
  color: #357552;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f8ff;
    transform: translateY(-2px);
  }
`;

const PatentButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ResultMessage = styled(motion.div)`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.$isDuplicate ? 'rgba(255, 235, 238, 0.8)' : 'rgba(232, 245, 233, 0.8)'};
  color: ${props => props.$isDuplicate ? '#C62828' : '#2E7D32'};
  font-size: 0.875rem;
  width: 80%;
`;

const ErrorMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: rgba(255, 235, 238, 0.8);
  color: #C62828;
  font-size: 0.875rem;
  width: 80%;
`;

const CooldownMessage = styled.div`
  margin-top: 0.5rem;
  color: #C62828;
  font-size: 0.75rem;
`;

export default NameSuggestionList; 