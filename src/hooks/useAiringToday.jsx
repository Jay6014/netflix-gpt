import { useDispatch, useSelector } from "react-redux";
import { addAiringTodaySeries } from "../utils/seriesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useAiringToday = ()=>{
    const dispatch = useDispatch();
    const onAirToday = useSelector(store => store.series.onAirToday)
    const getAiringTodayTvShows = async ()=>{const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const data = await fetch('https://api.themoviedb.org/3/discover/tv?with_original_language=ko&with_status=0&&page=1',API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addAiringTodaySeries(json.results));

  }

  useEffect(()=>{
    !onAirToday && getAiringTodayTvShows()
  },[])

}

export default useAiringToday;