import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_OPTIONS, IMG_CDN } from "../utils/constants";
import { useSelector } from "react-redux";

const SeriesInfo = () => {
  const { id } = useParams(); // Series ID from URL
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Redux user state
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [trailer, setTrailer] = useState(null);

  // 🔒 Auth check
  useEffect(() => {
    if (!user || !user.uid) {
      navigate("/", { replace: true }); // redirect to login if not logged in
    }
  }, [user, navigate]);


  // Fetch series details & trailer
  useEffect(() => {
    
    const fetchSeriesDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
          API_OPTIONS
        );
        const details = await res.json();
        setSeriesDetails(details);
        setSeasons(details.seasons || []);

        // Fetch trailer
        const resVideos = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
          API_OPTIONS
        );
        const videos = await resVideos.json();
        const ytTrailer = videos.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(ytTrailer || null);

        // Set first season by default
        if (details.seasons && details.seasons.length > 0) {
          setSelectedSeason(details.seasons[0].season_number);
        }
      } catch (err) {
        console.error("Failed to fetch series details:", err);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  // Fetch episodes whenever selected season changes
  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!selectedSeason) return;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=en-US`,
          API_OPTIONS
        );
        const seasonData = await res.json();
        setEpisodes(seasonData.episodes || []);
      } catch (err) {
        console.error("Failed to fetch episodes:", err);
      }
    };

    fetchEpisodes();
  }, [id, selectedSeason]);

  if (!seriesDetails) return <div>Loading series info...</div>;

  return (
    <div className="p-4 bg-black text-white min-h-screen">
         <button
        onClick={() => navigate(-1)} // <-- go back to previous page
        className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        ← Back
      </button>
      {/* Series header */}
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={IMG_CDN + seriesDetails.poster_path}
          alt={seriesDetails.name}
          className="w-64 rounded-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{seriesDetails.name}</h1>
          <p className="mt-2">{seriesDetails.overview}</p>
          <p className="mt-1 text-gray-400">
            First Air Date: {seriesDetails.first_air_date} | Seasons:{" "}
            {seriesDetails.number_of_seasons} | Episodes:{" "}
            {seriesDetails.number_of_episodes}
          </p>
          <p className="mt-1">
            Genres: {seriesDetails.genres.map((g) => g.name).join(", ")}
          </p>
          {/* Trailer */}
          {trailer && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <iframe className="w-full h-full md:w-[350] md:h-96"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Series Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Season selector */}
      {seasons.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Select Season</h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.season_number)}
                className={`px-3 py-1 rounded ${
                  s.season_number === selectedSeason
                    ? "bg-red-600"
                    : "bg-gray-700"
                }`}
              >
                {s.name || `Season ${s.season_number}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Episodes list */}
      <div>
        <h2 className="text-2xl font-bold mb-2">
          Episodes (Season {selectedSeason})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {episodes.map((ep) => (
            <div key={ep.id} className="bg-gray-800 p-2 rounded">
              <p className="font-semibold">
                {ep.episode_number}. {ep.name}
              </p>
              <p className="text-sm mt-1">
                {ep.overview || "No description available."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesInfo;
