import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const series = useSelector(store => store.series?.topRatedSeries);
    
    if(series === null)
        return;
    
    const mainSeries = series[Math.floor(Math.random() * series.length)];

  // Filter trailers (if you have that logic already)
  const filteredTrailer = mainSeries.videos?.filter(video => video.type === "Trailer") || [];

  // Default fallback (Goblin)
  const defaultTrailer = {
    key: "D-bAfFqvxZg",
    title: "My Demon",
    overview: "A pitiless demon becomes powerless after getting entangled with an icy heiress, who may hold the key to his lost abilities — and his heart.",
    id: 12345 // any unique ID you want to use
  };

  // Use the first filtered trailer or fallback
  const trailer = filteredTrailer.length
    ? {
        key: filteredTrailer[0].key,
        title: mainSeries.name,
        overview: mainSeries.overview,
        id: mainSeries.id
      }
    : defaultTrailer;

    const { title, overview, id } = trailer;
  
  return (
    <div className='relative bg-black pt-[25%] sm:pt-[20%] md:pt-0'>
        <VideoTitle title={title} overview={overview}/>
        <VideoBackground seriesId={id}/>
    </div>
  )
}

export default MainContainer