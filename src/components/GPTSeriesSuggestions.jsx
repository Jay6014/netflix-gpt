import React from 'react';
import { useSelector } from 'react-redux';
import SeriesList from './SeriesList';

const GPTSeriesSuggestions = () => {
  const {seriesNames, seriesResults} = useSelector(store => store.GPT);
  if(!seriesNames) return null;

  return (
    <div className='p-4 m-4'>
      <div>
        {seriesNames.map((seriesName,index) => (
          <SeriesList key={seriesName} title={seriesName} series={seriesResults[index]} />
        ))}
      </div>
    </div>
  )
}

export default GPTSeriesSuggestions