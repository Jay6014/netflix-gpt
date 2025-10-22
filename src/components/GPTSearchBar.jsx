import React, { useRef, useState } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import genAI from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addGeminiSeriesResults } from '../utils/gptSlice';

const GPTSearchBar = () => {
  const langkey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const searchSeriesTMDB = async (series)=>{
    const data = await fetch("https://api.themoviedb.org/3/search/tv?query="+series+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();

    //  Filter only Korean-language shows
  const koreanResults = json.results.filter(
    (show) => show.original_language === "ko"
  );

  // Optional: also make sure it's a "Drama" genre (TMDB genre id = 18)
  const finalResults = koreanResults.filter((show) =>
    show.genre_ids.includes(18)
  );
    return finalResults;
  }

  const handleGPTSearchClick = async ()=>{
      setLoading(true);
      console.log(searchText.current.value);


      const gptQuery = "You are a Korean TV drama recommendation expert.Based on this user query: " + searchText.current.value + "suggest ONLY 5 South Korean TV dramas (language code: ko) that best match.Do NOT include any movies, Chinese, Japanese, or other Asian dramas.Just output the 5 TV show names, comma-separated.Example format: Goblin, Descendants of the Sun, W, True Beauty, Crash Landing on You."

      /* openai API
      const getResults = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: gptQuery },
        ],
      });

      console.log(getResults.choices[0].message.content);
      */
 

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // specify temperature per request
      const result = await model.generateContent(gptQuery, {
        generationConfig: { temperature: 0.9 },
      });

      const response = result.response.text();
      console.log(response); // e.g., "Goblin, DOTS, W, ..."
      const geminiSeries = response.split(",");
      const promiseArray = geminiSeries.map(series => searchSeriesTMDB(series));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(addGeminiSeriesResults({seriesNames: geminiSeries, seriesResults: tmdbResults}));
      setLoading(false);
    
  }

  return (
    <div>
    <div className='pt-[50%] md:pt-[10%] flex justify-center'>
        <form className="bg-black grid grid-cols-12 w-full md:w-1/2" onSubmit={(e)=>e.preventDefault()}>
            <input type="text" placeholder={lang[langkey].gptSearchPlaceholder} className='p-4 m-4 col-span-9' ref={searchText} />
            <button className='p-2 m-2 bg-red-700 rounded-lg text-white col-span-3' onClick={handleGPTSearchClick}>{lang[langkey].search}</button>
           
        </form>
    </div>
    {loading && (
        <div className="text-white mt-4 animate-pulse flex justify-center">
          🔍 Fetching {searchText.current?.value} recommendations...
        </div>
      )}
      </div>
  )
}


export default GPTSearchBar