import React from 'react'
import { IMG_CDN } from '../utils/constants'
import SeriesInfo from './SeriesInfo';
import { useNavigate } from 'react-router-dom';

const SeriesCard = ({poster_path, series}) => {
  const navigate = useNavigate()
  if(!poster_path)
    return null;

  const handleOnSeriesClick = ()=>{
    navigate("/info/"+series.id);
  }
  return (
    <div className=' w-36 md:w-48 pr-4 cursor-pointer' onClick={handleOnSeriesClick}>
        <img src={IMG_CDN + poster_path} alt='series-card'/>
    </div>
  )
}

export default SeriesCard