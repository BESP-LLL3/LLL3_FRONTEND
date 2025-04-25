import React, { useEffect, useRef, memo } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const D3WordCloud = ({ words, onWordClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return;

    // SVG 요소 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // 컨테이너 크기 가져오기
    const container = svgRef.current.parentElement;
    const width = container.clientWidth;
    const height = 400; // 컨테이너 높이에 맞춤

    // 워드클라우드 레이아웃 설정
    const layout = cloud()
      .size([width, height])
      .words(words.map(word => {
        // 최소값과 최대값을 찾아서 스케일링
        const values = words.map(w => w.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const scale = d3.scaleLinear()
          .domain([minValue, maxValue])
          .range([16, 50]);  // 최소 16px, 최대 40px로 조정
        
        return {
          text: word.text || word,
          size: scale(word.value)
        };
      }))
      .padding(3)  // 패딩도 줄임
      .rotate(() => ~~(Math.random() * 2) * 45)
      .font('Pretendard')
      .fontSize(d => d.size)
      .spiral('rectangular')
      .on('end', draw);

    // 워드클라우드 레이아웃 시작
    layout.start();

    // 워드클라우드 그리기 함수
    function draw(words) {
      const centerX = width / 2.11;
      const centerY = height / 2;

      const colors = [
        '#00ca4e', // 메인 컬러 (초록)
        '#4ecdc4', // 청록
        '#45b7d1', // 하늘
        '#6c63ff', // 보라
        '#ff9f1c', // 주황
        '#ff6b6b'  // 분홍
      ];

      svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${centerX},${centerY})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${Math.max(20, d.size)}px`)
        .style('font-family', 'Pretendard')
        .style('fill', (d, i) => colors[i % colors.length])
        .style('filter', 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))')
        .style('transition', 'all 0.2s ease')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text)
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          if (onWordClick) {
            onWordClick(d.text);
          }
        })
        .on('mouseover', function() {
          d3.select(this)
            .style('font-weight', '600')
            .style('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))')
            .style('opacity', '0.8');
        })
        .on('mouseout', function() {
          d3.select(this)
            .style('font-weight', 'normal')
            .style('filter', 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))')
            .style('opacity', '1');
        });
    }
  }, [words, onWordClick]);

  return (
    <div style={styles.container}>
      <svg ref={svgRef} style={styles.svg}></svg>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  svg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default memo(D3WordCloud); 