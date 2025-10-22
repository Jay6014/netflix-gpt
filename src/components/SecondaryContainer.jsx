import React from 'react'
import SeriesList from './SeriesList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const series = useSelector(store => store.series)
  return (
    <div className='bg-black'>
      <div className='mt-0 md:-mt-64 relative'>
        <SeriesList title={"Now Playing"} series={series.nowPlayingSeries} />
        <SeriesList title={"Airing Today"} series={series.airingToday} />
        <SeriesList title={"Popular"} series={series.popularSeries} />
        <SeriesList title={"Top Rated"} series={series.topRatedSeries} />
        <SeriesList title={"On Air"} series={series.onAirToday} />
      </div>
    </div>
  )
}

export default SecondaryContainer