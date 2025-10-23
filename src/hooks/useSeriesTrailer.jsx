import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/seriesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";


//fetch the trailer video and updating the store with trailerVideo data
const useSeriesTrailer = (seriesId)=>{
    const dispatch = useDispatch();
    const getMovieVideos = async()=>{
        const data = await fetch("https://api.themoviedb.org/3/tv/"+seriesId+"/videos?language=en-US", API_OPTIONS);
        const json = await data.json();
        //console.log(json);
        const filteredTrailer = json.results.filter((video)=> video.type === "Trailer")
        //console.log(filteredTrailer);
        
        const trailer = filteredTrailer.length ? filteredTrailer[0] : { key: "D-bAfFqvxZg" }; // fallback My Demon trailer
        dispatch(addTrailerVideo(trailer));

    }
    useEffect(()=>{
        getMovieVideos();
    },[seriesId])
}

export default useSeriesTrailer;