import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// 색상을 점점 초록색으로 변하게 만드는 헬퍼 함수
const getGradientColor = (value, min, max) => {
  const percent = (value - min) / (max - min);
  const interpolate = (start, end) =>
    Math.round(start + (end - start) * percent);

  const r = interpolate(255, 55);
  const g = interpolate(255, 117);
  const b = interpolate(255, 51);

  return `rgb(${r}, ${g}, ${b})`;
};

const KeywordTrendChart = ({ keyword, data }) => {
  const [options, setOptions] = useState({
    title: {
      text: '키워드를 선택해주세요'
    },
    series: [{
      data: []
    }]
  });

  useEffect(() => {
    if (!keyword || !data || !data.payload) {
      setOptions({
        title: {
          text: '키워드를 선택해주세요'
        },
        series: [{
          data: []
        }]
      });
      return;
    }

    const keywordData = data.payload.find(item => item.keyword === keyword);
    if (!keywordData) {
      setOptions({
        title: {
          text: '데이터를 찾을 수 없습니다'
        },
        series: [{
          data: []
        }]
      });
      return;
    }

    const quarterData = keywordData.quarterRevelance;
    const graphData = Object.entries(quarterData).map(([quarter, value]) => ({
      quarter,
      value
    }));

    const values = graphData.map(item => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    const chartData = graphData.map(item => ({
      y: item.value,
      name: item.quarter,
      color: getGradientColor(item.value, min, max)
    }));

    setOptions({
      title: {
        text: `${keyword} 분기별 관련성 추이`
      },
      xAxis: {
        title: { text: '분기' },
        categories: graphData.map(item => item.quarter)
      },
      yAxis: {
        title: { text: '관련성 점수' }
      },
      tooltip: {
        headerFormat: `<b>${keyword}</b><br />`,
        pointFormat: '관련성: {point.y}'
      },
      series: [{
        name: `${keyword} 관련성`,
        data: chartData,
        color: {
          linearGradient: {
            x1: 0, x2: 0, y1: 1, y2: 0
          },
          stops: [
            [0, '#9AD255'],
            [1, '#377533']
          ]
        }
      }]
    });
  }, [keyword, data]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3.5rem' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default KeywordTrendChart;