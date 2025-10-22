import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
    name: "series",
    initialState: {
        nowPlayingSeries: null,
        trailerVideo: null,
        airingToday: null,
        onAirToday: null,
        popularSeries: null,
        topRatedSeries: null,
        
    },
    reducers: {
        addNowPlayingSeries: (state, action)=>{
            state.nowPlayingSeries = action.payload;
        },
        addTrailerVideo: (state, action)=>{
            state.trailerVideo = action.payload;
        },
        addAiringTodaySeries: (state, action)=>{
            state.airingToday = action.payload;
        },
        addOnAirTvSeries: (state, action)=>{
            state.onAirToday = action.payload;
        },
        addPopularTvSeries: (state, action)=>{
            state.popularSeries = action.payload;
        },
        addTopRatedTvSeries: (state, action)=>{
            state.topRatedSeries = action.payload;
        },
    }
})

export const {addNowPlayingSeries, addTrailerVideo, addAiringTodaySeries, addOnAirTvSeries, addPopularTvSeries, addTopRatedTvSeries} =  seriesSlice.actions;
export default seriesSlice.reducer