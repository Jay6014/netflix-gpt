# Netflix GPT

    - Vite React app
    - Configured tailwindcss
    - Header (In Header.jsx)
    - Routing of App (In Body.jsx)
    - Login Form (In Login.jsx)
    - Sign Up Form (In Login.jsx only based on "isSignInForm" state variable)
    - Form Validation
    - useRef Hook
    - Firebase Setup
    - Deploying our app to Production 
    - Create Sign Up user account
    - Implement Sign In user Api
    - Created Redux Store with userSlice
    - Implemeted Sign Out
    - Update Profile
    - BugFix: Sign Up user displayName and profile picture update
    - BugFix: If the user is not logged in redirect /browse to Login page and vice-versa
    - Unsubscribed to the onAuthStateChanged callback
    - Add hardcoded values to the constants file
    - Register TMDB API & create an app to get access token
    - Get Data from TMDB API for top rated tv series
    -  Custom Hook for Top Rated Series
    - Create seriesSlice
    - Update store with series data
    - Planning for MainContainer & SecondaryContainer
    - Fetch Data for Trailer Video
    - Update Store with Trailer Video Data
    - Embedded the Youtube video and make it autoplay and mute
    - Tailwind Ckasses to make mainContainer look awesome
    - Build Secondary Component
    - Build Series List
    - Build Series Card
    - TMDB Image CDN URL
    - Made the Browse page amazing with Tailwind CSS
    - useAiringToday Custom hook
    - GPT search page
    - GPT Search Bar
    - Multi-language feature
    - Get OpenAI Gemini API Key
    - Gemini search API call
    - fetched geminiSeriesSuggestions rom TMBD
    - created geminiSlice added data
    - Reused seriesList component to make series suggestions container
    - Memoization
    - Added .env file
    - Adding .env filr to .gitignore
    - Made our site responsive


# Features
- Login/Sign Up
    - Sign In/Sign Up Form
    - redirect to Browse Page
- Browse (after authentication)
    - Header
    - Main Movie
        - Trailer in Background
        - Title & Background
        - MovieSuggestions
            - MovieLists * N
- NetflixGPT
    - Search Bar
    - Movie Suggestions


START THE SERVER:
-----------------
    npm run dev
    http://localhost:5173
    
