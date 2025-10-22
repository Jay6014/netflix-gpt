import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingSeries from '../hooks/useNowPlayingSeries'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useAiringToday from '../hooks/useAiringToday'
import useOnAir from '../hooks/useOnAir';
import usePopularSeries from '../hooks/usePopularSeries';
import useTopRatedSeries from '../hooks/useTopRatedSeries';
import GPTSearch from './GPTSearchPage';
import { useSelector } from 'react-redux';


const Browse = () => {
  const showGPTSearch = useSelector(store => store.GPT.showSearchGpt)
  useNowPlayingSeries(); //calling the custom hook
  useAiringToday();
  useOnAir();
  usePopularSeries();
  useTopRatedSeries();
  return (
    <div>
      <Header />
      {showGPTSearch ? <GPTSearch /> :
        <>
         <MainContainer />
         <SecondaryContainer /> 
        </>
       }
      
      
      </div>
  )
}

export default Browse