"use client";

import { useState, useEffect } from "react";

interface Game {
  _id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
}

export default function datapage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from the database
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/gameData"); // Correct API route
      if (!response.ok) throw new Error("Failed to fetch games.");
      
      const result = await response.json();
      setGames(result); // Store fetched data
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load games. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Free-to-Play Games List 🎮
        </h1>

        {/* Fetch Data Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? "Fetching..." : "Fetch Data"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Loading & Data Display */}
        {loading ? (
          <p className="text-center text-gray-700">Loading games...</p>
        ) : games.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <div
                key={game._id}
                className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900">{game.title}</h3>
                <p className="text-gray-700 text-sm mb-2">{game.short_description}</p>
                <span className="text-blue-500 text-xs font-semibold">{game.genre}</span>
                <p className="text-gray-500 text-xs">Platform: {game.platform}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No games available.</p>
        )}
      </div>
    </div>
  );
}
