import GPTSearchBar from "./GPTSearchBar";
import GPTSeriesSuggestions from "./GPTSeriesSuggestions";
import { BG_IMG } from '../utils/constants'

const GPTSearch = ()=>{
    return(
        <div>
            <div className="fixed inset-0 -z-10">
                <img
                    src= {BG_IMG}
                    alt="bg-img"
                    className="h-full w-full object-cover"
                />
                <div className="fixed inset-0 bg-black/60"></div>  {/*A semi-transparent black layer on top of the image for a darkened effect (so text stands out). */}
            </div>
           <GPTSearchBar />
           <GPTSeriesSuggestions />
        </div>
    )
}

export default GPTSearch;