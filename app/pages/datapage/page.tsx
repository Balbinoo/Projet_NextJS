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

const categories = [
  "MMORPG", "Shooter", "Action RPG", "Battle Royale", "ARPG", "MMOARPG",
  "MOBA", "Strategy", "Card Game", "Sports", "Fighting", "MMO", "Fantasy", "Social"
];

export default function DataPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Multi-select categories
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

  // Toggle category selection (multi-select)
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if selected
        : [...prev, category] // Add if not selected
    );
  };

  // Apply search & multiple category filter
  useEffect(() => {
    let filtered = games;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((game) =>
        selectedCategories.includes(game.genre)
      );
    }

    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategories, games]);

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

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 my-6">
          {/* Clear Selection Button */}
          <button
            onClick={() => setSelectedCategories([])}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-md 
              ${selectedCategories.length === 0 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all shadow-md 
                ${selectedCategories.includes(category) 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {category}
            </button>
          ))}
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
