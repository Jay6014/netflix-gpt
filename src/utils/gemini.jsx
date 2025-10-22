import { GoogleGenerativeAI } from "@google/generative-ai";
import { VITE_GEMINI_API_KEY } from "./constants";


const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY)


export default genAI;
