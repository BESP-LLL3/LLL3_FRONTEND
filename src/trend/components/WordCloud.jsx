import React, { useEffect, useState } from 'react';
import ReactWordcloud from 'react-d3-cloud';
import { getTrendData, formatWordCloudData } from '../api/keywordApi';

const WordCloud = ({ keyword, onKeywordSelect }) => {
  const [wordCloudData, setWordCloudData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrendData(keyword);
        const formattedData = formatWordCloudData(data);
        setWordCloudData(formattedData);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  const handleWordClick = (word) => {
    if (onKeywordSelect) {
      onKeywordSelect(word.text);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">로딩 중...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!wordCloudData.length) return <div className="text-center">데이터가 없습니다.</div>;

  return (
    <div className="w-full h-64">
      <ReactWordcloud
        data={wordCloudData}
        fontSize={(word) => Math.log2(word.value) * 10}
        rotate={0}
        padding={2}
        onWordClick={handleWordClick}
        random={Math.random}
      />
    </div>
  );
};

export default WordCloud; 