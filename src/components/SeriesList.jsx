import React from 'react'
import SeriesCard from './SeriesCard'

const SeriesList = ({title, series}) => {
    console.log(series);
    // Filter out items that don't have a poster
  const validSeries = series?.filter((item) => item.poster_path);

  // If no valid posters, don't render anything
  if (!validSeries || validSeries.length === 0) return null;
  return (
    <div className='px-6 bg-black'>
        <h1 className='font-bold text-lg py-4 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll no-scrollbar'>
             <div className='flex'>
                {series?.map((item)=>{
                    return <SeriesCard key={item.id}  poster_path={item.poster_path} series={item}/>
                     })}
            </div>
            
        </div>
        
    </div>
  )
}

export default SeriesList