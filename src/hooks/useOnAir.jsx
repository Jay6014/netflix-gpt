import { useDispatch, useSelector } from "react-redux";
import { addOnAirTvSeries } from "../utils/seriesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useOnAir = ()=>{
    const dispatch = useDispatch();
    const onAirToday = useSelector(store => store.series.onAirToday)
    const getOnAirTvShows = async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/discover/tv?with_original_language=ko&with_status=0&&page=2',API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addOnAirTvSeries(json.results));

  }

  useEffect(()=>{
    !onAirToday && getOnAirTvShows()
  },[])

}

export default useOnAir;