import { createSlice } from "@reduxjs/toolkit"

const gptSlice = createSlice({
    name: "GPT",
    initialState: {
        showSearchGpt: false,
        seriesNames: null,
        seriesResults: null
    },
    reducers: {
        toggleGPTSearch: (state, action) =>{
            state.showSearchGpt = !state.showSearchGpt;
        },
        addGeminiSeriesResults: (state, action) =>{
            const {seriesNames, seriesResults} = action.payload;
            state.seriesNames = seriesNames;
            state.seriesResults = seriesResults;
        }
    }

});

export const { toggleGPTSearch, addGeminiSeriesResults } = gptSlice.actions;
export default gptSlice.reducer

