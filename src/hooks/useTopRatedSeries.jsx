import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTvSeries } from "../utils/seriesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedSeries = ()=>{
    const dispatch = useDispatch();
    const topRatedSeries = useSelector(store => store.series.topRatedSeries)
    const getTopRatedTvShows = async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/discover/tv?with_original_language=ko&sort_by=popularity.desc&page=5',API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addTopRatedTvSeries(json.results));

  }

  useEffect(()=>{
   !topRatedSeries && getTopRatedTvShows() //memoization
  },[])

}

export default useTopRatedSeries;