import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const series = useSelector(store => store.series?.topRatedSeries);
    
    if(series === null)
        return;

    const mainMovie = series[2];
    //console.log(mainMovie);
    const {name, overview, id} = mainMovie;
  return (
    <div className='pt-[40%] md:pt-0 bg-black'>
        <VideoTitle title={name} overview={overview}/>
        <VideoBackground seriesId={id}/>
    </div>
  )
}

export default MainContainer