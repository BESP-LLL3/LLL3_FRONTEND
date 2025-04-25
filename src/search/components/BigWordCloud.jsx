import React, { useEffect, useRef, memo } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const BigWordCloud = ({ words, onWordClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const container = svgRef.current.parentElement;
    const width = container.clientWidth;
    const height = 600;

    const layout = cloud()
      .size([width, height])
      .words(words.map(word => {
        const values = words.map(w => w.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const scale = d3.scaleLinear()
          .domain([minValue, maxValue])
          .range([30, 80]);
        
        return {
          text: word.text || word,
          size: scale(word.value)
        };
      }))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 45)
      .font('Pretendard')
      .fontSize(d => d.size)
      .spiral('rectangular')
      .on('end', draw);

    layout.start();

    function draw(words) {
      const centerX = width / 2;
      const centerY = height / 2;

      const colors = [
        '#00ca4e',
        '#4ecdc4',
        '#45b7d1',
        '#6c63ff',
        '#ff9f1c',
        '#ff6b6b'
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
        .style('font-size', d => `${d.size}px`)
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
    height: '600px',
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
  }
};

export default memo(BigWordCloud); 