"use client";

import { useState, useEffect } from "react";
import SearchBar from "./../../components/SearchBar"; 
import Pagination from "./../../components/Pagination"; 

interface Game {
  _id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
}

export default function DataPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/gameData");
        if (!response.ok) throw new Error("Failed to fetch games.");
        
        const result = await response.json();
        setGames(result);
        setFilteredGames(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load games. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply search & category filter
  useEffect(() => {
    let filtered = games;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((game) => game.genre === selectedCategory);
    }

    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory, games]);

  // Get current page's games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Free-to-Play Games List 🎮
        </h1>

        {/* Search Bar Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Category Filter Dropdown */}
        <div className="flex justify-center my-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white shadow-md"
          >
            <option value="">All Categories</option>
            <option value="MMORPG">MMORPG</option>
            <option value="Shooter">Shooter</option>
            <option value="Action RPG">Action RPG</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Loading & Data Display */}
        {loading ? (
          <p className="text-center text-gray-700">Loading games...</p>
        ) : currentGames.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentGames.map((game) => (
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

            {/* Pagination Component */}
            <Pagination 
              currentPage={currentPage}
              totalPages={Math.ceil(filteredGames.length / gamesPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p className="text-center text-gray-600">No games found.</p>
        )}
      </div>
    </div>
  );
}
