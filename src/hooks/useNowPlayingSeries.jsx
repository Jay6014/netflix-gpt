import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingSeries } from "../utils/seriesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedSeries = ()=>{
    const dispatch = useDispatch();
    const nowPlayingSeries = useSelector(store => store.series.nowPlayingSeries)
  const getPopularTvShows = async ()=>{
    const data =  await fetch('https://api.themoviedb.org/3/discover/tv?with_original_language=ko&sort_by=popularity.desc&page=1', API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addNowPlayingSeries(json.results));

  }

  useEffect(()=>{
    !nowPlayingSeries && getPopularTvShows()
  },[])

}

export default useTopRatedSeries;