import { useDispatch, useSelector } from "react-redux";
import { addPopularTvSeries } from "../utils/seriesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularSeries = ()=>{
    const dispatch = useDispatch();
    const popularSeries = useSelector(store => store.series.popularSeries)
    const getPopularTvShows = async ()=>{const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const data = await fetch('https://api.themoviedb.org/3/discover/tv?with_original_language=ko&sort_by=popularity.desc&page=3',API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addPopularTvSeries(json.results));

  }

  useEffect(()=>{
    !popularSeries && getPopularTvShows()
  },[])

}

export default usePopularSeries;